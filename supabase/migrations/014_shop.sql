-- =================================================================
-- Shop system: items + purchases với coins
-- =================================================================

CREATE TABLE IF NOT EXISTS public.shop_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT NOT NULL CHECK(category IN ('energy','protection','cosmetic','content','realworld')),
  cost_coins INTEGER NOT NULL,
  effect_type TEXT NOT NULL CHECK(effect_type IN ('refill_energy','streak_shield','avatar_frame','unlock_pack','realworld_voucher')),
  effect_value JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 100,
  stock INTEGER DEFAULT -1  -- -1 = unlimited
);

CREATE TABLE IF NOT EXISTS public.shop_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL REFERENCES public.shop_items(id),
  cost_paid INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK(status IN ('completed','refunded','pending_realworld')),
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user ON public.shop_purchases(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_item ON public.shop_purchases(item_id);

-- User flags (effect kéo dài, ví dụ streak shield đang active)
CREATE TABLE IF NOT EXISTS public.user_flags (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_shield_active BOOLEAN DEFAULT FALSE,
  avatar_frame TEXT,
  unlocked_packs TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_flags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read shop items" ON public.shop_items;
CREATE POLICY "Public read shop items" ON public.shop_items FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage shop" ON public.shop_items;
CREATE POLICY "Admin manage shop" ON public.shop_items FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Users view own purchases" ON public.shop_purchases;
CREATE POLICY "Users view own purchases" ON public.shop_purchases FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own purchases" ON public.shop_purchases;
CREATE POLICY "Users insert own purchases" ON public.shop_purchases FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin view all purchases" ON public.shop_purchases;
CREATE POLICY "Admin view all purchases" ON public.shop_purchases FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Users view own flags" ON public.user_flags;
CREATE POLICY "Users view own flags" ON public.user_flags FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own flags" ON public.user_flags;
CREATE POLICY "Users update own flags" ON public.user_flags FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- =================================================================
-- Function: purchase item (atomic transaction)
-- =================================================================
CREATE OR REPLACE FUNCTION public.purchase_shop_item(p_user_id UUID, p_item_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_item RECORD;
  v_coins INTEGER;
BEGIN
  SELECT * INTO v_item FROM shop_items WHERE id = p_item_id AND is_active = TRUE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Item not found or inactive');
  END IF;

  SELECT coins INTO v_coins FROM profiles WHERE id = p_user_id;
  IF COALESCE(v_coins, 0) < v_item.cost_coins THEN
    RETURN jsonb_build_object('success', false, 'error', 'Không đủ coins',
      'have', COALESCE(v_coins, 0), 'need', v_item.cost_coins);
  END IF;

  -- Trừ coins
  UPDATE profiles SET coins = coins - v_item.cost_coins WHERE id = p_user_id;

  -- Apply effect
  IF v_item.effect_type = 'refill_energy' THEN
    UPDATE profiles SET energy = energy_max, last_energy_refill = NOW() WHERE id = p_user_id;
  ELSIF v_item.effect_type = 'streak_shield' THEN
    INSERT INTO user_flags (user_id, streak_shield_active) VALUES (p_user_id, TRUE)
      ON CONFLICT (user_id) DO UPDATE SET streak_shield_active = TRUE, updated_at = NOW();
  ELSIF v_item.effect_type = 'avatar_frame' THEN
    INSERT INTO user_flags (user_id, avatar_frame) VALUES (p_user_id, v_item.effect_value->>'frame')
      ON CONFLICT (user_id) DO UPDATE SET avatar_frame = v_item.effect_value->>'frame', updated_at = NOW();
  ELSIF v_item.effect_type = 'unlock_pack' THEN
    INSERT INTO user_flags (user_id, unlocked_packs)
      VALUES (p_user_id, ARRAY[v_item.effect_value->>'pack_id'])
      ON CONFLICT (user_id) DO UPDATE
      SET unlocked_packs = array_append(user_flags.unlocked_packs, v_item.effect_value->>'pack_id'),
          updated_at = NOW();
  END IF;

  -- Log purchase
  INSERT INTO shop_purchases (user_id, item_id, cost_paid, status, meta)
  VALUES (p_user_id, p_item_id, v_item.cost_coins,
    CASE WHEN v_item.effect_type = 'realworld_voucher' THEN 'pending_realworld' ELSE 'completed' END,
    jsonb_build_object('item_name', v_item.name));

  RETURN jsonb_build_object('success', true, 'remaining_coins', v_coins - v_item.cost_coins, 'item_name', v_item.name);
END;
$$;

-- =================================================================
-- Seed shop items
-- =================================================================
INSERT INTO public.shop_items (id, name, description, icon, category, cost_coins, effect_type, effect_value, display_order) VALUES
  ('refill_full', 'Hồi đầy năng lượng', 'Khôi phục năng lượng về tối đa ngay lập tức', '⚡', 'energy', 100, 'refill_energy', '{}'::jsonb, 1),
  ('streak_shield', 'Khiên bảo vệ streak', 'Bảo vệ chuỗi streak nếu bạn lỡ một ngày', '🛡️', 'protection', 500, 'streak_shield', '{}'::jsonb, 2),
  ('frame_gold', 'Khung avatar vàng', 'Khung viền vàng đẹp mắt cho avatar', '🥇', 'cosmetic', 1000, 'avatar_frame', '{"frame":"gold"}'::jsonb, 3),
  ('frame_diamond', 'Khung avatar kim cương', 'Khung viền đặc biệt cao cấp', '💎', 'cosmetic', 3000, 'avatar_frame', '{"frame":"diamond"}'::jsonb, 4),
  ('pack_emergency', '50 câu cấp cứu nâng cao', 'Bộ câu hỏi cấp cứu chuyên sâu', '🚨', 'content', 300, 'unlock_pack', '{"pack_id":"emergency_advanced"}'::jsonb, 5),
  ('pack_ecmo', '30 câu ECMO chuyên sâu', 'Mở khoá nội dung ECMO', '🫀', 'content', 500, 'unlock_pack', '{"pack_id":"ecmo"}'::jsonb, 6),
  ('voucher_coffee', 'Voucher cà phê 50k', 'Voucher quán cà phê BV (admin xác nhận)', '☕', 'realworld', 5000, 'realworld_voucher', '{"value":50000}'::jsonb, 100),
  ('voucher_book', 'Voucher sách 200k', 'Đổi sách chuyên môn (admin xác nhận)', '📚', 'realworld', 20000, 'realworld_voucher', '{"value":200000}'::jsonb, 101)
ON CONFLICT (id) DO NOTHING;

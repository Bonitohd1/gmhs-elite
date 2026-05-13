-- =================================================================
-- Energy System: Gamification - limit/refill cơ chế giống Duolingo
-- =================================================================
-- Quy tắc:
-- - Mỗi user có energy (0-50), refill 1 energy mỗi 6 phút (full refill 5h)
-- - Daily Challenge: -5 energy/câu → 10 câu tiêu hết energy_max
-- - User có thể mua refill ngay bằng coins từ shop

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS energy INTEGER DEFAULT 50,
  ADD COLUMN IF NOT EXISTS energy_max INTEGER DEFAULT 50,
  ADD COLUMN IF NOT EXISTS last_energy_refill TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS coins INTEGER DEFAULT 0;

-- Constants (đổi nếu cần)
-- ENERGY_PER_QUESTION = 5
-- ENERGY_REFILL_MINUTES = 6
-- ENERGY_REFILL_COIN_COST = 100

-- =================================================================
-- Function: tính energy hiện tại + đồng bộ vào profile
-- =================================================================
CREATE OR REPLACE FUNCTION public.compute_and_sync_energy(p_user_id UUID)
RETURNS TABLE(current_energy INTEGER, max_energy INTEGER, next_refill_in_seconds INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_energy INTEGER;
  v_max INTEGER;
  v_last_refill TIMESTAMPTZ;
  v_seconds_elapsed INTEGER;
  v_to_add INTEGER;
  v_new_energy INTEGER;
  v_new_refill_time TIMESTAMPTZ;
  v_next_in INTEGER;
BEGIN
  SELECT energy, energy_max, last_energy_refill
    INTO v_energy, v_max, v_last_refill
    FROM profiles WHERE id = p_user_id;

  IF v_energy IS NULL THEN
    v_energy := 50;
    v_max := 50;
    v_last_refill := NOW();
  END IF;

  v_seconds_elapsed := EXTRACT(EPOCH FROM (NOW() - v_last_refill))::INTEGER;
  v_to_add := v_seconds_elapsed / 360;  -- 360s = 6 phút
  v_new_energy := LEAST(v_max, v_energy + v_to_add);

  -- Adjust last_refill: trừ đi phần còn dư seconds chưa đủ 1 unit
  v_new_refill_time := v_last_refill + (v_to_add * INTERVAL '360 seconds');

  -- Nếu đã full, reset last_refill về NOW
  IF v_new_energy >= v_max THEN
    v_new_refill_time := NOW();
  END IF;

  -- Update profile nếu energy thay đổi
  IF v_new_energy <> v_energy THEN
    UPDATE profiles
      SET energy = v_new_energy,
          last_energy_refill = v_new_refill_time
      WHERE id = p_user_id;
  END IF;

  -- Tính giây tới refill tiếp theo
  IF v_new_energy >= v_max THEN
    v_next_in := 0;
  ELSE
    v_next_in := 360 - (EXTRACT(EPOCH FROM (NOW() - v_new_refill_time))::INTEGER % 360);
  END IF;

  RETURN QUERY SELECT v_new_energy, v_max, v_next_in;
END;
$$;

-- =================================================================
-- Function: tiêu energy (gọi trước khi user trả lời câu)
-- =================================================================
CREATE OR REPLACE FUNCTION public.consume_energy(p_user_id UUID, p_amount INTEGER DEFAULT 5)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current INTEGER;
BEGIN
  -- Sync trước khi tiêu
  SELECT current_energy INTO v_current FROM public.compute_and_sync_energy(p_user_id);

  IF v_current < p_amount THEN
    RETURN FALSE;
  END IF;

  UPDATE profiles
    SET energy = GREATEST(0, energy - p_amount),
        last_energy_refill = CASE
          WHEN energy = energy_max THEN NOW()  -- reset timer chỉ khi đang full
          ELSE last_energy_refill
        END
    WHERE id = p_user_id;

  RETURN TRUE;
END;
$$;

-- =================================================================
-- Function: hồi đầy năng lượng bằng coins (shop)
-- =================================================================
CREATE OR REPLACE FUNCTION public.refill_energy_with_coins(p_user_id UUID, p_cost INTEGER DEFAULT 100)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_coins INTEGER;
BEGIN
  SELECT coins INTO v_coins FROM profiles WHERE id = p_user_id;

  IF COALESCE(v_coins, 0) < p_cost THEN
    RETURN FALSE;
  END IF;

  UPDATE profiles
    SET energy = energy_max,
        coins = coins - p_cost,
        last_energy_refill = NOW()
    WHERE id = p_user_id;

  RETURN TRUE;
END;
$$;

-- =================================================================
-- Function: thưởng coins (gọi sau khi user hoàn thành daily/badge)
-- =================================================================
CREATE OR REPLACE FUNCTION public.award_coins(p_user_id UUID, p_amount INTEGER, p_reason TEXT DEFAULT NULL)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_coins INTEGER;
BEGIN
  UPDATE profiles
    SET coins = COALESCE(coins, 0) + p_amount
    WHERE id = p_user_id
    RETURNING coins INTO v_new_coins;
  RETURN v_new_coins;
END;
$$;

-- =================================================================
-- Tích hợp award coins vào daily completion trigger
-- =================================================================
CREATE OR REPLACE FUNCTION public.update_streak_on_daily_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_yesterday DATE;
  v_had_yesterday BOOLEAN;
  v_current_streak INTEGER;
  v_xp INTEGER;
  v_coins_to_award INTEGER;
BEGIN
  v_yesterday := NEW.completed_date - INTERVAL '1 day';

  SELECT EXISTS (
    SELECT 1 FROM daily_completions
    WHERE user_id = NEW.user_id AND completed_date = v_yesterday
  ) INTO v_had_yesterday;

  SELECT streak, total_xp INTO v_current_streak, v_xp
    FROM profiles WHERE id = NEW.user_id;

  IF v_had_yesterday THEN
    v_current_streak := COALESCE(v_current_streak, 0) + 1;
  ELSE
    v_current_streak := 1;
  END IF;

  -- Tính coins thưởng: 2 coins/câu đúng + bonus 50 coins nếu streak chia hết 7
  v_coins_to_award := NEW.questions_correct * 2;
  IF v_current_streak % 7 = 0 THEN
    v_coins_to_award := v_coins_to_award + 50;
  END IF;

  UPDATE profiles
    SET streak = v_current_streak,
        last_active_date = NEW.completed_date,
        total_xp = COALESCE(v_xp, 0) + COALESCE(NEW.xp_earned, 0),
        coins = COALESCE(coins, 0) + v_coins_to_award,
        updated_at = NOW()
    WHERE id = NEW.user_id;

  PERFORM public.check_and_award_badges(NEW.user_id);

  RETURN NEW;
END;
$$;

-- =================================================================
-- Backfill: set energy = max cho user hiện có
-- =================================================================
UPDATE public.profiles SET energy = 50, energy_max = 50, last_energy_refill = NOW(), coins = COALESCE(coins, 0)
WHERE energy IS NULL OR energy_max IS NULL;

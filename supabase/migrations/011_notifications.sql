-- =================================================================
-- Notifications system (DB-backed thay vì hard-code)
-- =================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('badge_earned','feedback_resolved','admin_broadcast','reminder','system','welcome')),
  title TEXT NOT NULL,
  body TEXT,
  icon TEXT DEFAULT 'bell',
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notif_user_unread ON public.notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notif_user_recent ON public.notifications(user_id, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- User chỉ xem/update notif của chính mình
DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own notifications" ON public.notifications;
CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- System (trigger / service_role) tạo notification
DROP POLICY IF EXISTS "System inserts notifications" ON public.notifications;
CREATE POLICY "System inserts notifications"
  ON public.notifications FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

-- Admin có thể tạo notification cho user khác (admin_broadcast)
DROP POLICY IF EXISTS "Admin broadcast notifications" ON public.notifications;
CREATE POLICY "Admin broadcast notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (public.is_admin() OR auth.uid() = user_id);

-- =================================================================
-- Trigger: tự tạo notification khi user nhận badge mới
-- =================================================================

CREATE OR REPLACE FUNCTION public.notify_on_badge_earned()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_badge_name TEXT;
  v_badge_icon TEXT;
BEGIN
  SELECT name, icon INTO v_badge_name, v_badge_icon
  FROM badges WHERE id = NEW.badge_id;

  INSERT INTO public.notifications (user_id, type, title, body, icon, link)
  VALUES (
    NEW.user_id,
    'badge_earned',
    'Huy hiệu mới: ' || COALESCE(v_badge_name, NEW.badge_id),
    'Chúc mừng! Bạn vừa đạt được huy hiệu ' || COALESCE(v_badge_icon, '🏅') || ' ' || COALESCE(v_badge_name, NEW.badge_id),
    COALESCE(v_badge_icon, '🏅'),
    '/vinhdanh'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_badge_earned ON public.user_badges;
CREATE TRIGGER trg_notify_badge_earned
AFTER INSERT ON public.user_badges
FOR EACH ROW
EXECUTE FUNCTION public.notify_on_badge_earned();

-- =================================================================
-- Trigger: notify user khi feedback được admin xử lý
-- =================================================================

CREATE OR REPLACE FUNCTION public.notify_on_feedback_resolved()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IN ('accepted', 'rejected') AND OLD.status <> NEW.status THEN
    INSERT INTO public.notifications (user_id, type, title, body, icon, link)
    VALUES (
      NEW.user_id,
      'feedback_resolved',
      CASE WHEN NEW.status = 'accepted' THEN '✓ Báo cáo của bạn được chấp nhận'
           ELSE '✗ Báo cáo của bạn đã được xem xét' END,
      'Câu hỏi ' || NEW.question_id || ': admin đã ' ||
        CASE WHEN NEW.status = 'accepted' THEN 'chấp nhận và sẽ chỉnh sửa.'
             ELSE 'xem xét nhưng không thay đổi nội dung.' END,
      CASE WHEN NEW.status = 'accepted' THEN '✓' ELSE 'ℹ' END,
      NULL
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_feedback_resolved ON public.question_feedback;
CREATE TRIGGER trg_notify_feedback_resolved
AFTER UPDATE ON public.question_feedback
FOR EACH ROW
EXECUTE FUNCTION public.notify_on_feedback_resolved();

-- =================================================================
-- Welcome notification: trao tay user khi profile mới được tạo
-- =================================================================

CREATE OR REPLACE FUNCTION public.notify_welcome_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, body, icon, link)
  VALUES (
    NEW.id,
    'welcome',
    '👋 Chào mừng đến GMHS Elite!',
    'Bắt đầu hành trình ôn luyện chuyên môn. Hãy thử Daily Challenge đầu tiên trong 5 phút.',
    '🎉',
    '/daily'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_welcome ON public.profiles;
CREATE TRIGGER trg_notify_welcome
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.notify_welcome_new_user();

-- =================================================================
-- Helper: broadcast notification từ admin
-- =================================================================

CREATE OR REPLACE FUNCTION public.broadcast_notification(
  p_title TEXT,
  p_body TEXT,
  p_icon TEXT DEFAULT '📢',
  p_link TEXT DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admin can broadcast notifications';
  END IF;

  INSERT INTO public.notifications (user_id, type, title, body, icon, link)
  SELECT id, 'admin_broadcast', p_title, p_body, p_icon, p_link
  FROM public.profiles;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

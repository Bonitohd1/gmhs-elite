-- =================================================================
-- Activity Log: feed hoạt động chung khoa
-- =================================================================

CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('daily_complete','weekly_complete','badge_earned','scenario_complete','level_up','signup')),
  detail TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_recent ON public.activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_user ON public.activity_log(user_id, created_at DESC);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Tất cả user xem được hoạt động (anonymized) của khoa
DROP POLICY IF EXISTS "Public activity feed" ON public.activity_log;
CREATE POLICY "Public activity feed"
  ON public.activity_log FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "System inserts activity" ON public.activity_log;
CREATE POLICY "System inserts activity"
  ON public.activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- =================================================================
-- Trigger: log daily completion
-- =================================================================

CREATE OR REPLACE FUNCTION public.log_daily_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.activity_log (user_id, type, detail, meta)
  VALUES (
    NEW.user_id,
    'daily_complete',
    'hoàn thành Daily Challenge ' || NEW.questions_correct || '/' || NEW.questions_total,
    jsonb_build_object(
      'questions_correct', NEW.questions_correct,
      'questions_total', NEW.questions_total,
      'xp_earned', NEW.xp_earned,
      'date', NEW.completed_date
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_log_daily_activity ON public.daily_completions;
CREATE TRIGGER trg_log_daily_activity
AFTER INSERT ON public.daily_completions
FOR EACH ROW
EXECUTE FUNCTION public.log_daily_activity();

-- =================================================================
-- Trigger: log badge earned
-- =================================================================

CREATE OR REPLACE FUNCTION public.log_badge_activity()
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

  INSERT INTO public.activity_log (user_id, type, detail, meta)
  VALUES (
    NEW.user_id,
    'badge_earned',
    'nhận huy hiệu ' || COALESCE(v_badge_icon, '🏅') || ' ' || COALESCE(v_badge_name, NEW.badge_id),
    jsonb_build_object('badge_id', NEW.badge_id, 'badge_name', v_badge_name, 'badge_icon', v_badge_icon)
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_log_badge_activity ON public.user_badges;
CREATE TRIGGER trg_log_badge_activity
AFTER INSERT ON public.user_badges
FOR EACH ROW
EXECUTE FUNCTION public.log_badge_activity();

-- =================================================================
-- View: activity feed với tên user
-- =================================================================

CREATE OR REPLACE VIEW public.activity_feed_view AS
SELECT
  al.id,
  al.user_id,
  COALESCE(p.display_name, 'Một ĐD') AS user_name,
  p.avatar_url,
  al.type,
  al.detail,
  al.meta,
  al.created_at,
  CASE al.type
    WHEN 'daily_complete' THEN '🎯'
    WHEN 'weekly_complete' THEN '📝'
    WHEN 'badge_earned' THEN '🏅'
    WHEN 'scenario_complete' THEN '🏥'
    WHEN 'level_up' THEN '⬆️'
    WHEN 'signup' THEN '👋'
    ELSE '✨'
  END AS icon
FROM public.activity_log al
LEFT JOIN public.profiles p ON p.id = al.user_id
ORDER BY al.created_at DESC;

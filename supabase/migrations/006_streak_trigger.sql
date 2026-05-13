-- =================================================================
-- Auto-update streak khi user hoàn thành Daily Challenge
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
BEGIN
  v_yesterday := NEW.completed_date - INTERVAL '1 day';

  -- Có completion hôm qua không?
  SELECT EXISTS (
    SELECT 1 FROM daily_completions
    WHERE user_id = NEW.user_id
      AND completed_date = v_yesterday
  ) INTO v_had_yesterday;

  -- Lấy streak hiện tại
  SELECT streak, total_xp INTO v_current_streak, v_xp
  FROM profiles WHERE id = NEW.user_id;

  IF v_had_yesterday THEN
    -- Liên tục, tăng streak
    v_current_streak := COALESCE(v_current_streak, 0) + 1;
  ELSE
    -- Gián đoạn, reset = 1 (vì hôm nay vừa hoàn thành)
    v_current_streak := 1;
  END IF;

  -- Update profile
  UPDATE profiles
  SET
    streak = v_current_streak,
    last_active_date = NEW.completed_date,
    total_xp = COALESCE(v_xp, 0) + COALESCE(NEW.xp_earned, 0),
    updated_at = NOW()
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$;

-- Drop trigger nếu đã tồn tại
DROP TRIGGER IF EXISTS trg_daily_completion_streak ON public.daily_completions;

CREATE TRIGGER trg_daily_completion_streak
AFTER INSERT ON public.daily_completions
FOR EACH ROW
EXECUTE FUNCTION public.update_streak_on_daily_completion();

-- =================================================================
-- One-off: backfill streak cho các user hiện có dựa trên completions sẵn có
-- =================================================================

CREATE OR REPLACE FUNCTION public.recompute_all_streaks()
RETURNS TABLE(user_id UUID, new_streak INTEGER, new_xp INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH user_completions AS (
    SELECT
      dc.user_id,
      dc.completed_date,
      ROW_NUMBER() OVER (PARTITION BY dc.user_id ORDER BY dc.completed_date DESC) AS rn,
      dc.completed_date - (ROW_NUMBER() OVER (PARTITION BY dc.user_id ORDER BY dc.completed_date DESC))::int * INTERVAL '1 day' AS grp
    FROM daily_completions dc
  ),
  latest_streaks AS (
    SELECT
      user_id,
      MAX(completed_date) AS last_date,
      COUNT(*) AS streak_len
    FROM user_completions
    WHERE grp = (
      SELECT MIN(grp) FROM user_completions uc2 WHERE uc2.user_id = user_completions.user_id
    )
    GROUP BY user_id
  ),
  total_xp_per_user AS (
    SELECT user_id, COALESCE(SUM(xp_earned), 0) AS total_xp
    FROM daily_completions
    GROUP BY user_id
  )
  UPDATE profiles p
  SET
    streak = CASE
      WHEN ls.last_date >= CURRENT_DATE - INTERVAL '1 day' THEN ls.streak_len::int
      ELSE 0
    END,
    last_active_date = ls.last_date,
    total_xp = COALESCE(t.total_xp, 0),
    updated_at = NOW()
  FROM latest_streaks ls, total_xp_per_user t
  WHERE p.id = ls.user_id AND p.id = t.user_id
  RETURNING p.id AS user_id, p.streak AS new_streak, p.total_xp AS new_xp;
END;
$$;

-- Chạy backfill ngay (tuỳ chọn - comment lại nếu không muốn)
-- SELECT * FROM public.recompute_all_streaks();

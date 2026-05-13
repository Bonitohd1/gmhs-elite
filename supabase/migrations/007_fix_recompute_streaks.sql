-- Fix lỗi ambiguous column trong recompute_all_streaks
-- Đổi tên OUT parameters để không trùng với column 'user_id'

DROP FUNCTION IF EXISTS public.recompute_all_streaks();

CREATE OR REPLACE FUNCTION public.recompute_all_streaks()
RETURNS TABLE(out_user_id UUID, out_streak INTEGER, out_xp INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH user_completions AS (
    SELECT
      dc.user_id AS uid,
      dc.completed_date,
      ROW_NUMBER() OVER (PARTITION BY dc.user_id ORDER BY dc.completed_date DESC) AS rn,
      dc.completed_date - (ROW_NUMBER() OVER (PARTITION BY dc.user_id ORDER BY dc.completed_date DESC))::int * INTERVAL '1 day' AS grp
    FROM daily_completions dc
  ),
  latest_streaks AS (
    SELECT
      uc.uid,
      MAX(uc.completed_date) AS last_date,
      COUNT(*) AS streak_len
    FROM user_completions uc
    WHERE uc.grp = (
      SELECT MIN(uc2.grp) FROM user_completions uc2 WHERE uc2.uid = uc.uid
    )
    GROUP BY uc.uid
  ),
  total_xp_per_user AS (
    SELECT dc.user_id AS uid, COALESCE(SUM(dc.xp_earned), 0) AS total_xp
    FROM daily_completions dc
    GROUP BY dc.user_id
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
  WHERE p.id = ls.uid AND p.id = t.uid
  RETURNING p.id, p.streak, p.total_xp;
END;
$$;

-- Test:
-- SELECT * FROM public.recompute_all_streaks();

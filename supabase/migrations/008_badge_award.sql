-- =================================================================
-- Auto-award badges khi user đạt mốc
-- Gọi function này từ trigger của daily_completions hoặc attempts
-- =================================================================

CREATE OR REPLACE FUNCTION public.check_and_award_badges(p_user_id UUID)
RETURNS TABLE(badge_id TEXT, badge_name TEXT, badge_icon TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_streak INTEGER;
  v_total_xp INTEGER;
  v_daily_count INTEGER;
  v_daily_perfect_count INTEGER;
  v_tt32_correct INTEGER;
  v_emergency_correct INTEGER;
  v_scenario_count INTEGER;
BEGIN
  -- Lấy thông tin user
  SELECT streak, total_xp INTO v_streak, v_total_xp
  FROM profiles WHERE id = p_user_id;

  -- Đếm số daily completion
  SELECT COUNT(*) INTO v_daily_count
  FROM daily_completions WHERE user_id = p_user_id;

  -- Đếm số daily 5/5 (perfect)
  SELECT COUNT(*) INTO v_daily_perfect_count
  FROM daily_completions
  WHERE user_id = p_user_id AND questions_correct = questions_total AND questions_total = 5;

  -- Đếm số câu TT32 (+/*) trả lời đúng
  SELECT COUNT(*) INTO v_tt32_correct
  FROM attempts a
  JOIN questions q ON a.question_id = q.id
  WHERE a.user_id = p_user_id
    AND a.is_correct = true
    AND q.tt32_tag IN ('+', '*');

  -- Đếm số câu cấp cứu (+) đúng
  SELECT COUNT(*) INTO v_emergency_correct
  FROM attempts a
  JOIN questions q ON a.question_id = q.id
  WHERE a.user_id = p_user_id
    AND a.is_correct = true
    AND q.tt32_tag = '+';

  -- Đếm số scenario completion (nếu bảng tồn tại)
  BEGIN
    SELECT COUNT(*) INTO v_scenario_count
    FROM scenario_completions WHERE user_id = p_user_id;
  EXCEPTION WHEN OTHERS THEN
    v_scenario_count := 0;
  END;

  -- Insert các badge mới đạt được (ON CONFLICT bỏ qua nếu đã có)
  -- Streak badges
  IF v_streak >= 7 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'streak_7') ON CONFLICT DO NOTHING;
  END IF;
  IF v_streak >= 30 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'streak_30') ON CONFLICT DO NOTHING;
  END IF;
  IF v_streak >= 100 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'streak_100') ON CONFLICT DO NOTHING;
  END IF;

  -- Daily badges
  IF v_daily_count >= 1 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'daily_first') ON CONFLICT DO NOTHING;
  END IF;
  IF v_daily_perfect_count >= 1 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'daily_perfect') ON CONFLICT DO NOTHING;
  END IF;

  -- TT32 badges
  IF v_tt32_correct >= 50 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'tt32_master') ON CONFLICT DO NOTHING;
  END IF;

  -- Emergency badges
  IF v_emergency_correct >= 30 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'emergency_hero') ON CONFLICT DO NOTHING;
  END IF;

  -- Scenario badges
  IF v_scenario_count >= 10 THEN
    INSERT INTO user_badges (user_id, badge_id) VALUES (p_user_id, 'scenario_solver') ON CONFLICT DO NOTHING;
  END IF;

  -- Trả về danh sách badge mới (chỉ những badge user vừa đạt được trong giây qua)
  RETURN QUERY
  SELECT b.id, b.name, b.icon
  FROM user_badges ub
  JOIN badges b ON ub.badge_id = b.id
  WHERE ub.user_id = p_user_id
    AND ub.earned_at >= NOW() - INTERVAL '5 seconds';
END;
$$;

-- =================================================================
-- Tích hợp vào trigger streak (gọi check_and_award_badges sau update streak)
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

  UPDATE profiles
  SET
    streak = v_current_streak,
    last_active_date = NEW.completed_date,
    total_xp = COALESCE(v_xp, 0) + COALESCE(NEW.xp_earned, 0),
    updated_at = NOW()
  WHERE id = NEW.user_id;

  -- Kiểm tra và trao huy hiệu (không cần xài kết quả - chỉ chạy side-effect)
  PERFORM public.check_and_award_badges(NEW.user_id);

  RETURN NEW;
END;
$$;

-- =================================================================
-- Backfill badges cho user hiện có
-- =================================================================

CREATE OR REPLACE FUNCTION public.recompute_all_badges()
RETURNS TABLE(out_user_id UUID, out_total_badges INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id FROM profiles LOOP
    PERFORM public.check_and_award_badges(r.id);
  END LOOP;

  RETURN QUERY
  SELECT p.id, COUNT(ub.badge_id)::int AS total
  FROM profiles p
  LEFT JOIN user_badges ub ON p.id = ub.user_id
  GROUP BY p.id;
END;
$$;

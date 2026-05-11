-- 10 levels
INSERT INTO levels (id, name, icon, color, xp_min, xp_max) VALUES
(1, 'Tân binh', '🌱', '#94A3B8', 0, 500),
(2, 'Học việc', '📚', '#60A5FA', 500, 1200),
(3, 'Thực tập sinh', '💉', '#34D399', 1200, 2200),
(4, 'Điều dưỡng viên', '🩺', '#10B981', 2200, 3500),
(5, 'Kỳ cựu', '⚕️', '#0EA5E9', 3500, 5000),
(6, 'Chuyên gia', '🎯', '#F59E0B', 5000, 7000),
(7, 'Bậc thầy', '🏆', '#EAB308', 7000, 9500),
(8, 'Tinh anh', '💎', '#A855F7', 9500, 12500),
(9, 'Đại sư', '👑', '#EC4899', 12500, 16000),
(10, 'Huyền thoại GMHS', '⚡', '#DC2626', 16000, 99999)
ON CONFLICT (id) DO NOTHING;

-- 20 badges
INSERT INTO badges (id, name, icon, description, tier, criteria_type, criteria_value, display_order) VALUES
('streak_7', 'Chuỗi 7 ngày', '🔥', 'Đăng nhập học 7 ngày liên tục', 'bronze', 'streak', 7, 1),
('streak_30', 'Chuỗi 30 ngày', '🔥🔥', '30 ngày liên tục', 'silver', 'streak', 30, 2),
('streak_100', 'Chuỗi trăm', '🔥🔥🔥', '100 ngày liên tục', 'gold', 'streak', 100, 3),
('daily_first', 'Khởi đầu', '🌱', 'Hoàn thành Daily đầu tiên', 'bronze', 'daily_count', 1, 4),
('daily_perfect', 'Hoàn hảo', '💯', 'Daily 5/5 đúng', 'silver', 'daily_perfect', 1, 5),
('weekly_top10', 'Top tuần', '🥇', 'Top 10 Weekly Mini-test', 'gold', 'weekly_top', 1, 6),
('tt32_master', 'TT32 Master', '⚖️', 'Trả lời đúng 50 câu TT32', 'silver', 'tt32_correct', 50, 7),
('tt32_zero', 'Tuân thủ tuyệt đối', '🛡️', '30 ngày 0 vi phạm phạm vi', 'gold', 'tt32_clean', 30, 8),
('emergency_hero', 'Cấp cứu kịp thời', '⚡', 'Hoàn thành 30 câu cấp cứu (+)', 'silver', 'emergency_correct', 30, 9),
('asepsis', 'Vô khuẩn xuất sắc', '🦠', '100% nhóm KSNK', 'gold', 'domain_perfect', 4, 10),
('surgical_safety', 'An toàn phẫu thuật', '🏥', 'Hoàn thành mod QĐ 7482', 'silver', 'course', 1, 11),
('blood_expert', 'Truyền máu chuyên gia', '🩸', '100% nhóm truyền máu', 'gold', 'topic', 1, 12),
('airway_expert', 'Đường thở vững', '🌬️', '100% nhóm rút NKQ + thở máy', 'gold', 'topic', 2, 13),
('team_player', 'Đồng đội', '🤝', 'Tham gia 5 thi đấu nhóm', 'bronze', 'team', 5, 14),
('early_bird', 'Dậy sớm', '🌅', 'Học trước 7h sáng 10 lần', 'bronze', 'early', 10, 15),
('night_owl', 'Cú đêm', '🦉', 'Học sau 22h 10 lần', 'bronze', 'late', 10, 16),
('scenario_solver', 'Giải tình huống', '🧩', 'Hoàn thành 10 scenario lâm sàng', 'silver', 'scenario_count', 10, 17),
('mentor', 'Người dẫn lối', '🎓', 'Hỗ trợ ĐD mới (peer review)', 'gold', 'mentor', 1, 18),
('hall_of_fame', 'Hall of Fame', '🏛️', 'Lọt vào Top 10 năm', 'legendary', 'top_year', 10, 19),
('gala_winner', 'Vô địch Rung chuông vàng', '🔔', 'Vô địch Gala 12/5', 'legendary', 'gala', 1, 20)
ON CONFLICT (id) DO NOTHING;

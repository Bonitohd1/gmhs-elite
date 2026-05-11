-- Vinh danh: Badges, Levels, User Badges
CREATE TABLE badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  tier TEXT CHECK(tier IN ('bronze','silver','gold','legendary')) DEFAULT 'bronze',
  criteria_type TEXT,  -- streak, daily_perfect, tt32, etc
  criteria_value INTEGER,
  display_order INTEGER DEFAULT 100
);

CREATE TABLE levels (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  xp_min INTEGER NOT NULL,
  xp_max INTEGER NOT NULL
);

CREATE TABLE user_badges (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read badges" ON badges FOR SELECT USING (true);
CREATE POLICY "Public read levels" ON levels FOR SELECT USING (true);
CREATE POLICY "Users view all user_badges" ON user_badges FOR SELECT USING (true);
CREATE POLICY "Users insert own badges" ON user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

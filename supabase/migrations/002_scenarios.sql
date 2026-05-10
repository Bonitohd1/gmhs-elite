-- =================================================================
-- GMHS Elite — Migration 002: Clinical Scenarios + Weekly tests
-- Chạy SAU 001_initial_schema.sql
-- =================================================================

-- Scenarios (clinical decision trees)
CREATE TABLE scenarios (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  intro TEXT NOT NULL,
  skill_id TEXT REFERENCES skills(id),
  tt32_tag TEXT DEFAULT '',
  steps JSONB NOT NULL,      -- array of {id, prompt, options:[{label, next, points, feedback}]}
  endings JSONB NOT NULL,    -- {ending_key: {title, msg}}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scenario attempts
CREATE TABLE scenario_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_id TEXT REFERENCES scenarios(id),
  total_points INTEGER,
  history JSONB,             -- array of {step_id, choice_label, points}
  ending_key TEXT,
  taken_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly test attempts (track 1 set per week per user)
CREATE TABLE weekly_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  week_id TEXT NOT NULL,    -- format: 2026-W19
  questions_correct INTEGER,
  questions_total INTEGER,
  xp_earned INTEGER,
  duration_seconds INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_id)
);

-- RLS
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read scenarios" ON scenarios FOR SELECT USING (true);
CREATE POLICY "Users view own scenario attempts" ON scenario_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own scenario attempts" ON scenario_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users view own weekly" ON weekly_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own weekly" ON weekly_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

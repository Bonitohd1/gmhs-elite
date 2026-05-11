-- =================================================================
-- GMHS Elite 2026 — Initial Schema (minimal data approach)
-- Chạy 1 lần trên Supabase SQL Editor sau khi tạo project
-- =================================================================

-- Profiles (extends auth.users của Supabase)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  level TEXT CHECK(level IN ('secondary','college','university','university+')) DEFAULT 'college',
  cert TEXT[] DEFAULT '{}',
  total_xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_active_date DATE,
  show_in_leaderboard BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skill domains (6 domains)
CREATE TABLE skill_domains (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#0F766E'
);

-- Skills (27 skills)
CREATE TABLE skills (
  id TEXT PRIMARY KEY,
  domain_id TEXT REFERENCES skill_domains(id),
  name TEXT NOT NULL,
  tt32_tag TEXT CHECK(tt32_tag IN ('','+','*')) DEFAULT '',
  level_required TEXT DEFAULT 'all',
  source_doc_ids TEXT[] DEFAULT '{}'
);

-- Documents (31 source docs)
CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  code TEXT,
  title TEXT NOT NULL,
  category TEXT,
  format TEXT,
  priority TEXT,
  role TEXT,
  tt32_tag TEXT DEFAULT '',
  excerpt TEXT
);

-- Question bank (150+ questions)
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  skill_id TEXT REFERENCES skills(id),
  difficulty SMALLINT CHECK(difficulty BETWEEN 1 AND 3),
  type TEXT DEFAULT 'single_choice',
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index SMALLINT NOT NULL,
  explanation TEXT,
  tt32_tag TEXT DEFAULT '',
  source_doc_ids TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'approved'
);

-- Attempts (mỗi lần trả lời)
CREATE TABLE attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT REFERENCES questions(id),
  answer_index SMALLINT,
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  context TEXT DEFAULT 'daily', -- daily/weekly/monthly/scenario
  taken_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index để query nhanh
CREATE INDEX idx_attempts_user ON attempts(user_id, taken_at DESC);
CREATE INDEX idx_questions_skill ON questions(skill_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);

-- Daily completion log (để tính streak)
CREATE TABLE daily_completions (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_date DATE,
  questions_correct INTEGER,
  questions_total INTEGER,
  xp_earned INTEGER,
  PRIMARY KEY (user_id, completed_date)
);

-- =================================================================
-- ROW LEVEL SECURITY (RLS)
-- =================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Profiles: user xem/sửa profile của chính mình
CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Public profiles (cho leaderboard) - chỉ những user opt-in
CREATE POLICY "View public profiles" ON profiles FOR SELECT USING (show_in_leaderboard = true);

-- Attempts: user xem/insert attempts của chính mình
CREATE POLICY "Users view own attempts" ON attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own attempts" ON attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily completions
CREATE POLICY "Users view own daily" ON daily_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own daily" ON daily_completions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Content (skills/questions/documents): public read
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read domains" ON skill_domains FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Public read documents" ON documents FOR SELECT USING (true);

-- =================================================================
-- TRIGGERS — Tự động tạo profile khi user đăng ký
-- =================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'level', 'college')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant permissions cho Supabase auth admin để trigger work
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT INSERT, SELECT ON public.profiles TO supabase_auth_admin;

-- Policy cho service role bypass RLS
CREATE POLICY "Service role full access" ON public.profiles
  FOR ALL TO supabase_auth_admin, service_role
  USING (true) WITH CHECK (true);

-- =================================================================
-- HELPER FUNCTIONS
-- =================================================================

-- Get questions weighted by user's weak skills (adaptive selection)
CREATE OR REPLACE FUNCTION get_daily_questions(p_user_id UUID, p_count INTEGER DEFAULT 5)
RETURNS SETOF questions AS $$
BEGIN
  RETURN QUERY
  SELECT q.* FROM questions q
  WHERE q.status = 'approved'
  ORDER BY RANDOM()
  LIMIT p_count;
END;
$$ LANGUAGE plpgsql STABLE;

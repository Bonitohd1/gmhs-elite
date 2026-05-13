-- =================================================================
-- Question feedback: user báo cáo câu hỏi sai/khó hiểu
-- =================================================================

CREATE TABLE IF NOT EXISTS public.question_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  reason TEXT NOT NULL CHECK(reason IN ('wrong_answer','unclear','outdated','typo','other')),
  comment TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','reviewing','accepted','rejected')),
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_qfb_status ON public.question_feedback(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qfb_question ON public.question_feedback(question_id);
CREATE INDEX IF NOT EXISTS idx_qfb_user ON public.question_feedback(user_id);

ALTER TABLE public.question_feedback ENABLE ROW LEVEL SECURITY;

-- User chỉ insert/xem feedback của chính mình
DROP POLICY IF EXISTS "Users insert own feedback" ON public.question_feedback;
CREATE POLICY "Users insert own feedback"
  ON public.question_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own feedback" ON public.question_feedback;
CREATE POLICY "Users view own feedback"
  ON public.question_feedback FOR SELECT
  USING (auth.uid() = user_id);

-- Admin xem tất cả + update (tạm thời cho phép tất cả authenticated user xem - sẽ hardening sau khi có is_admin column)
DROP POLICY IF EXISTS "Admin view all feedback" ON public.question_feedback;
CREATE POLICY "Admin view all feedback"
  ON public.question_feedback FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin update feedback" ON public.question_feedback;
CREATE POLICY "Admin update feedback"
  ON public.question_feedback FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =================================================================
-- Add is_admin column to profiles + harden RLS
-- =================================================================

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin) WHERE is_admin = TRUE;

-- Helper function to check admin status (cleaner usage in policies)
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE((SELECT is_admin FROM profiles WHERE id = p_user_id), FALSE);
$$;

-- =================================================================
-- Update question_feedback policies: chỉ admin xem/update tất cả
-- =================================================================
DROP POLICY IF EXISTS "Admin view all feedback" ON public.question_feedback;
CREATE POLICY "Admin view all feedback"
  ON public.question_feedback FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update feedback" ON public.question_feedback;
CREATE POLICY "Admin update feedback"
  ON public.question_feedback FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- =================================================================
-- Set admin cho 1 email khởi tạo
-- THAY EMAIL DƯỚI ĐÂY BẰNG EMAIL CỦA BẠN
-- =================================================================
UPDATE public.profiles
SET is_admin = TRUE
WHERE id IN (
  SELECT id FROM auth.users WHERE email IN ('vietduchn01@gmail.com')
);

-- Verify
-- SELECT u.email, p.is_admin FROM auth.users u JOIN profiles p ON u.id = p.id WHERE p.is_admin = TRUE;

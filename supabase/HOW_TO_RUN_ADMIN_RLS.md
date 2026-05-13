# Nạp is_admin role + Admin Protection

## Mục đích

Phân quyền rõ ràng giữa user thường và admin:
- Sidebar **ẩn section "Quản trị"** với user thường
- Middleware **redirect non-admin** khi truy cập `/admin/**`
- RLS policy chỉ cho admin xem question_feedback của tất cả user

## Chạy migration

Supabase → SQL Editor → New query → copy nội dung file:
```
supabase/migrations/010_is_admin.sql
```

Paste → Run.

⚠️ **QUAN TRỌNG:** Trong file SQL có dòng cuối set admin cho email `vietduchn01@gmail.com`. Nếu bạn muốn set admin cho email khác, sửa lại dòng đó trước khi Run, hoặc chạy thêm:

```sql
UPDATE public.profiles
SET is_admin = TRUE
WHERE id IN (
  SELECT id FROM auth.users
  WHERE email IN ('email1@gmail.com', 'email2@gmail.com')
);
```

## Verify

```sql
-- Xem danh sách admin
SELECT u.email, p.is_admin
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE p.is_admin = TRUE;

-- Test helper function
SELECT public.is_admin('<user-uuid>');
```

## Sau khi nạp

1. Push code → Vercel auto-build
2. Đăng nhập bằng email admin → vẫn thấy section "Quản trị" trong sidebar
3. Đăng nhập email user thường → KHÔNG thấy section "Quản trị"
4. User thường thử truy cập trực tiếp `https://gmhs-elite.vercel.app/admin` → redirect về `/dashboard?notice=admin_only`

## Thêm admin sau này

Vào Supabase → Table editor → profiles → tìm user theo id → check ô `is_admin = true` → Save. Hoặc chạy SQL:

```sql
UPDATE public.profiles
SET is_admin = TRUE
WHERE id = '<user-uuid>';
```

## Bỏ admin

```sql
UPDATE public.profiles
SET is_admin = FALSE
WHERE id = '<user-uuid>';
```

## Audit truy cập admin

```sql
-- Xem ai đã review feedback gần đây
SELECT u.email, qf.question_id, qf.status, qf.reviewed_at
FROM question_feedback qf
JOIN auth.users u ON u.id = qf.reviewed_by
WHERE qf.reviewed_at IS NOT NULL
ORDER BY qf.reviewed_at DESC LIMIT 20;
```

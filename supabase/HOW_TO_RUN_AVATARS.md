# Setup Avatar Upload trên Supabase

## 1. Chạy migration

Vào Supabase Dashboard → SQL Editor → New query → copy nội dung file:
```
supabase/migrations/005_avatars.sql
```

→ Paste → Run.

Migration này sẽ:
- Thêm cột `avatar_url` vào bảng `profiles`
- Tạo storage bucket tên `avatars` (public, max 2 MB, JPG/PNG/WebP)
- Tạo 4 RLS policies cho bucket avatars (view public, user CRUD own files)

## 2. Verify

```sql
-- Check column added
SELECT column_name FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'avatar_url';

-- Check bucket created
SELECT id, name, public FROM storage.buckets WHERE id = 'avatars';

-- Check policies
SELECT policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
```

## 3. Test trên app

1. Đăng nhập → vào trang Hồ sơ
2. Bấm nút "📷 Tải ảnh lên"
3. Chọn file JPG/PNG (< 2 MB)
4. Ảnh sẽ hiển thị ngay + tự lưu vào `avatars/{user_id}/avatar.{ext}`
5. URL sẽ ghi vào `profiles.avatar_url`
6. Avatar mới cũng hiện ở góc trên phải (Topbar)

## Cấu trúc lưu trữ

```
avatars/
  {user-uuid-1}/
    avatar.jpg
  {user-uuid-2}/
    avatar.png
```

Mỗi user chỉ có 1 avatar — upload mới sẽ overwrite (upsert: true).

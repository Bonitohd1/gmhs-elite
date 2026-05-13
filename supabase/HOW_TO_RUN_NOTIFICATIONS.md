# Nạp Notification System DB-backed

## Mục đích

Chuông 🔔 trên Topbar đã rỗng. Migration này tạo:
- Bảng `notifications` với 6 loại thông báo
- 3 trigger tự động: badge_earned, feedback_resolved, welcome
- Function `broadcast_notification(title, body, icon, link)` cho admin gửi broadcast

## Chạy migration

Supabase → SQL Editor → paste `supabase/migrations/011_notifications.sql` → Run.

## Test

1. Tạo tài khoản mới → notification "👋 Chào mừng" tự xuất hiện
2. Hoàn thành Daily Challenge → badge "Khởi đầu" trao → notification "Huy hiệu mới: Khởi đầu"
3. Admin xử lý 1 feedback (accept/reject) → user nhận notification kết quả

## Gửi broadcast từ admin

```sql
SELECT public.broadcast_notification(
  '📢 Cập nhật mới',
  'GMHS Elite vừa thêm 156 câu hỏi mới. Vào /daily để thử ngay!',
  '🎉',
  '/daily'
);
```

→ Tất cả user nhận notification.

## Verify

```sql
-- Đếm notification chưa đọc
SELECT user_id, COUNT(*) AS unread
FROM notifications WHERE is_read = FALSE
GROUP BY user_id;

-- Xem notification của 1 user
SELECT * FROM notifications WHERE user_id = '<uuid>' ORDER BY created_at DESC LIMIT 10;
```

## Hành vi UI

- Topbar bell 🔔 hiện badge đỏ với số unread (max 9+)
- Click bell → dropdown 80px wide hiện max 15 notification gần nhất
- Click 1 notification → đánh dấu đã đọc + redirect link (nếu có)
- Nút "Đánh dấu đã đọc tất cả" góc trên
- Refresh tự động mỗi 30 giây

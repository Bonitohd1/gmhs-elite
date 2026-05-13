# Nạp Question Feedback Table

## Mục đích

User bấm nút 🚩 "Báo cáo câu này" sau khi xem giải thích → modal hiện ra cho phép chọn lý do (sai đáp án / khó hiểu / lỗi thời / typo / khác) + comment → lưu vào DB.

Admin vào `/admin/feedback` xem tất cả báo cáo + chuyển status (pending → reviewing → accepted/rejected).

## Chạy migration

Supabase → SQL Editor → New query → copy nội dung file:
```
supabase/migrations/009_question_feedback.sql
```

Paste → Run.

Verify:
```sql
SELECT column_name FROM information_schema.columns
WHERE table_name = 'question_feedback';
-- Phải có: id, user_id, question_id, reason, comment, status, admin_note, created_at, reviewed_at, reviewed_by

SELECT policyname FROM pg_policies WHERE tablename = 'question_feedback';
-- Phải có 4 policies
```

## Test flow

1. Đăng nhập user → vào `/daily` → làm 1 câu → bấm nút 🚩 "Báo cáo câu này"
2. Modal hiện ra → chọn lý do + nhập comment → bấm "Gửi báo cáo"
3. Đăng nhập admin → vào `/admin/feedback` → thấy báo cáo vừa gửi với status "Chờ xem"
4. Admin bấm "Bắt đầu xem" → chuyển sang "reviewing"
5. Admin bấm "Chấp nhận" hoặc "Từ chối" → status final

## Logic admin (sau khi accept)

Khi admin "Chấp nhận" báo cáo, admin cần:
1. Sửa câu hỏi gốc trong bảng `questions` (qua admin UI hoặc SQL)
2. Có thể notify user đã báo cáo (sau pilot)

Trong pilot phase, admin chỉ cần track + sửa thủ công.

## Báo cáo hàng tuần

Query để xem top question bị report:
```sql
SELECT q.id, q.question, COUNT(*) AS reports,
  string_agg(DISTINCT fb.reason, ', ') AS reasons
FROM question_feedback fb
JOIN questions q ON q.id = fb.question_id
WHERE fb.status IN ('pending', 'reviewing', 'accepted')
GROUP BY q.id, q.question
ORDER BY reports DESC
LIMIT 20;
```

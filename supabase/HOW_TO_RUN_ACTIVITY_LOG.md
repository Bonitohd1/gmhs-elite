# Nạp Activity Log

## Mục đích

Bookmarks page tab "📡 Hoạt động khoa" và Dashboard heatmap đang dùng data mock cứng. Migration này:
- Tạo bảng `activity_log` ghi mọi hoạt động học của user
- 2 triggers tự log: daily_complete, badge_earned
- View `activity_feed_view` join với profiles để hiện tên + avatar
- Hiện trên Bookmarks page real-time

## Chạy

Supabase → SQL Editor → paste `supabase/migrations/012_activity_log.sql` → Run.

## Verify

```sql
-- Bảng tồn tại
SELECT COUNT(*) FROM activity_log;

-- View hoạt động
SELECT * FROM activity_feed_view LIMIT 10;

-- Test: tạo 1 activity manual
INSERT INTO activity_log (user_id, type, detail) VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'daily_complete',
  'hoàn thành test'
);
```

## Loại activity

| Type | Tự tạo từ | Icon |
|---|---|---|
| daily_complete | trigger trên daily_completions | 🎯 |
| badge_earned | trigger trên user_badges | 🏅 |
| weekly_complete | (cần wire thêm) | 📝 |
| scenario_complete | (cần wire thêm) | 🏥 |
| level_up | (cần wire thêm) | ⬆️ |
| signup | (cần wire thêm) | 👋 |

Pilot phase 1 dùng 2 loại đầu là đủ. Các loại còn lại sẽ thêm sau.

## Backfill activity từ data sẵn có

```sql
-- Tạo activity log cho các daily_completions sẵn có
INSERT INTO activity_log (user_id, type, detail, meta, created_at)
SELECT
  dc.user_id,
  'daily_complete',
  'hoàn thành Daily Challenge ' || dc.questions_correct || '/' || dc.questions_total,
  jsonb_build_object('questions_correct', dc.questions_correct, 'questions_total', dc.questions_total, 'xp_earned', dc.xp_earned),
  dc.completed_date::timestamptz
FROM daily_completions dc
LEFT JOIN activity_log al ON al.user_id = dc.user_id AND al.meta->>'date' = dc.completed_date::text
WHERE al.id IS NULL;

-- Tạo activity log cho các badge đã có
INSERT INTO activity_log (user_id, type, detail, meta, created_at)
SELECT
  ub.user_id,
  'badge_earned',
  'nhận huy hiệu ' || b.icon || ' ' || b.name,
  jsonb_build_object('badge_id', b.id, 'badge_name', b.name, 'badge_icon', b.icon),
  ub.earned_at
FROM user_badges ub
JOIN badges b ON b.id = ub.badge_id
LEFT JOIN activity_log al ON al.user_id = ub.user_id AND al.meta->>'badge_id' = b.id
WHERE al.id IS NULL;
```

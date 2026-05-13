# Nạp Auto-Award Badges Trigger

## Mục đích

Khi user đạt mốc, hệ thống tự động trao huy hiệu (insert vào `user_badges`). Hỗ trợ:

| Badge ID | Trigger khi |
|---|---|
| `streak_7` | streak ≥ 7 ngày |
| `streak_30` | streak ≥ 30 ngày |
| `streak_100` | streak ≥ 100 ngày |
| `daily_first` | hoàn thành Daily Challenge lần đầu |
| `daily_perfect` | có 1 Daily 5/5 đúng |
| `tt32_master` | trả lời đúng ≥ 50 câu TT32 (+ hoặc *) |
| `emergency_hero` | trả lời đúng ≥ 30 câu cấp cứu (+) |
| `scenario_solver` | hoàn thành ≥ 10 scenarios |

## Cách chạy

Supabase → SQL Editor → New query → copy `supabase/migrations/008_badge_award.sql` → Run.

Sẽ:
1. Tạo function `check_and_award_badges(user_id)` — chạy mỗi lần daily completion
2. Update trigger `update_streak_on_daily_completion` để gọi function trên
3. Tạo function `recompute_all_badges()` để backfill

## Verify

```sql
-- Function tồn tại?
SELECT proname FROM pg_proc WHERE proname IN ('check_and_award_badges','recompute_all_badges');

-- Test trao badge thủ công cho 1 user (lấy id từ profiles)
SELECT * FROM public.check_and_award_badges('<uuid_của_user>');
```

## Backfill cho 6 user hiện có

```sql
SELECT * FROM public.recompute_all_badges();
```

Sẽ trả về bảng user_id + total_badges. Nếu user nào có streak hoặc daily completion, badge sẽ được trao tự động.

## Test flow

1. User hoàn thành Daily Challenge → `daily_completions` INSERT
2. Trigger fire → update streak/XP
3. Trigger gọi `check_and_award_badges(user_id)`
4. Function check tất cả mốc → insert badges mới (ON CONFLICT DO NOTHING)
5. User refetch profile + badges → thấy huy hiệu mới

Có thể nâng cấp thêm: hiển thị popup "🎉 Bạn vừa nhận huy hiệu mới!" trên frontend sau khi daily xong, bằng cách so sánh badges trước/sau.

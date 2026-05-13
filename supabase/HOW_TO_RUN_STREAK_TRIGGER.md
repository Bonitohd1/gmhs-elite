# Nạp DB trigger tự động tính Streak

## Mục đích

Khi user hoàn thành Daily Challenge, hệ thống tự động:
- Tăng `streak` +1 nếu hôm qua đã có completion
- Reset `streak` = 1 nếu bị gián đoạn (vd: bỏ 2 ngày)
- Cập nhật `last_active_date` = hôm nay
- Cộng dồn `total_xp`

Trước đây frontend tự update streak/XP (logic sai khi user bỏ ngày). Giờ logic chuyển hết vào DB trigger → đúng + an toàn hơn.

## Cách chạy

Vào **Supabase → SQL Editor → New query**, copy nội dung file:
```
supabase/migrations/006_streak_trigger.sql
```

Paste → bấm **Run**.

Kết quả mong đợi: `Success. No rows returned`.

## Verify

Test 1 — trigger có tồn tại?
```sql
SELECT trigger_name, event_manipulation, action_timing
FROM information_schema.triggers
WHERE event_object_table = 'daily_completions';
```
→ Phải hiện `trg_daily_completion_streak`, `INSERT`, `AFTER`.

Test 2 — function có tồn tại?
```sql
SELECT proname FROM pg_proc
WHERE proname IN ('update_streak_on_daily_completion', 'recompute_all_streaks');
```
→ Phải hiện cả 2 function.

## Backfill streak cho user hiện có (tuỳ chọn)

Nếu các user pilot hiện đang có streak/XP sai (do logic cũ), chạy lệnh này để tính lại:

```sql
SELECT * FROM public.recompute_all_streaks();
```

Sẽ trả về bảng user_id + new_streak + new_xp tính từ lịch sử daily_completions thật.

## Sau khi nạp xong

Frontend đã update để KHÔNG manual set streak/XP nữa (xem `src/app/daily/page.tsx`). Cần push code mới + nạp SQL này trước khi user test.

## Logic chi tiết

Khi `INSERT INTO daily_completions` xảy ra:

1. Trigger `trg_daily_completion_streak` chạy `AFTER INSERT FOR EACH ROW`
2. Function kiểm tra: có completion ngày `NEW.completed_date - 1` không?
3. Nếu có → `streak += 1`. Nếu không → `streak = 1`
4. UPDATE profile: `streak`, `last_active_date`, `total_xp += xp_earned`, `updated_at`

Tất cả trong 1 transaction → nguyên tử + an toàn race condition.

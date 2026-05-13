# Nạp Energy + Shop + Analytics (Phase 1+2+3)

## Cách chạy (theo thứ tự!)

Supabase → SQL Editor → New query → chạy từng file 1 lần:

1. `supabase/migrations/012_activity_log.sql` (nếu chưa)
2. `supabase/migrations/013_energy_system.sql`
3. `supabase/migrations/014_shop.sql`

Verify:
```sql
-- Cột energy/coins
SELECT column_name FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name IN ('energy','coins','energy_max');

-- Functions
SELECT proname FROM pg_proc
WHERE proname IN ('compute_and_sync_energy','consume_energy','refill_energy_with_coins','purchase_shop_item','award_coins');

-- Shop items
SELECT id, name, cost_coins FROM shop_items ORDER BY display_order;
```

## Quy tắc Energy

| Tham số | Giá trị |
|---|---|
| Energy max | 50 |
| Mỗi câu Daily Challenge | -5 energy |
| Refill rate | 1 energy / 6 phút |
| Full refill từ 0 | 5 giờ |
| Mua refill ngay | 100 coins |

→ User tối đa làm 10 câu liên tục, sau đó chờ hồi hoặc mua.

## Quy tắc Coins

| Sự kiện | Thưởng |
|---|---|
| 1 câu đúng (daily) | +2 coins |
| Hoàn thành Daily 5/5 | +20 coins (xp_earned bonus đã có) |
| Streak 7/14/21 ngày | +50 coins/lần |
| Mua streak shield | -500 coins |
| Refill energy full | -100 coins |
| Voucher cafe BV (admin xác nhận) | -5000 coins |

## Shop Items (8 items seeded)

| Item | Cost | Effect |
|---|---|---|
| ⚡ Hồi đầy energy | 100 | Refill full ngay |
| 🛡️ Streak Shield | 500 | Bảo vệ streak 1 ngày |
| 🥇 Frame vàng | 1000 | Khung avatar |
| 💎 Frame kim cương | 3000 | Khung avatar |
| 🚨 Pack cấp cứu | 300 | Mở 50 câu chuyên sâu |
| 🫀 Pack ECMO | 500 | Mở 30 câu ECMO |
| ☕ Voucher cafe 50k | 5000 | Admin xử lý thủ công |
| 📚 Voucher sách 200k | 20000 | Admin xử lý thủ công |

## Frontend

- Topbar hiện `⚡ X/50` + `🪙 N` (compact mode)
- Daily page: tiêu 5 energy/câu, alert nếu hết
- Shop page: full Vietnamese UI + lịch sử mua
- Admin analytics: `/admin/analytics`

## Tweak gameplay (sau pilot)

Nếu user phản hồi "khó quá / dễ quá":

```sql
-- Tăng energy_max lên 100 (chơi 20 câu/lần)
UPDATE profiles SET energy_max = 100;

-- Hoặc giảm cost mỗi câu xuống 3
-- (Sửa hàm consume_energy, tham số p_amount = 3 ở daily/page.tsx)

-- Hoặc giảm refill time xuống 3 phút
-- (Sửa hàm compute_and_sync_energy, đổi 360 thành 180)
```

## Admin Analytics

Trang `/admin/analytics` hiện 8 metric:
1. Tổng ĐD trong khoa
2. DAU hôm nay + % khoa
3. MAU 30 ngày + % khoa
4. Độ chính xác trung bình + tổng lượt trả lời
5. Biểu đồ hoạt động 30 ngày (bar chart)
6. Top 10 kỹ năng yếu nhất (sort accuracy ASC)
7. Top 5 câu hỏi bị sai nhiều nhất
8. Stats engagement: streak ≥ 7, tổng badge, số câu, tổng lượt

**Hoàn toàn ẩn danh** - không hiện điểm cá nhân.

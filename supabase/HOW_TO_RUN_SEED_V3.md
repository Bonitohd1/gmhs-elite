# Nạp bộ câu hỏi V3 — nâng ngân hàng lên 500 câu

## Kết quả sau khi nạp

| Thông số | Trước (V2) | Sau (V3) |
|----------|-----------|----------|
| **Tổng câu hỏi** | 306 | **500** |
| Câu mới thêm | — | **194** (Q0307 → Q0500) |
| Câu dễ (Lv 1) | | 173 |
| Câu trung bình (Lv 2) | | 231 |
| Câu khó (Lv 3) | | 96 |
| Câu chuyên khoa GMHS (`*`) | | 81 |
| Câu cấp cứu (`+`) | | 73 |
| Skill ít câu nhất | 10 câu | **15 câu** |

**Cả 27 kỹ năng đều có ≥ 15 câu hỏi** → đủ để chạy adaptive learning, thi thử và Gala mà không lặp câu.

Phân bổ đều trên 6 lĩnh vực: Đạo đức & hành nghề (D1), Chăm sóc người bệnh (D2), Kỹ thuật GMHS (D3), An toàn & KSNK (D4), Cấp cứu (D5), Quản trị chuyên môn (D6).

---

## Các bước nạp (mất ~2 phút)

### Bước 1 — Mở Supabase SQL Editor
1. Vào https://supabase.com/dashboard → chọn project **gmhs-elite**
2. Menu trái → **SQL Editor** → **New query**

### Bước 2 — Copy nội dung file
Mở file `GMHS_Elite_Backend/supabase/seed_questions_v3.sql` → Ctrl+A → Ctrl+C

### Bước 3 — Dán và chạy
Dán vào editor → bấm **Run** (Ctrl+Enter). Chờ vài giây, thành công sẽ hiện **"Success. No rows returned"** (do có `ON CONFLICT DO NOTHING`).

> ⚠ Chỉ chạy file này **SAU** khi đã nạp `seed.sql` và `seed_questions_v2.sql` (vì cần bảng `questions` và các `skills` đã tồn tại).

### Bước 4 — Kiểm tra
Chạy truy vấn:
```sql
SELECT count(*) FROM questions;                 -- kỳ vọng: 500
SELECT skill_id, count(*) FROM questions
GROUP BY skill_id ORDER BY skill_id;            -- mỗi skill ≥ 15
```

---

## Ghi chú kỹ thuật
- ID mới liên tục **Q0307–Q0500**, không trùng với 306 câu cũ.
- Mỗi câu: 4 lựa chọn, 1 đáp án đúng, có `explanation` giải thích ngắn.
- Nội dung bám tài liệu pháp quy (TT32/2023, TT31/2021, QĐ 3916, QĐ 7482, Quy chế khoa PTGMHS) và kiến thức lâm sàng chuẩn (ABO/truyền máu, nội khí quản, hồi tỉnh, thở máy, KSNK, cấp cứu BLS).
- Có thể chạy lại nhiều lần an toàn (idempotent).

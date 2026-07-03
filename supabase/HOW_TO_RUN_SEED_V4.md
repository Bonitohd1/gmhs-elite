# Nạp bộ câu hỏi V4 — nâng ngân hàng lên 700 câu

## Kết quả sau khi nạp

| Thông số | Trước (V3) | Sau (V4) |
|----------|-----------|----------|
| **Tổng câu hỏi** | 500 | **700** |
| Câu mới thêm | — | **200** (Q0501 → Q0700) |
| Câu dễ (Lv 1) | | 251 |
| Câu trung bình (Lv 2) | | 318 |
| Câu khó (Lv 3) | | 131 |
| Skill ít câu nhất | 15 | **22** |

Cả 27 kỹ năng đều có ≥ 22 câu. Bộ mới thiên về **tình huống lâm sàng, dược, theo dõi và xử trí biến chứng** để đa dạng dạng câu hỏi.

---

## Các bước nạp (~2 phút)

1. Supabase Dashboard → project **gmhs-elite** → **SQL Editor** → **New query**.
2. Mở `GMHS_Elite_Backend/supabase/seed_questions_v4.sql` → Ctrl+A → Ctrl+C.
3. Dán vào editor → **Run** (Ctrl+Enter) → chờ **"Success. No rows returned"**.
4. Kiểm tra:
   ```sql
   select count(*) from questions;   -- kỳ vọng: 700
   ```

> ⚠ Chạy file này **SAU** khi đã nạp seed.sql, v2 và v3. An toàn chạy lại nhiều lần (`ON CONFLICT DO NOTHING`).

---

## Ghi chú
- ID mới **Q0501–Q0700**, liên tục, không trùng 500 câu cũ.
- Mỗi câu: 4 lựa chọn, 1 đáp án đúng, có giải thích.
- Bám tài liệu pháp quy (TT32, TT31, QĐ 3916, QĐ 7482, quy chế khoa PTGMHS) và kiến thức lâm sàng chuẩn (ABO/truyền máu, nội khí quản, thở máy, hồi tỉnh, KSNK, BLS/cấp cứu, dinh dưỡng, quản trị chất lượng).

# Cách nạp 156 câu hỏi mới vào Supabase

## Kết quả sau khi nạp

| Thông số | Trước | Sau |
|----------|-------|-----|
| Tổng câu hỏi | 150 | **306** |
| Câu khó (Lv 3) | 15 | **62** |
| Câu cấp cứu (+) | 34 | **66** |
| Câu chuyên khoa GMHS (*) | 28 | **65** |
| Skills < 5 câu | 9 skills | **0** |
| Skill ít nhất | 2 câu (S1.3) | 10 câu |

**Tất cả 27 kỹ năng đều có ≥ 10 câu hỏi** → sẵn sàng adaptive learning + pilot test.

---

## Các bước nạp dữ liệu (mất ~2 phút)

### Bước 1: Mở Supabase SQL Editor

1. Vào https://supabase.com/dashboard
2. Chọn project **gmhs-elite**
3. Menu trái → **SQL Editor** → **New query**

### Bước 2: Copy nội dung file

Mở file:
```
GMHS_Elite_Backend/supabase/seed_questions_v2.sql
```

→ Ctrl+A (chọn tất cả) → Ctrl+C (copy)

### Bước 3: Dán vào SQL Editor và chạy

→ Ctrl+V vào editor → bấm **Run** (góc dưới phải, hoặc Ctrl+Enter)

Chờ ~3-5 giây. Nếu thành công sẽ hiện: **"Success. No rows returned"** (vì có `ON CONFLICT DO NOTHING`).

### Bước 4: Kiểm tra

Chạy query này để xác nhận:
```sql
SELECT COUNT(*) AS total_questions FROM questions;
-- Kết quả mong đợi: 306

SELECT difficulty, COUNT(*) FROM questions GROUP BY difficulty ORDER BY difficulty;
-- 1 (Easy):   ~105
-- 2 (Medium): ~139
-- 3 (Hard):   ~62

SELECT skill_id, COUNT(*) FROM questions GROUP BY skill_id ORDER BY skill_id;
-- Mỗi skill có ≥ 10 câu
```

### Bước 5: Test trên ứng dụng

1. Vào https://gmhs-elite.vercel.app/quiz
2. Chọn bộ câu hỏi → start
3. Kiểm tra: câu hỏi đa dạng theo skill và độ khó

---

## Nội dung bộ câu hỏi mới (Q0151-Q0306)

### Phân loại theo nhóm năng lực

- **Nhóm 1 – Đạo đức & Pháp lý** (S1.1-S1.3): 15 câu mới
- **Nhóm 2 – Giao tiếp & An toàn** (S2.1-S2.6): 19 câu mới  
- **Nhóm 3 – Kỹ thuật gây mê hồi sức** (S3.1-S3.8): 72 câu mới ← trọng tâm
- **Nhóm 4 – KSNK & Quản lý dụng cụ** (S4.1-S4.4): 17 câu mới
- **Nhóm 5 – Cấp cứu & Hậu phẫu** (S5.1-S5.3): 19 câu mới
- **Nhóm 6 – Kế hoạch & Đánh giá** (S6.1-S6.3): 17 câu mới

### Tình huống lâm sàng nổi bật (Lv 3)

- **MH** (Sốt cao ác tính): Q0281
- **High spinal block**: Q0280
- **Phản vệ chu mổ (rocuronium)**: Q0283
- **CO2 embolism nội soi**: Q0289
- **CICV (Cannot Intubate, Can Ventilate)**: Q0302
- **PE sau mổ chỉnh hình**: Q0273
- **Massive transfusion**: Q0258
- **AHTR (Phản ứng tan huyết cấp)**: Q0257
- **Sepsis shock + vận mạch**: Q0259-Q0260
- **5H5T trong CPR asystole**: Q0292
- **Bronchospasm chu mổ**: Q0282
- **Emergency delirium**: Q0225
- **Nhồi máu cơ tim chu mổ**: Q0226
- **Laryngospasm**: Q0224

### Ngân hàng tham chiếu

Mỗi câu đã gắn `source_doc_ids` đến tài liệu gốc (BK01-BK04, CS01-CS07, KT01-KT07, VB01-VB12) → có thể tra ngược tài liệu khi cần.

---

## Sau khi nạp xong

Bạn có thể bắt đầu pilot với 5-10 ĐD GMHS đầu tiên. Khuyến nghị:

1. **Onboarding 5 phút**: Hướng dẫn ngắn cách đăng ký + làm quiz đầu tiên
2. **Tuần 1 – Khảo sát baseline**: ĐD làm 1 bộ "diagnostic" 30 câu để hệ thống biết điểm yếu
3. **Tuần 2-4 – Adaptive learning**: 10 câu/ngày, AI ưu tiên kỹ năng yếu
4. **Tuần 4 – Khảo sát feedback**: thu thập đánh giá UX + nội dung
5. **Mở rộng**: nạp thêm câu hỏi theo các bộ tài liệu cập nhật (ví dụ TT mới của BYT)

Chúc test thành công!

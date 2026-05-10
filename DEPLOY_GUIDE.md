# 🚀 Hướng dẫn Deploy GMHS Elite — Step by Step

> Hướng dẫn này giúp anh/chị (kể cả không phải dev) có thể deploy app lên production trong **2-4 giờ**. Tổng chi phí: **0 VNĐ** (free tier).

## Tổng quan

```
GitHub (lưu code)
    ↓ push
Vercel (chạy app, tự động deploy)
    ↓ kết nối
Supabase (Database + Auth + Storage)
```

3 dịch vụ này đều có **free tier hoạt động được** cho 30-100 người dùng. Khi đông hơn, chỉ cần upgrade từng phần.

---

## 📋 Checklist tổng

- [ ] **Bước 1**: Cài Git + Node.js trên máy tính
- [ ] **Bước 2**: Tạo tài khoản GitHub + push code lên
- [ ] **Bước 3**: Tạo project Supabase + setup database
- [ ] **Bước 4**: Connect Vercel với GitHub + deploy
- [ ] **Bước 5**: Cấu hình email + test app
- [ ] **Bước 6**: Mời pilot users

---

## Bước 1 — Cài công cụ trên máy (15 phút)

### 1.1. Cài Git
- Tải tại https://git-scm.com/download/win
- Cài với cấu hình mặc định (next next next)
- Sau khi cài xong, mở **Git Bash** (có sẵn trong menu Start) để dùng

### 1.2. Cài Node.js (chỉ để test local nếu muốn)
- Tải LTS version tại https://nodejs.org/
- Cài với mặc định
- Mở Git Bash, gõ `node --version` → ra số phiên bản (vd `v20.x.x`) là OK

### 1.3. Tạo tài khoản
Đăng ký 3 tài khoản miễn phí (dùng cùng 1 email cho thuận tiện):
- **GitHub**: https://github.com/signup
- **Vercel**: https://vercel.com/signup → chọn "Continue with GitHub"
- **Supabase**: https://supabase.com/dashboard/sign-up → chọn "Continue with GitHub"

---

## Bước 2 — Push code lên GitHub (15 phút)

### 2.1. Tạo repository trên GitHub
1. Vào https://github.com/new
2. Repository name: `gmhs-elite`
3. Chọn **Private** (chỉ mình mình thấy code)
4. **KHÔNG** tích "Initialize with README" (vì đã có code sẵn)
5. Click **Create repository**

### 2.2. Push code lên
Mở **Git Bash** trong thư mục `GMHS_Elite_Backend` (chuột phải vào folder → "Git Bash here"):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Thay YOUR-USERNAME bằng username GitHub của anh/chị
git remote add origin https://github.com/YOUR-USERNAME/gmhs-elite.git
git push -u origin main
```

Lần đầu push, GitHub sẽ hỏi đăng nhập — dùng tài khoản GitHub.

### 2.3. Verify
Refresh trang GitHub repo → thấy đầy đủ file `package.json`, `src/`, `supabase/`, etc → OK.

---

## Bước 3 — Setup Supabase (30 phút)

### 3.1. Tạo project mới
1. Vào https://supabase.com/dashboard/projects
2. Click **New Project**
3. Điền:
   - **Name**: `gmhs-elite`
   - **Database Password**: tạo mật khẩu mạnh (LƯU LẠI vào file riêng)
   - **Region**: chọn **Southeast Asia (Singapore)** (gần VN nhất)
   - **Pricing Plan**: Free
4. Click **Create new project** → đợi 2-3 phút

### 3.2. Chạy migration (tạo bảng)
1. Trong project dashboard, click **SQL Editor** (icon `</>` bên trái)
2. Click **+ New query**
3. Mở file `supabase/migrations/001_initial_schema.sql` trong project (notepad/vscode đều được)
4. Copy toàn bộ nội dung → paste vào SQL Editor
5. Click **Run** (hoặc Ctrl+Enter)
6. Đợi 5-10 giây → thấy "Success. No rows returned" là OK

### 3.3. Chạy seed data (import 31 docs + 150 câu hỏi)
1. Vẫn trong **SQL Editor**, click **+ New query**
2. Mở file `supabase/seed.sql` (~200KB, hơi lớn)
3. Copy toàn bộ → paste → **Run**
4. Đợi 20-30 giây → kiểm tra:
   - Click **Table Editor** (bên trái)
   - Thấy `documents` (31 rows), `questions` (150 rows), `skills` (27 rows), `skill_domains` (6 rows) → OK

### 3.3b. Chạy migration 002 (Scenarios + Weekly)
1. **+ New query** trong SQL Editor
2. Copy toàn bộ `supabase/migrations/002_scenarios.sql` → Run
3. Tạo thêm 3 bảng: `scenarios`, `scenario_attempts`, `weekly_attempts`

### 3.3c. Chạy seed scenarios (5 tình huống lâm sàng)
1. **+ New query**
2. Copy toàn bộ `supabase/seed_scenarios.sql` → Run
3. Kiểm tra Table Editor → `scenarios` có 5 rows

### 3.4. Lấy API keys
1. Click **Project Settings** (icon ⚙️ dưới cùng bên trái)
2. Click **API** trong menu Settings
3. Copy 2 giá trị:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: chuỗi dài bắt đầu `eyJhbGc...`
4. Lưu vào file `.env.local` ngay bây giờ:

Trong thư mục `GMHS_Elite_Backend`, copy file `.env.example` thành `.env.local`:
```bash
cp .env.example .env.local
```

Mở `.env.local` bằng Notepad và điền:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3.5. Bật Email confirmation (optional)
- Mặc định Supabase gửi email confirm khi đăng ký
- Để **TẮT** (cho dev/test thuận tiện):
  - **Authentication** → **Providers** → **Email** → tắt "Confirm email"

---

## Bước 4 — Deploy lên Vercel (15 phút)

### 4.1. Connect Vercel với GitHub
1. Vào https://vercel.com/dashboard
2. Click **Add New...** → **Project**
3. Click **Import** bên cạnh repo `gmhs-elite`

### 4.2. Cấu hình deploy
Vercel tự nhận diện Next.js. Chỉ cần:
1. **Framework Preset**: Next.js (auto)
2. Mở rộng phần **Environment Variables** và thêm 2 biến:
   - Name: `NEXT_PUBLIC_SUPABASE_URL` — Value: copy từ Supabase
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Value: copy từ Supabase
3. Click **Deploy**

### 4.3. Chờ build (2-3 phút)
- Vercel sẽ install dependencies, build, deploy
- Khi xong → có URL kiểu `gmhs-elite-xxx.vercel.app`
- Click vào URL → app chạy!

### 4.4. Set custom domain (optional, sau)
Khi muốn dùng domain riêng (vd `daotao-gmhs.com`):
- Mua domain ở Tenten/Mắt Bão (~250k/năm)
- Vercel → Project Settings → Domains → thêm domain
- Cập nhật DNS theo hướng dẫn Vercel

---

## Bước 5 — Test app (15 phút)

### 5.1. Đăng ký tài khoản đầu
1. Mở URL Vercel
2. Click **Đăng ký mới**
3. Điền: email thật + tên hiển thị + mật khẩu
4. Nếu Supabase có email confirm → kiểm tra email + click link

### 5.2. Kiểm tra flow hoàn chỉnh
- [ ] Đăng nhập → vào Dashboard
- [ ] Click **Daily Challenge** → trả lời 5 câu → thấy kết quả
- [ ] Vào **Thư viện** → click 1 doc → đọc nội dung
- [ ] Vào **Hồ sơ** → đổi tên hiển thị → save → reload thấy đổi

### 5.3. Báo lỗi
Nếu gặp lỗi:
1. Mở Vercel Dashboard → Project → **Logs** → xem lỗi gì
2. Copy error message → quay lại hỏi tôi (Claude)
3. Tôi sẽ hướng dẫn fix

---

## Bước 6 — Mời pilot users (1 ngày)

### 6.1. Chọn 5-10 ĐD đầu tiên
- Đa cấp độ: 2 TC, 2 CĐ, 3-4 ĐH, 1 CK
- Người tích cực, sẵn sàng feedback

### 6.2. Gửi email mời
Template:

> Chào anh/chị,
> 
> Khoa GMHS đang thử nghiệm hệ thống ôn luyện chuyên môn nội bộ — anh/chị là 1 trong 10 người được mời thử đầu tiên!
> 
> Link đăng ký: https://gmhs-elite.vercel.app
> 
> Cách dùng:
> 1. Click "Đăng ký mới"
> 2. Điền email + tên (có thể là nickname)
> 3. Hàng ngày làm Daily Challenge 5 phút để duy trì kiến thức
> 
> Lưu ý:
> - Đây là tool ôn luyện NỘI BỘ, không phải kỳ thi chính thức
> - Chỉ hỏi email + tên, KHÔNG cần CMND/SĐT
> - Anh/chị có thể yêu cầu xoá dữ liệu bất cứ lúc nào
> 
> Có gì thắc mắc, alo lại em.

### 6.3. Đo lường tuần đầu
- Số ĐD đăng ký / mời
- Số ĐD hoàn thành Daily 3 ngày liên tiếp
- Phản hồi 1-1 với pilot users

---

## 🔄 Cập nhật code sau này

Khi muốn sửa/thêm tính năng:

```bash
# 1. Sửa code trong VSCode/Notepad
# 2. Push lên GitHub
git add .
git commit -m "Mô tả thay đổi"
git push

# 3. Vercel TỰ ĐỘNG deploy lại (1-2 phút)
# 4. Refresh URL → thấy thay đổi
```

→ Đó là magic của Vercel + GitHub. Push code = deploy production.

---

## 💰 Khi nào cần upgrade khỏi free tier?

| Hiện tượng | Upgrade |
|---|---|
| Supabase báo "Database size > 500 MB" | Supabase Pro $25/tháng = 8 GB |
| Vercel báo "Bandwidth > 100 GB/tháng" | Vercel Pro $20/tháng |
| Cần SLA chính thức cho audit | Cả 2 lên Pro |

Cho 100 ĐD active làm Daily hàng ngày, free tier dùng ít nhất 12-24 tháng mới hết.

---

## ❓ Troubleshooting

### Q: "Build failed" trên Vercel
A: Mở Logs xem error. Thường do thiếu env variable. Add lại trong Settings → Environment Variables → Redeploy.

### Q: Đăng nhập báo "Invalid credentials"
A: Kiểm tra Supabase Authentication → Users → user đã được confirm email chưa.

### Q: Không thấy Daily questions
A: Vào Supabase Table Editor → kiểm tra bảng `questions` có data chưa. Nếu không, chạy lại `seed.sql`.

### Q: Domain không kết nối
A: DNS có thể propagate chậm 24-48h. Thử lại sau hoặc dùng URL `.vercel.app`.

---

## 📞 Liên hệ hỗ trợ

Nếu kẹt ở bước nào:
1. Screenshot màn hình lỗi
2. Copy error log từ Vercel/Supabase
3. Quay lại hỏi tôi (Claude) — tôi sẽ hướng dẫn fix cụ thể

---

*Hướng dẫn cho người không phải dev — đã test với người mới chưa từng deploy trước.*

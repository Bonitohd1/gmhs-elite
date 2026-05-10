# 🚀 QUICK DEPLOY (Windows) — Bước theo từng phút

> Cho Windows + Git + GitHub đã có. Tổng thời gian: **30-60 phút**.

---

## ⏱ Phút 0-5 — Push code lên GitHub

### 1.1. Tạo repo mới trên GitHub
- Mở https://github.com/new
- Repository name: `gmhs-elite`
- ✅ **Private** (tích chọn)
- ❌ KHÔNG tích "Initialize with README"
- Click **Create repository**

### 1.2. Push code

**Mở Git Bash trong folder GMHS_Elite_Backend**:
- Mở File Explorer → vào `C:\Users\anhdu\Desktop\Mr. Thành\GMHS_Elite_Backend`
- Chuột phải vào vùng trống → **Git Bash Here**

(Nếu không có "Git Bash Here", chuột phải có thể cần "Show more options" trên Windows 11)

Copy paste từng dòng vào Git Bash:

```bash
git init
git add .
git commit -m "Initial commit - GMHS Elite v1.0"
git branch -M main

# Thay YOUR-USERNAME bằng username GitHub của anh/chị
git remote add origin https://github.com/YOUR-USERNAME/gmhs-elite.git
git push -u origin main
```

Lần đầu push, GitHub có thể hỏi đăng nhập:
- Trình duyệt sẽ mở → click **Authorize Git Credential Manager**
- Hoặc nhập username + Personal Access Token (tạo tại https://github.com/settings/tokens)

✅ **Checkpoint**: Refresh trang GitHub repo → thấy đầy đủ `package.json`, `src/`, `supabase/`...

---

## ⏱ Phút 5-25 — Setup Supabase

### 2.1. Tạo project (5 phút)
1. Vào https://supabase.com/dashboard/sign-in (đăng nhập bằng GitHub)
2. Click **New Project**
3. Điền:
   - **Project name**: `gmhs-elite`
   - **Database Password**: tạo mật khẩu mạnh (LƯU LẠI vào Notepad)
   - **Region**: **Southeast Asia (Singapore)** ⬅ chọn cái này
   - **Pricing Plan**: **Free**
4. Click **Create new project** → đợi ~2 phút

### 2.2. Chạy 4 SQL files theo thứ tự

Click icon **SQL Editor** (icon `</>` thanh bên trái Supabase):

**File 1: Schema chính** (~10 giây)
1. Click **+ New query**
2. Mở file `supabase/migrations/001_initial_schema.sql` bằng **Notepad** hoặc **VS Code** (chuột phải → Open with)
3. Ctrl+A để chọn hết → Ctrl+C để copy
4. Quay lại Supabase SQL Editor, paste (Ctrl+V) → click **RUN** (hoặc Ctrl+Enter)
5. Đợi "Success. No rows returned"

**File 2: Seed data — 31 docs + 150 questions** (~30 giây)
- Mở `supabase/seed.sql` bằng Notepad/VS Code (file 200KB nên Notepad có thể chậm 1 chút)
- Copy all → paste vào New query trong Supabase → **RUN**
- Đợi 20-30 giây

**File 3: Migration scenarios** (~5 giây)
- Mở `supabase/migrations/002_scenarios.sql` → copy → paste vào New query → **RUN**

**File 4: Seed 5 tình huống** (~5 giây)
- Mở `supabase/seed_scenarios.sql` → copy → paste → **RUN**

✅ **Checkpoint**: Click **Table Editor** (icon ⊞) → thấy 10 bảng, mỗi bảng click vào xem có data:
- `skill_domains` (6 rows)
- `skills` (27 rows)
- `documents` (31 rows)
- `questions` (150 rows)
- `scenarios` (5 rows)
- `profiles`, `attempts`, `daily_completions`, `scenario_attempts`, `weekly_attempts` (đều rỗng, OK)

### 2.3. (Optional - nên làm) Tắt email confirmation cho dễ test
- **Authentication** → **Providers** → click **Email**
- Tắt **Confirm email** → **Save**
- → Đăng ký xong vào app ngay, không phải check email

### 2.4. Lấy API keys
- Click **Project Settings** (icon ⚙️ góc dưới bên trái)
- Click **API** trong menu Settings
- Copy 2 giá trị:
  - **Project URL** (kiểu `https://xxxxx.supabase.co`)
  - **anon public** key (chuỗi rất dài bắt đầu `eyJhbGc...`)

LƯU vào Notepad để paste vào Vercel ở bước sau.

---

## ⏱ Phút 25-40 — Deploy Vercel

### 3.1. Connect GitHub
1. Vào https://vercel.com/new (đăng nhập bằng GitHub)
2. Lần đầu cần click **Add GitHub Account** → cấp quyền
3. Tìm repo `gmhs-elite` → click **Import**

### 3.2. Cấu hình
- **Framework Preset**: Next.js (auto-detect, OK)
- **Root Directory**: `./` (mặc định)
- Mở rộng **Environment Variables**, thêm 2 biến:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | (paste Project URL từ Supabase) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (paste anon key) |

3. Click **Deploy** → đợi 2-3 phút

✅ **Checkpoint**: Build success → Vercel hiện URL kiểu `gmhs-elite-xxx.vercel.app` → click vào sẽ ra trang landing.

### 3.3. ⚠ QUAN TRỌNG: Cấu hình Auth Callback URL

Nếu không làm bước này, đăng ký/đăng nhập sẽ lỗi.

1. Quay lại Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. **Site URL**: paste URL Vercel (vd `https://gmhs-elite-xxx.vercel.app`)
4. **Redirect URLs**: click **Add URL** → thêm `https://gmhs-elite-xxx.vercel.app/auth/callback`
5. **Save**

---

## ⏱ Phút 40-50 — Test app

1. Mở URL Vercel
2. Click **Đăng ký mới**
3. Điền:
   - Tên hiển thị: `Test User` (hoặc tên thật)
   - Email: email thật của anh/chị
   - Mật khẩu: ≥ 6 ký tự
   - Cấp đào tạo: chọn cấp
   - ✅ Đồng ý điều khoản
4. Click **Đăng ký** → tự vào dashboard (nếu đã tắt email confirm)

### Test 6 tính năng chính:

- [ ] **Dashboard**: thấy hero "Xin chào, Test User" + 4 KPIs (XP, Streak, Daily, Accuracy)
- [ ] **Daily** (🎯): làm 5 câu → thấy điểm + XP + streak tăng
- [ ] **Weekly** (📝): start → timer 15:00 chạy → trả lời 15 câu → submit → thấy điểm
- [ ] **Tình huống** (🏥): mở 1 trong 5 scenarios → chọn các nhánh → thấy điểm + ending
- [ ] **Skill Map** (🗺️): thấy 6 domain với progress bar (compute từ attempts vừa làm)
- [ ] **Library** (📚): mở 1 doc → đọc nội dung excerpt + xem câu hỏi liên quan

---

## 🎉 Khi tất cả OK

Anh/chị đã có **app production thật** chạy trên `https://gmhs-elite-xxx.vercel.app`

→ Share link cho 5-10 ĐD pilot test.

---

## 🆘 Khi gặp lỗi

### Lỗi "Build failed" trên Vercel
- Vercel Dashboard → Project → tab **Deployments** → click vào deployment lỗi → **View Logs**
- Copy error message → báo tôi

### "Redirect URL not allowed" khi đăng ký
- Chưa làm bước 3.3 (cấu hình Redirect URLs)
- Quay lại Supabase → Authentication → URL Configuration → thêm URL Vercel

### Daily không hiện câu hỏi
- Vào Supabase Table Editor → bảng `questions` có 150 rows không?
- Nếu rỗng, chạy lại file 2 (`seed.sql`)

### Login báo "Invalid email/password"
- Kiểm tra Supabase Authentication → Users → user có trong list không
- Nếu chưa tắt email confirm, check email spam folder để xác nhận

### Push GitHub bị từ chối
- Lỗi quyền: tạo Personal Access Token tại https://github.com/settings/tokens (chọn scope `repo`)
- Khi push, dùng username + token (thay vì password)
- Hoặc dùng GitHub Desktop để push qua UI

---

## 🔄 Sau khi deploy — cách update code

Khi muốn sửa/thêm tính năng:

```bash
# Sửa code trong VS Code/Notepad
# Mở Git Bash trong folder gmhs-elite
git add .
git commit -m "Mô tả thay đổi"
git push

# Vercel TỰ ĐỘNG deploy lại trong 2-3 phút
# Refresh URL → thấy thay đổi
```

→ **Push code = deploy**. Workflow chuẩn của Vercel + GitHub.

---

*Khi nào kẹt, paste lỗi cho tôi → fix ngay.*

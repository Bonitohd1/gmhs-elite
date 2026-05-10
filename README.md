# GMHS Elite 2026 — Backend (Next.js + Supabase)

> Tool ôn luyện chuyên môn cho điều dưỡng Khoa Gây mê Hồi sức.  
> Stack: Next.js 14 + Supabase (PostgreSQL + Auth + Storage) + Vercel.

## 🎯 Tính năng

- ✅ Auth: email/password + Google OAuth
- ✅ Daily Challenge: 5 câu hỏi/ngày với XP & streak tracking
- ✅ Library: tra cứu 31 tài liệu nguồn (Thông tư, Quy trình, Bảng kiểm)
- ✅ Profile cá nhân + Privacy controls (NĐ 13/2023)
- ✅ TT32 enforcement: cảnh báo khi thiếu thẩm quyền chuyên môn
- 📦 150 câu hỏi seed sẵn từ 31 tài liệu
- 🔒 Privacy-first: chỉ lưu email + nickname

## 🚀 Quick Start

Xem **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)** — hướng dẫn step-by-step cho người không phải dev.

## 📁 Cấu trúc

```
GMHS_Elite_Backend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/               # Login, Signup, Callback
│   │   ├── dashboard/          # Trang tổng quan
│   │   ├── daily/              # Daily Challenge
│   │   ├── library/            # 31 tài liệu nguồn
│   │   ├── profile/            # Hồ sơ cá nhân
│   │   ├── globals.css         # Tailwind base
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   └── Topbar.tsx          # Header navigation
│   ├── lib/
│   │   ├── supabase.ts         # Browser client
│   │   └── supabase-server.ts  # Server client
│   └── middleware.ts           # Auth check
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql                # 31 docs + 150 questions
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── DEPLOY_GUIDE.md             # 👉 Bắt đầu từ đây
```

## 💻 Local Development (optional)

```bash
# 1. Cài deps
npm install

# 2. Tạo .env.local từ template
cp .env.example .env.local
# Điền giá trị từ Supabase

# 3. Chạy dev server
npm run dev

# Mở http://localhost:3000
```

## 📚 Tài liệu kiến trúc

- [PRD v2.0](../GMHS_Elite_Build/docs/) — Yêu cầu sản phẩm chi tiết
- [TECHNICAL_SPEC](../GMHS_Elite_Build/docs/TECHNICAL_SPEC.md) — Kiến trúc kỹ thuật
- [DATA_STORAGE](../GMHS_Elite_Build/docs/DATA_STORAGE.md) — Phương án lưu trữ
- [MINIMAL_DATA_APPROACH](../GMHS_Elite_Build/docs/MINIMAL_DATA_APPROACH.md) — Triết lý minimal data

## 🔐 Compliance

- **NĐ 13/2023/NĐ-CP**: Privacy controls đầy đủ, user có quyền xem/xoá/mang đi data
- **TT 32/2023/TT-BYT**: Cảnh báo phạm vi chuyên môn (giáo dục, không enforce pháp lý)

## 📈 Roadmap

- [ ] Skill Map cá nhân hoá (Patch sau)
- [ ] Tình huống lâm sàng (5 scenarios)
- [ ] Weekly/Monthly tests
- [ ] AI Assistant (RAG với Claude API)
- [ ] Admin Dashboard

## 📞 Hỗ trợ

Liên hệ chuyên môn: chuyenmon.gmhs@bv.local  
Hỗ trợ kỹ thuật: it.support@bv.local

---

*Phiên bản 1.0 — Made cho Khoa GMHS với 💚*

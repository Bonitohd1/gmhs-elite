# GMHS Elite — Tính năng đã có

## ✅ User-facing (10 trang)

### Tổng quan
- **/** — Landing page (Đăng nhập / Đăng ký)
- **/dashboard** — Hero card, 4 KPIs, Daily CTA, recent activity

### Auth
- **/auth/login** — Email/password + Google OAuth
- **/auth/signup** — Privacy-first (chỉ email + nickname + cấp tự khai)
- **/auth/callback** — OAuth + email confirm

### Học tập
- **/daily** — Daily Challenge: 5 câu/ngày, XP + Streak
- **/weekly** — Weekly Mini-test: 15 câu / 15 phút có timer
- **/scenarios** — List 5 tình huống lâm sàng
- **/scenarios/[id]** — Branching decision tree, scoring, ending
- **/skillmap** — 6 trụ năng lực + 27 kỹ năng (compute từ attempts)
- **/library** — 31 tài liệu nguồn grouped by category
- **/library/[id]** — Document Reader với prev/next + câu hỏi liên quan

### Cá nhân
- **/profile** — Edit profile, privacy toggle, export JSON, delete account
- **/settings** — Theme (light/dark), font size, change password

## 🗄️ Database (8 tables)

1. `profiles` — User profile (display_name, level, XP, streak)
2. `skill_domains` — 6 nhóm năng lực
3. `skills` — 27 kỹ năng (gắn TT32 tag)
4. `documents` — 31 tài liệu nguồn
5. `questions` — 150 câu hỏi seed
6. `attempts` — Log mỗi lần trả lời
7. `daily_completions` — Track Daily 1 lần/ngày
8. `scenarios` — 5 tình huống lâm sàng
9. `scenario_attempts` — Lịch sử làm scenario
10. `weekly_attempts` — Track Weekly 1 lần/tuần

**RLS**: 12+ policies — user chỉ thấy data của mình; content public read.

## 🔐 Compliance NĐ 13/2023

- ✅ Privacy-first: chỉ lưu email + nickname + cấp tự khai
- ✅ Right to access: trang Profile xem dữ liệu cá nhân
- ✅ Right to portability: export JSON 1 click
- ✅ Right to delete: nút xoá tài khoản
- ✅ Encryption: TLS 1.3 (Vercel) + AES-256 (Supabase)
- ✅ Audit log: Supabase tự động log auth events

## 🎯 TT32/2023 Educational

- Câu hỏi gắn tag (+, *, none)
- Skill yêu cầu cấp đào tạo
- Cảnh báo banner khi gặp câu (*) mà cấp chưa đủ
- KHÔNG enforce pháp lý (chỉ giáo dục)

## 📊 Gamification

- XP: +10/câu đúng, +20 bonus 5/5
- Streak: +1 mỗi ngày làm Daily
- Weekly XP: 100 (≥12 đúng), 60 (≥9), 30 (<9)
- Scenario XP: max(20, points × 2)

## 🚀 Deploy

Xem `DEPLOY_GUIDE.md` — 6 bước, 2-4 giờ, chi phí 0 VNĐ.

## 🔄 Tính năng có thể thêm sau (push GitHub là Vercel tự deploy)

- AI Assistant (RAG với Claude API + embeddings)
- Hall of Fame leaderboard
- Forum (peer Q&A)
- Surveys (NPS, course feedback)
- Mentor program
- Cohort/Class management
- Bookmarks
- Activity feed real-time
- Department announcements
- Calendar
- Onboarding tour

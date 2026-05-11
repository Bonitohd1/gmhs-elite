"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const MENTORS = [
  { id: "M001", name: "Trần Văn Minh", level: "ĐH+CK", cert: ["GMHS", "HỒI SỨC"], specialty: "Hồi sức cấp cứu", years: 8, mentees: 3, max: 5, rating: 4.9, ratingCount: 24, available: true,
    bio: "8 năm kinh nghiệm GMHS, từng làm tại BV Bạch Mai. Mạnh về xử trí phản ứng truyền máu và rút NKQ." },
  { id: "M002", name: "Phạm Quốc Khánh", level: "ĐH+CK", cert: ["TRUYỀN MÁU"], specialty: "Truyền máu lâm sàng", years: 10, mentees: 2, max: 4, rating: 4.8, ratingCount: 18, available: true,
    bio: "CK Truyền máu, tham gia hội đồng đối soát phạm vi TT32 của khoa." },
  { id: "M003", name: "Hoàng Thị Lan", level: "ĐH", cert: ["GMHS"], specialty: "Chăm sóc thở máy", years: 6, mentees: 4, max: 5, rating: 4.7, ratingCount: 15, available: true,
    bio: "6 năm chuyên chăm sóc bệnh nhân thở máy, ICU." },
  { id: "M004", name: "Đỗ Thị Huyền", level: "ĐH", cert: ["GMHS"], specialty: "An toàn phẫu thuật", years: 5, mentees: 1, max: 3, rating: 4.6, ratingCount: 12, available: true,
    bio: "Đào tạo lại WHO Surgical Safety Checklist cho khoa." },
  { id: "M005", name: "Nguyễn Thị Hà", level: "ĐH", cert: ["GMHS"], specialty: "Onboarding ĐD mới", years: 4, mentees: 5, max: 5, rating: 5.0, ratingCount: 8, available: false,
    bio: "Đầy slot. Chuyên hướng dẫn ĐD mới về quy trình khoa." },
];

export default function MentorPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  const specs = ["all", ...Array.from(new Set(MENTORS.map((m) => m.specialty)))];
  const filtered = MENTORS.filter((m) => m.available && (filter === "all" || m.specialty === filter));

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🎓 Mentor Program</h1>
          <p className="text-slate-600">Kết nối với ĐD có kinh nghiệm để được hướng dẫn 1-1.</p>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {specs.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${filter === s ? "bg-primary text-white" : "bg-white border border-slate-300"}`}>
              {s === "all" ? "Tất cả" : s}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((m) => (
            <div key={m.id} className="card">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-cyan-500 text-white grid place-items-center font-bold text-base flex-shrink-0">
                  {m.name.split(" ").slice(-2).map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-bold">{m.name}</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs whitespace-nowrap">Còn {m.max - m.mentees} slot</span>
                  </div>
                  <div className="text-xs text-slate-500">🎯 {m.specialty} • {m.years} năm KN</div>
                  <div className="text-xs text-slate-500 mt-1">⭐ {m.rating} ({m.ratingCount} đánh giá) • {m.cert.join(", ")}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{m.bio}</p>
              <div className="flex gap-2">
                <button className="flex-1 btn-primary text-sm">🤝 Yêu cầu kết nối</button>
                <button className="btn-ghost text-sm">💬</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-yellow-200 rounded-2xl p-6 text-center mt-6">
          <div className="text-4xl mb-2">🌟</div>
          <h3 className="font-bold text-amber-900">Bạn có thể trở thành Mentor</h3>
          <p className="text-sm text-amber-800 mt-2">ĐD ĐH+ với kinh nghiệm có thể đăng ký để hỗ trợ ĐD mới + nhận thêm 50 XP/buổi mentoring.</p>
          <button className="btn-primary mt-4">📝 Đăng ký làm Mentor</button>
        </div>
      </main>
    </div>
  );
}

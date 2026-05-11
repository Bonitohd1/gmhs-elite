"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const MOCK_THREADS = [
  { id: "T001", title: "Khi nào mới được rút NKQ sau ca mổ dài?", author: "Bùi V. Quang (TC)", date: "10/05/2026", upvotes: 8, answers: 3, resolved: true,
    body: "Em mới chuyển sang khoa, gặp tình huống BN sau mổ dài 4h. Sinh hiệu ổn nhưng GCS chỉ 9. Theo quy trình thì sao ạ?", tags: ["Rút NKQ", "Hồi tỉnh"] },
  { id: "T002", title: "Cách bảo quản máu sau khi NB từ chối truyền?", author: "Vũ Đ. Hùng (CĐ)", date: "09/05/2026", upvotes: 5, answers: 2, resolved: true,
    body: "BN ký từ chối truyền máu sau khi đã xuất kho. Túi máu xử lý sao ạ?", tags: ["Truyền máu", "Quy trình"] },
  { id: "T003", title: "Áp lực bóng chèn ống NKQ - đo bằng dụng cụ nào tốt nhất?", author: "Mai T. Trang (CĐ)", date: "08/05/2026", upvotes: 11, answers: 4, resolved: false,
    body: "Khoa mình đang dùng manometer cũ. Có ai biết loại nào nhanh và chính xác hơn không?", tags: ["Thở máy", "NKQ"] },
  { id: "T004", title: "Em mới vào, hỏi về lịch trực ban đêm", author: "Đặng T. Hoa (TC)", date: "07/05/2026", upvotes: 3, answers: 1, resolved: true,
    body: "Trực đêm đầu tiên em nên chuẩn bị gì ạ?", tags: ["Lịch trực", "ĐD mới"] },
];

export default function ForumPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [filter, setFilter] = useState<"all" | "resolved" | "unresolved">("all");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  const threads = MOCK_THREADS.filter((t) => filter === "all" || (filter === "resolved" ? t.resolved : !t.resolved));

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">💬 Diễn đàn khoa GMHS</h1>
          <p className="text-slate-600">Hỏi đáp nhanh giữa đồng nghiệp. Mentor và ĐD ĐH+ thường trả lời trong 2-4 giờ.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="card text-center"><div className="text-xs text-slate-500">Tổng thảo luận</div><div className="text-2xl font-bold">{MOCK_THREADS.length}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Đã giải quyết</div><div className="text-2xl font-bold text-green-600">{MOCK_THREADS.filter(t=>t.resolved).length}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Tổng trả lời</div><div className="text-2xl font-bold">{MOCK_THREADS.reduce((s,t)=>s+t.answers,0)}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Avg response</div><div className="text-2xl font-bold">2.5h</div></div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
          <div className="flex gap-2">
            {(["all", "unresolved", "resolved"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${filter === f ? "bg-primary text-white" : "bg-white border border-slate-300"}`}>
                {f === "all" ? "Tất cả" : f === "resolved" ? "✓ Đã giải quyết" : "⏳ Chưa giải quyết"}
              </button>
            ))}
          </div>
          <button className="btn-primary">+ Đặt câu hỏi mới</button>
        </div>

        <div className="space-y-3">
          {threads.map((t) => (
            <div key={t.id} className={`card border-l-4 ${t.resolved ? "border-green-500" : "border-amber-500"}`}>
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[260px]">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {t.resolved 
                      ? <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">✓ Đã giải quyết</span>
                      : <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">⏳ Đang thảo luận</span>}
                    {t.tags.map((tag) => (
                      <span key={tag} className="bg-slate-100 px-2 py-0.5 rounded text-xs">#{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-base mb-2">{t.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">{t.body.length > 200 ? t.body.substring(0, 200) + "…" : t.body}</p>
                  <div className="text-xs text-slate-500 flex gap-3">
                    <span>👤 {t.author}</span>
                    <span>🕐 {t.date}</span>
                    <span>💬 {t.answers} trả lời</span>
                  </div>
                </div>
                <div className="text-center min-w-[80px]">
                  <div className="text-xl font-black text-primary">▲ {t.upvotes}</div>
                  <div className="text-xs text-slate-500">upvote</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

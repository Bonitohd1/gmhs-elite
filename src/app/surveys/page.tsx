"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const PENDING = [
  { id: "sv1", title: "NPS Tháng 5/2026", desc: "Đánh giá mức độ hài lòng tổng thể với GMHS Elite", questions: 2, time: 1, anonymous: false },
  { id: "sv2", title: "Course Feedback - Truyền máu", desc: "Phản hồi sau khi hoàn thành khoá Truyền máu", questions: 5, time: 3, anonymous: false },
  { id: "sv3", title: "Workload & Burnout Q2", desc: "Đánh giá sức khoẻ tinh thần và áp lực công việc", questions: 5, time: 3, anonymous: true },
];

export default function SurveysPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
    const sav = localStorage.getItem("gmhs_surveys_done");
    if (sav) setCompleted(JSON.parse(sav));
  }, []);

  const pending = PENDING.filter((s) => !completed.includes(s.id));

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">📊 Khảo sát của tôi</h1>
          <p className="text-slate-600">Đóng góp ý kiến giúp khoa cải thiện chất lượng đào tạo và chăm sóc.</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card text-center"><div className="text-xs text-slate-500">Cần làm</div><div className="text-2xl font-bold text-amber-600">{pending.length}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Đã hoàn thành</div><div className="text-2xl font-bold text-green-600">{completed.length}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">XP từ khảo sát</div><div className="text-2xl font-bold">{completed.length * 30}</div></div>
        </div>

        <h3 className="font-bold mb-3">🎯 Khảo sát đang chờ ({pending.length})</h3>
        {pending.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-5xl mb-3">✓</div>
            <p>Bạn đã hoàn thành tất cả khảo sát!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {pending.map((s) => (
              <div key={s.id} className="card">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold">{s.title}</h3>
                  {s.anonymous && <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">👤 Ẩn danh</span>}
                </div>
                <p className="text-sm text-slate-600 mb-3">{s.desc}</p>
                <div className="flex gap-3 text-xs text-slate-500 mb-3">
                  <span>📝 {s.questions} câu</span>
                  <span>⏱ {s.time} phút</span>
                  <span>+30 XP</span>
                </div>
                <button onClick={() => {
                  const arr = [...completed, s.id];
                  setCompleted(arr);
                  localStorage.setItem("gmhs_surveys_done", JSON.stringify(arr));
                  alert("✓ Đã hoàn thành khảo sát! +30 XP");
                }} className="w-full btn-primary">📝 Bắt đầu</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

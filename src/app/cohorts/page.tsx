"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const COHORTS = [
  { id: "CH001", name: "Lớp ĐD mới 2026", icon: "🌱", color: "#10B981", desc: "ĐD mới tuyển dụng năm 2026, onboarding 6 tháng đầu.", members: 8, progress: 42, start: "2026-04-01", end: "2026-09-30" },
  { id: "CH002", name: "Nhóm Truyền máu Q2/2026", icon: "🩸", color: "#DC2626", desc: "Tăng cường năng lực truyền máu trong quý 2/2026.", members: 18, progress: 78, start: "2026-04-15", end: "2026-06-30" },
  { id: "CH003", name: "Lớp CK Hồi sức 2025", icon: "🏥", color: "#0EA5E9", desc: "ĐD theo học CK Hồi sức 2025-2026, đào tạo bổ sung.", members: 7, progress: 91, start: "2025-10-01", end: "2026-09-30" },
  { id: "CH004", name: "Onboarding T5/2026", icon: "🎯", color: "#F59E0B", desc: "5 ĐD vừa chuyển từ khoa khác, làm quen GMHS.", members: 5, progress: 25, start: "2026-05-02", end: "2026-08-02" },
];

export default function CohortsPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">👥 Lớp học</h1>
          <p className="text-slate-600">Nhóm học chung mục tiêu, có lộ trình + leaderboard nội bộ.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {COHORTS.map((c) => (
            <div key={c.id} className="card border-t-4" style={{ borderColor: c.color }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl text-2xl grid place-items-center flex-shrink-0" style={{ background: c.color + "22", color: c.color }}>{c.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold">{c.name}</h3>
                  <div className="text-xs text-slate-500 mt-1">{c.id}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{c.desc}</p>
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>👤 {c.members} ĐD</span>
                <span>📅 {c.start} → {c.end}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Tiến độ</span>
                <span style={{ color: c.color }}>{c.progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full" style={{ width: `${c.progress}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

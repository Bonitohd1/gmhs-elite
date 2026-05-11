"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const PHASES = [
  { id: "GD1", title: "GĐ 1 — Số hoá nội dung", status: "done", period: "T6/2026 → T7/2026", progress: 100 },
  { id: "GD2", title: "GĐ 2 — LMS Core", status: "current", period: "T8/2026 → T10/2026", progress: 65 },
  { id: "GD3", title: "GĐ 3 — Gamification & Báo cáo", status: "future", period: "T11/2026 → T12/2026", progress: 0 },
  { id: "GD4", title: "GĐ 4 — Gala & Truyền thông", status: "future", period: "T4/2027 → T5/2027", progress: 0 },
];

const RISKS = [
  { id: "R1", title: "Ngân hàng câu hỏi sai sót chuyên môn", impact: "high", likelihood: "med", mitigation: "Quy trình duyệt 2 cấp" },
  { id: "R2", title: "Áp lực thi đua gây stress", impact: "med", likelihood: "med", mitigation: "Ẩn bảng đáy; phản hồi ẩn danh" },
  { id: "R3", title: "AI đối soát sai TT32", impact: "high", likelihood: "low", mitigation: "Human-in-the-loop" },
  { id: "R4", title: "Rò rỉ dữ liệu cá nhân", impact: "high", likelihood: "low", mitigation: "AES-256 + RBAC + audit log 12 tháng" },
  { id: "R5", title: "Tỷ lệ tham gia thấp", impact: "med", likelihood: "med", mitigation: "Daily Challenge + giải thưởng tuần" },
];

export default function RoadmapPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [tab, setTab] = useState<"roadmap" | "risks">("roadmap");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">🗺️ Roadmap & Quản lý rủi ro</h1>

        <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200 mb-6 w-fit">
          <button onClick={() => setTab("roadmap")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === "roadmap" ? "bg-primary text-white" : ""}`}>🗺️ Roadmap</button>
          <button onClick={() => setTab("risks")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${tab === "risks" ? "bg-primary text-white" : ""}`}>⚠️ Risk Register</button>
        </div>

        {tab === "roadmap" ? (
          <div className="card">
            <h3 className="font-bold mb-4">📍 Timeline 4 giai đoạn (PRD §10)</h3>
            <div className="space-y-4">
              {PHASES.map((p) => (
                <div key={p.id} className={`p-4 border-l-4 rounded-lg ${p.status === "done" ? "border-green-500 bg-green-50" : p.status === "current" ? "border-amber-500 bg-amber-50" : "border-slate-300 bg-slate-50"}`}>
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <div>
                      <span className="font-mono text-xs bg-white px-2 py-0.5 rounded mr-2">{p.id}</span>
                      <span className="font-bold">{p.title}</span>
                      {p.status === "current" && <span className="ml-2 bg-amber-500 text-white px-2 py-0.5 rounded text-xs">▶ Đang chạy</span>}
                      {p.status === "done" && <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded text-xs">✓ Hoàn thành</span>}
                    </div>
                    <div className="font-bold">{p.progress}%</div>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">{p.period}</div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-cyan-500" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <h3 className="font-bold mb-4">📋 Risk Register</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-slate-50">
                  <th className="p-3">ID</th>
                  <th className="p-3">Rủi ro</th>
                  <th className="p-3">Tác động</th>
                  <th className="p-3">Khả năng</th>
                  <th className="p-3">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {RISKS.map((r) => (
                  <tr key={r.id} className="border-t border-slate-200">
                    <td className="p-3 font-mono">{r.id}</td>
                    <td className="p-3 font-semibold">{r.title}</td>
                    <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs ${r.impact === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{r.impact === "high" ? "Cao" : "TB"}</span></td>
                    <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs ${r.likelihood === "high" ? "bg-red-100 text-red-700" : r.likelihood === "med" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{r.likelihood === "high" ? "Cao" : r.likelihood === "med" ? "TB" : "Thấp"}</span></td>
                    <td className="p-3 text-xs">{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

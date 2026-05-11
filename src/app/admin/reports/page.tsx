"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function AdminReportsPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  const reports = [
    { icon: "📊", title: "Báo cáo tiến độ tháng", desc: "Điểm trung bình, tỷ lệ tham gia, top performer của khoa." },
    { icon: "⚖️", title: "Báo cáo TT32", desc: "Đối soát phạm vi chuyên môn theo cá nhân, cảnh báo vi phạm." },
    { icon: "🏥", title: "Hồ sơ năng lực cá nhân", desc: "Tải hồ sơ từng ĐD - dùng cho hồ sơ cán bộ định kỳ." },
  ];

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">📈 Báo cáo</h1>

        <div className="grid md:grid-cols-3 gap-4">
          {reports.map((r) => (
            <div key={r.title} className="card">
              <div className="text-4xl mb-2">{r.icon}</div>
              <h3 className="font-bold mb-2">{r.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{r.desc}</p>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="btn-primary flex-1 text-sm">📥 In/PDF</button>
                <button className="btn-ghost text-sm">📊 Excel</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

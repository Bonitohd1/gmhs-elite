"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const ANNOUNCEMENTS = [
  { id: "A1", title: "📢 Cập nhật quy trình truyền máu", body: "Thông tư mới về cấp máu lâm sàng có hiệu lực từ 15/05. Cả khoa vui lòng ôn lại module C02 trong tuần này.", author: "BS. Trưởng khoa", date: "2026-05-09 16:30", priority: "high" },
  { id: "A2", title: "🎉 Chúc mừng top 5 tháng 4", body: "Xin chúc mừng các đồng chí Nguyễn Thị Hà, Trần Văn Minh, Lê Thị Mai, Phạm Quốc Khánh, Hoàng Thị Lan đã đạt top 5 điểm thi tháng 4.", author: "ĐD trưởng khoa", date: "2026-05-05 09:15", priority: "normal" },
  { id: "A3", title: "📅 Lịch trực tháng 6 đã đăng", body: "Lịch trực tháng 6 đã được đăng trên bảng tin khoa. Vui lòng kiểm tra trước ngày 25/05.", author: "ĐD trưởng khoa", date: "2026-05-02 11:20", priority: "normal" },
  { id: "A4", title: "🏆 Đăng ký thi đấu Gala 12/05", body: "Top 30 Hall of Fame được mời tham gia Rung chuông vàng. Vui lòng xác nhận tham dự trước 23:59 ngày 08/05.", author: "BTC Gala", date: "2026-04-28 18:00", priority: "high" },
];

export default function AnnouncementsPage() {
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
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">📣 Thông báo khoa GMHS</h1>
          <p className="text-slate-600">Cập nhật từ lãnh đạo khoa, sự kiện, lịch trực, thay đổi quy trình.</p>
        </div>

        <div className="space-y-3">
          {ANNOUNCEMENTS.map((a) => (
            <div key={a.id} className={`card border-l-4 ${a.priority === "high" ? "border-red-500" : "border-primary"}`}>
              <div className="flex flex-wrap gap-2 items-center mb-2">
                {a.priority === "high" && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">⚡ Quan trọng</span>}
                <span className="text-xs font-semibold text-slate-500">{a.author}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">{a.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{a.title}</h3>
              <p className="text-sm leading-relaxed text-slate-700">{a.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

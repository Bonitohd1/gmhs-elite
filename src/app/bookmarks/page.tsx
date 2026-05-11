"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const ACTIVITY_FEED = [
  { time: "5 phút trước", icon: "🏆", user: "Trần Văn Minh", action: "vừa hoàn thành Monthly Big-test với 92%" },
  { time: "12 phút trước", icon: "🎓", user: "Lê Thị Mai", action: "hoàn thành khoá Truyền máu & xử trí tai biến" },
  { time: "30 phút trước", icon: "🏅", user: "Phạm Quốc Khánh", action: "đạt huy hiệu Truyền máu chuyên gia" },
  { time: "1 giờ trước", icon: "⬆️", user: "Nguyễn Thị Hà", action: "lên Cấp độ 5 - Kỳ cựu" },
  { time: "2 giờ trước", icon: "🔥", user: "Đỗ Thị Huyền", action: "đạt streak 50 ngày liên tục" },
  { time: "3 giờ trước", icon: "🏥", user: "Hoàng Thị Lan", action: "hoàn thành Phản ứng truyền máu cấp với 60 điểm" },
  { time: "5 giờ trước", icon: "🎯", user: "Vũ Đình Hùng", action: "hoàn thành 5 Daily liên tiếp" },
  { time: "hôm qua", icon: "🤝", user: "Bùi Văn Quang", action: "được kết nối với mentor Trần Văn Minh" },
];

export default function BookmarksPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<{ courses: string[]; questions: string[]; docs: string[] }>({ courses: [], questions: [], docs: [] });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
    const sav = localStorage.getItem("gmhs_bookmarks");
    if (sav) setBookmarks(JSON.parse(sav));
  }, []);

  const total = bookmarks.courses.length + bookmarks.questions.length + bookmarks.docs.length;

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">⭐ Yêu thích & Hoạt động</h1>
          <p className="text-slate-600">Lưu nhanh khoá học, câu hỏi, tài liệu. Xem hoạt động khoa real-time.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="card">
            <h3 className="font-bold mb-4">⭐ Mục yêu thích ({total})</h3>
            {total === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-5xl mb-3">⭐</div>
                <p>Chưa có mục yêu thích.</p>
                <p className="text-xs mt-2">Click vào ⭐ trong các trang để thêm.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarks.docs.map((d) => <div key={d} className="bg-slate-50 p-3 rounded">📄 {d}</div>)}
                {bookmarks.courses.map((c) => <div key={c} className="bg-slate-50 p-3 rounded">🎓 {c}</div>)}
                {bookmarks.questions.map((q) => <div key={q} className="bg-slate-50 p-3 rounded">❓ {q}</div>)}
              </div>
            )}
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">📡 Hoạt động khoa</h3>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs animate-pulse">● Live</span>
            </div>
            <div className="space-y-3 max-h-[480px] overflow-y-auto">
              {ACTIVITY_FEED.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-200 last:border-0">
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1 text-sm">
                    <div className="leading-relaxed"><b>{a.user}</b> {a.action}</div>
                    <div className="text-xs text-slate-500 mt-1">🕐 {a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

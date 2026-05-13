"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";
import EmptyState from "@/components/EmptyState";



export default function BookmarksPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<{ courses: string[]; questions: string[]; docs: string[] }>({ courses: [], questions: [], docs: [] });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
    // Fetch activity feed from view
    supabase.from("activity_feed_view").select("*").limit(20).then(({ data }) => {
      setActivities(data || []);
    });
    const sav = localStorage.getItem("gmhs_bookmarks");
    if (sav) setBookmarks(JSON.parse(sav));
  }, []);

  const total = bookmarks.courses.length + bookmarks.questions.length + bookmarks.docs.length;

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">⭐ Yêu thích & Hoạt động</h1>
          <p className="text-slate-600">Lưu nhanh khoá học, câu hỏi, tài liệu. Xem hoạt động khoa real-time.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="card">
            <h3 className="font-bold mb-4">⭐ Mục yêu thích ({total})</h3>
            {total === 0 ? (
              <EmptyState
                icon="⭐"
                title="Chưa có mục yêu thích"
                description="Khi bạn click vào ⭐ trong các trang câu hỏi, scenarios hay tài liệu, mục đó sẽ được lưu lại đây để ôn nhanh."
                actionLabel="Khám phá Scenarios"
                actionHref="/scenarios"
              />
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
              {activities.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <div className="text-3xl mb-2">📡</div>
                  <p className="text-sm">Chưa có hoạt động.</p>
                  <p className="text-xs mt-1">Khi ai đó hoàn thành Daily, hoạt động sẽ xuất hiện ở đây.</p>
                </div>
              ) : (
                activities.map((a) => (
                  <div key={a.id} className="flex items-start gap-3 py-2 border-b border-slate-200 last:border-0">
                    <span className="text-2xl flex-shrink-0">{a.icon}</span>
                    <div className="flex-1 text-sm min-w-0">
                      <div className="leading-relaxed"><b>{a.user_name}</b> {a.detail}</div>
                      <div className="text-xs text-slate-500 mt-1">🕐 {new Date(a.created_at).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

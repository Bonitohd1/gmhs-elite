"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function AdminAnalyticsPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);

  async function loadStats() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(p);
    }

    const today = new Date();
    const d7 = new Date(today); d7.setDate(d7.getDate() - 7);
    const d30 = new Date(today); d30.setDate(d30.getDate() - 30);
    const todayStr = today.toISOString().slice(0, 10);
    const d7Str = d7.toISOString().slice(0, 10);
    const d30Str = d30.toISOString().slice(0, 10);

    const [
      { data: profiles, count: totalUsers },
      { data: dauData },
      { data: mauData },
      { data: attempts },
      { count: totalAttempts },
      { count: correctAttempts },
      { data: dailies },
      { data: questions },
      { data: streaks },
      { data: badges },
      { data: skills },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact" }),
      supabase.from("daily_completions").select("user_id").eq("completed_date", todayStr),
      supabase.from("daily_completions").select("user_id").gte("completed_date", d30Str),
      supabase.from("attempts").select("user_id, question_id, is_correct").gte("created_at", d30Str),
      supabase.from("attempts").select("id", { count: "exact", head: true }),
      supabase.from("attempts").select("id", { count: "exact", head: true }).eq("is_correct", true),
      supabase.from("daily_completions").select("completed_date").gte("completed_date", d30Str).order("completed_date"),
      supabase.from("questions").select("id, skill_id, tt32_tag, difficulty"),
      supabase.from("profiles").select("streak").gte("streak", 7),
      supabase.from("user_badges").select("badge_id"),
      supabase.from("skills").select("id, name"),
    ]);

    // DAU = unique users today
    const dau = new Set((dauData || []).map((d: any) => d.user_id)).size;
    // MAU = unique users in last 30d
    const mau = new Set((mauData || []).map((d: any) => d.user_id)).size;
    // Avg accuracy
    const accuracy = totalAttempts && totalAttempts > 0 ? Math.round(((correctAttempts || 0) / totalAttempts) * 100) : 0;

    // Daily activity 30 days
    const dayMap: Record<string, number> = {};
    (dailies || []).forEach((d: any) => {
      dayMap[d.completed_date] = (dayMap[d.completed_date] || 0) + 1;
    });
    const last30Days: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0, 10);
      last30Days.push({ date: ds, count: dayMap[ds] || 0 });
    }

    // Accuracy per skill
    const skillStats: Record<string, { correct: number; total: number; name: string }> = {};
    const qMap: Record<string, string> = {};
    (questions || []).forEach((q: any) => { qMap[q.id] = q.skill_id; });
    (attempts || []).forEach((a: any) => {
      const sid = qMap[a.question_id];
      if (!sid) return;
      if (!skillStats[sid]) {
        const sk = (skills || []).find((s: any) => s.id === sid);
        skillStats[sid] = { correct: 0, total: 0, name: sk?.name || sid };
      }
      skillStats[sid].total++;
      if (a.is_correct) skillStats[sid].correct++;
    });
    const skillsList = Object.entries(skillStats)
      .map(([id, s]) => ({ id, ...s, accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0 }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 10);

    // Top wrong questions
    const wrongMap: Record<string, number> = {};
    (attempts || []).filter((a: any) => !a.is_correct).forEach((a: any) => {
      wrongMap[a.question_id] = (wrongMap[a.question_id] || 0) + 1;
    });
    const topWrong = Object.entries(wrongMap)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setStats({
      totalUsers: totalUsers || 0,
      dau,
      mau,
      mauPct: totalUsers ? Math.round((mau / totalUsers) * 100) : 0,
      accuracy,
      totalAttempts: totalAttempts || 0,
      streaks7Plus: (streaks || []).length,
      totalBadgesEarned: (badges || []).length,
      last30Days,
      skillsList,
      topWrong,
      questionCount: (questions || []).length,
    });
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Topbar profile={null} />
        <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
          <p className="text-slate-500">Đang tải thống kê...</p>
        </main>
      </div>
    );
  }

  const maxDayCount = Math.max(1, ...stats.last30Days.map((d: any) => d.count));

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-2">📊 Analytics khoa</h1>
        <p className="text-sm text-slate-600 mb-6">Thống kê tổng hợp ẩn danh - không hiển thị điểm cá nhân.</p>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-bold tracking-wide">Tổng ĐD</div>
            <div className="text-3xl font-black text-primary mt-1">{stats.totalUsers}</div>
          </div>
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-bold tracking-wide">DAU hôm nay</div>
            <div className="text-3xl font-black text-green-600 mt-1">{stats.dau}</div>
            <div className="text-xs text-slate-500 mt-1">{stats.totalUsers ? Math.round((stats.dau / stats.totalUsers) * 100) : 0}% khoa</div>
          </div>
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-bold tracking-wide">MAU 30 ngày</div>
            <div className="text-3xl font-black text-blue-600 mt-1">{stats.mau}</div>
            <div className="text-xs text-slate-500 mt-1">{stats.mauPct}% khoa</div>
          </div>
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-bold tracking-wide">Độ chính xác TB</div>
            <div className="text-3xl font-black text-amber-600 mt-1">{stats.accuracy}%</div>
            <div className="text-xs text-slate-500 mt-1">{stats.totalAttempts.toLocaleString("vi-VN")} câu</div>
          </div>
        </div>

        {/* Daily activity chart */}
        <div className="card mb-6">
          <h3 className="font-bold mb-3">📈 Hoạt động 30 ngày (Daily completions)</h3>
          <div className="flex items-end gap-1 h-32">
            {stats.last30Days.map((d: any, i: number) => {
              const h = Math.max(2, (d.count / maxDayCount) * 100);
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t hover:opacity-80 relative group"
                  style={{ height: `${h}%`, minHeight: "2px" }}
                  title={`${d.date}: ${d.count} hoàn thành`}
                >
                  {d.count > 0 && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {d.count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>{stats.last30Days[0]?.date}</span>
            <span>Hôm nay</span>
          </div>
        </div>

        {/* 2 columns: weak skills + top wrong */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="font-bold mb-3">⚠️ Top 10 kỹ năng yếu nhất</h3>
            {stats.skillsList.length === 0 ? (
              <p className="text-sm text-slate-500">Chưa đủ dữ liệu.</p>
            ) : (
              <div className="space-y-2">
                {stats.skillsList.map((s: any) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="text-xs font-mono text-slate-400 w-12">{s.id}</div>
                    <div className="flex-1 text-sm truncate">{s.name}</div>
                    <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${s.accuracy < 50 ? "bg-red-500" : s.accuracy < 70 ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${s.accuracy}%` }} />
                    </div>
                    <div className="font-bold text-sm w-12 text-right">{s.accuracy}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="font-bold mb-3">🚨 Top câu hỏi bị sai nhiều</h3>
            {stats.topWrong.length === 0 ? (
              <p className="text-sm text-slate-500">Chưa có câu nào bị sai nhiều.</p>
            ) : (
              <div className="space-y-2">
                {stats.topWrong.map((q: any) => (
                  <div key={q.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div className="font-mono text-sm text-slate-700">{q.id}</div>
                    <div className="text-sm">
                      <span className="font-bold text-red-600">{q.count}</span> lần sai
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: engagement */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="card text-center">
            <div className="text-3xl mb-1">🔥</div>
            <div className="text-2xl font-bold">{stats.streaks7Plus}</div>
            <div className="text-xs text-slate-500">ĐD streak ≥ 7 ngày</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-1">🏅</div>
            <div className="text-2xl font-bold">{stats.totalBadgesEarned}</div>
            <div className="text-xs text-slate-500">Tổng huy hiệu đã trao</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-1">❓</div>
            <div className="text-2xl font-bold">{stats.questionCount}</div>
            <div className="text-xs text-slate-500">Câu hỏi trong bank</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-1">🎯</div>
            <div className="text-2xl font-bold">{stats.totalAttempts.toLocaleString("vi-VN")}</div>
            <div className="text-xs text-slate-500">Tổng lượt trả lời</div>
          </div>
        </div>
      </main>
    </div>
  );
}

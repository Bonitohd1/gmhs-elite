import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { count: totalProfiles } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: totalQuestions } = await supabase.from("questions").select("*", { count: "exact", head: true });
  const { count: totalAttempts } = await supabase.from("attempts").select("*", { count: "exact", head: true });
  const { data: topUsers } = await supabase.from("profiles").select("*").order("total_xp", { ascending: false }).limit(5);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6 flex justify-between items-center flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-1">🏢 Admin — Tổng quan khoa</h1>
            <p className="text-slate-600">Dashboard quản lý — {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="card text-center">
            <div className="text-xs text-slate-500">Tổng nhân sự</div>
            <div className="text-3xl font-bold">{totalProfiles || 0}</div>
            <div className="text-xs text-slate-400">đã đăng ký</div>
          </div>
          <div className="card text-center">
            <div className="text-xs text-slate-500">Ngân hàng câu hỏi</div>
            <div className="text-3xl font-bold text-primary">{totalQuestions || 0}</div>
            <div className="text-xs text-slate-400">approved</div>
          </div>
          <div className="card text-center">
            <div className="text-xs text-slate-500">Tổng lượt làm bài</div>
            <div className="text-3xl font-bold">{totalAttempts || 0}</div>
          </div>
          <div className="card text-center">
            <div className="text-xs text-slate-500">Vi phạm TT32</div>
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-xs text-slate-400">tuần này</div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { href: "/admin/personnel", icon: "👥", label: "Nhân sự" },
            { href: "/admin/questions", icon: "📝", label: "Ngân hàng câu hỏi" },
            { href: "/admin/reports", icon: "📊", label: "Báo cáo" },
            { href: "/admin/compliance", icon: "⚖️", label: "TT32 Compliance" },
            { href: "/admin/announcements", icon: "📢", label: "Thông báo" },
            { href: "/admin/audit", icon: "🔍", label: "Audit log" },
            { href: "/admin/roadmap", icon: "🗺️", label: "Roadmap & Risk" },
            { href: "/admin/qgen", icon: "🤖", label: "AI Q-Gen" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="card text-center hover:shadow-md transition">
              <div className="text-3xl mb-2">{l.icon}</div>
              <div className="font-semibold text-sm">{l.label}</div>
            </Link>
          ))}
        </div>

        {/* Top performers */}
        <div className="card">
          <h3 className="font-bold mb-4">🏆 Top 5 ĐD theo XP</h3>
          <div className="space-y-2">
            {topUsers?.map((u, i) => (
              <div key={u.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="font-black text-primary w-8 text-center">#{i + 1}</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 text-white grid place-items-center font-bold text-xs">
                  {u.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{u.display_name}</div>
                  <div className="text-xs text-slate-500">{u.level} • Streak {u.streak}</div>
                </div>
                <div className="text-amber-600 font-bold">{u.total_xp.toLocaleString("vi-VN")} XP</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

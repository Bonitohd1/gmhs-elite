import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();

  const today = new Date().toISOString().split("T")[0];
  const { data: todayCompletion } = await supabase.from("daily_completions").select("*").eq("user_id", user!.id).eq("completed_date", today).single();

  const { data: recentAttempts } = await supabase.from("attempts").select("*").eq("user_id", user!.id).order("taken_at", { ascending: false }).limit(10);

  const totalAttempts = recentAttempts?.length || 0;
  const correctAttempts = recentAttempts?.filter((a) => a.is_correct).length || 0;
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="bg-gradient-to-r from-primary to-cyan-500 text-white rounded-2xl p-6 mb-6 shadow-lg flex items-center gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-full bg-white text-primary grid place-items-center font-black text-3xl flex-shrink-0">
            {profile?.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("") || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold">Xin chào, {profile?.display_name}!</h1>
            <p className="opacity-90 text-sm">{new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
            <div className="flex gap-4 mt-3 text-sm flex-wrap">
              <div><b className="text-2xl block">{profile?.total_xp?.toLocaleString("vi-VN") || 0}</b><span className="text-xs opacity-90">Tổng XP</span></div>
              <div><b className="text-2xl block">🔥 {profile?.streak || 0}</b><span className="text-xs opacity-90">Streak</span></div>
              <div><b className="text-2xl block">{accuracy}%</b><span className="text-xs opacity-90">Độ chính xác</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="card text-center"><div className="text-xs text-slate-500">Daily Challenge</div><div className="text-3xl font-bold">{todayCompletion ? "✓" : "5"}</div><div className="text-xs text-slate-400">{todayCompletion ? "Đã làm" : "câu hôm nay"}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Tổng câu đã làm</div><div className="text-3xl font-bold text-primary">{totalAttempts}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Vi phạm TT32</div><div className="text-3xl font-bold text-green-600">0</div><div className="text-xs text-slate-400">30 ngày sạch</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Coins</div><div className="text-3xl font-bold text-amber-600">480</div></div>
        </div>

        {!todayCompletion && (
          <div className="card bg-gradient-to-r from-amber-50 to-pink-50 border-amber-200 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold mb-1">🎯 Daily Challenge</h2>
                <p className="text-slate-600 text-sm">5 câu hỏi, 5 phút. Duy trì streak {profile?.streak || 0} ngày!</p>
              </div>
              <Link href="/daily" className="btn-primary">Bắt đầu →</Link>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { href: "/scenarios", icon: "🏥", label: "Tình huống lâm sàng", desc: "5 case branching" },
            { href: "/skillmap", icon: "🗺️", label: "Skill Map", desc: "Bản đồ năng lực" },
            { href: "/vinhdanh", icon: "🏆", label: "Hall of Fame", desc: "Top 10 + Badges" },
            { href: "/ai", icon: "🤖", label: "Trợ lý AI", desc: "Hỏi đáp 31 docs" },
            { href: "/forum", icon: "💬", label: "Diễn đàn", desc: "Peer Q&A" },
            { href: "/library", icon: "📚", label: "Thư viện", desc: "31 tài liệu nguồn" },
            { href: "/cohorts", icon: "👥", label: "Lớp học", desc: "Nhóm cùng học" },
            { href: "/shop", icon: "🛍️", label: "Cửa hàng", desc: "Đổi quà 8 vật phẩm" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="card hover:shadow-md transition cursor-pointer">
              <div className="text-3xl mb-2">{l.icon}</div>
              <div className="font-bold text-sm">{l.label}</div>
              <div className="text-xs text-slate-500 mt-1">{l.desc}</div>
            </Link>
          ))}
        </div>

        {totalAttempts > 0 && (
          <div className="card">
            <h3 className="font-bold mb-3">📊 Hoạt động gần đây</h3>
            <div className="space-y-2">
              {recentAttempts?.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                  <span>{a.is_correct ? "✓" : "✗"} Câu {a.question_id}</span>
                  <span className="text-slate-500 text-xs">{new Date(a.taken_at).toLocaleString("vi-VN")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

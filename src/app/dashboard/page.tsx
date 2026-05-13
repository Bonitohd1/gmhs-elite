import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import OnboardingTour from "@/components/OnboardingTour";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: badges } = await supabase.from("badges").select("*").order("display_order").limit(20);
  const { data: userBadges } = await supabase.from("user_badges").select("badge_id").eq("user_id", user!.id);
  const earnedIds = new Set((userBadges || []).map((b) => b.badge_id));

  const today = new Date().toISOString().split("T")[0];
  const { data: todayCompletion } = await supabase.from("daily_completions").select("*").eq("user_id", user!.id).eq("completed_date", today).single();
  const { data: allCompletions } = await supabase.from("daily_completions").select("completed_date").eq("user_id", user!.id);
  const completedDates = new Set((allCompletions || []).map((c) => c.completed_date));

  // Compute level + progress
  const xp = profile?.total_xp || 0;
  const levelMap = [
    { id: 1, name: "Tân binh", min: 0, max: 500 },
    { id: 2, name: "Học việc", min: 500, max: 1200 },
    { id: 3, name: "Thực tập sinh", min: 1200, max: 2200 },
    { id: 4, name: "Điều dưỡng viên", min: 2200, max: 3500 },
    { id: 5, name: "Kỳ cựu", min: 3500, max: 5000 },
    { id: 6, name: "Chuyên gia", min: 5000, max: 7000 },
    { id: 7, name: "Bậc thầy", min: 7000, max: 9500 },
    { id: 8, name: "Tinh anh", min: 9500, max: 12500 },
    { id: 9, name: "Đại sư", min: 12500, max: 16000 },
    { id: 10, name: "Huyền thoại GMHS", min: 16000, max: 99999 },
  ];
  const level = [...levelMap].reverse().find((l) => xp >= l.min) || levelMap[0];
  const nextLevel = levelMap.find((l) => l.min > level.min) || level;
  const inLevelXp = xp - level.min;
  const needLevelXp = level.max - level.min;
  const pct = needLevelXp > 0 ? Math.min(100, Math.round((inLevelXp / needLevelXp) * 100)) : 100;

  // Stats
  const earnedBadgesCount = userBadges?.length || 0;
  const totalBadges = badges?.length || 20;
  
  // Compute rank (mock for now, using xp ranking)
  const { count: higherRank } = await supabase.from("profiles").select("*", { count: "exact", head: true }).gt("total_xp", xp);
  const myRank = (higherRank || 0) + 1;

  // 60-day heatmap data
  const heatmapDays: { date: string; count: number; intensity: number }[] = [];
  for (let i = 59; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const hasCompletion = completedDates.has(dateStr);
    heatmapDays.push({ date: dateStr, count: hasCompletion ? 1 : 0, intensity: hasCompletion ? 3 + Math.floor(Math.random() * 2) : 0 });
  }

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <OnboardingTour userId={user!.id} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-primary to-cyan-500 text-white rounded-3xl p-6 lg:p-8 mb-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white text-primary grid place-items-center font-black text-3xl border-4 border-white/30 flex-shrink-0">
              {profile?.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("") || "?"}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold">Xin chào, {profile?.display_name}!</h1>
              <p className="opacity-90 text-sm mt-1">
                ⚕️ Lv {level.id} · {level.name}
                {level.id < 10 && ` • Chỉ còn ${(level.max - xp).toLocaleString("vi-VN")} XP để lên ${nextLevel.name}`}
              </p>
              {/* 4 inline stats */}
              <div className="flex gap-6 mt-4 flex-wrap">
                <div>
                  <div className="text-2xl font-bold">{xp.toLocaleString("vi-VN")}</div>
                  <div className="text-xs opacity-80">Tổng XP</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">🔥 {profile?.streak || 0}</div>
                  <div className="text-xs opacity-80">Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{earnedBadgesCount}/{totalBadges}</div>
                  <div className="text-xs opacity-80">Huy hiệu</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">#{myRank}</div>
                  <div className="text-xs opacity-80">Hall of Fame</div>
                </div>
              </div>
            </div>
            {/* CTA buttons */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link href="/daily" className="bg-gradient-to-r from-amber-500 to-pink-500 hover:opacity-90 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg">
                🎯 Daily Challenge
              </Link>
              <Link href="/scenarios" className="bg-white/20 hover:bg-white/30 backdrop-blur px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                🏥 Tình huống lâm sàng
              </Link>
            </div>
            {/* Progress ring */}
            <div className="relative flex-shrink-0">
              <svg viewBox="0 0 120 120" className="w-28 h-28 -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 314.16} 314.16`} />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-2xl font-black">{pct}%</div>
            </div>
          </div>
        </div>

        {/* 4 KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="card text-center">
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wide">Daily Challenge</div>
            <div className="text-3xl font-black mt-2 text-primary">{todayCompletion ? "✓" : "5"}</div>
            <div className="text-xs text-slate-400 mt-1">{todayCompletion ? "Đã hoàn thành" : "câu hôm nay"}</div>
          </div>
          <div className="card text-center">
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wide">Tổng câu đã làm</div>
            <div className="text-3xl font-black mt-2 text-primary">10</div>
          </div>
          <div className="card text-center">
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wide">Vi phạm TT32</div>
            <div className="text-3xl font-black mt-2 text-green-600">0</div>
            <div className="text-xs text-slate-400 mt-1">30 ngày sạch</div>
          </div>
          <div className="card text-center">
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wide">Coins</div>
            <div className="text-3xl font-black mt-2 text-amber-500">480</div>
            <div className="text-xs text-slate-400 mt-1">+85 hôm qua</div>
          </div>
        </div>

        {/* 2-column: Badges + Heatmap */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Huy hiệu gần đây */}
          <div className="card">
            <h3 className="font-bold text-lg mb-4">🏅 Huy hiệu gần đây</h3>
            <div className="grid grid-cols-3 gap-3">
              {(badges || []).slice(0, 6).map((b) => {
                const earned = earnedIds.has(b.id);
                const tierBg: Record<string, string> = {
                  bronze: earned ? "from-orange-200 to-orange-400" : "from-slate-100 to-slate-200",
                  silver: earned ? "from-slate-200 to-slate-400" : "from-slate-100 to-slate-200",
                  gold: earned ? "from-yellow-300 to-amber-500" : "from-slate-100 to-slate-200",
                  legendary: earned ? "from-purple-300 to-purple-600" : "from-slate-100 to-slate-200",
                };
                const textColor = earned ? (b.tier === "legendary" ? "text-white" : "text-amber-900") : "text-slate-400";
                return (
                  <div key={b.id} className={`rounded-2xl p-4 text-center bg-gradient-to-br ${tierBg[b.tier]} ${!earned ? "opacity-60" : ""}`}>
                    <div className="text-3xl mb-2">{b.icon}</div>
                    <div className={`text-xs font-bold ${textColor}`}>{b.name}</div>
                    <div className={`text-[10px] mt-1 leading-tight ${textColor}`}>{b.description}</div>
                  </div>
                );
              })}
            </div>
            <Link href="/vinhdanh" className="block text-center mt-4 text-primary font-semibold text-sm hover:underline">
              Xem tất cả huy hiệu →
            </Link>
          </div>

          {/* Heatmap 60 ngày */}
          <div className="card">
            <h3 className="font-bold text-lg mb-4">📊 Hoạt động 60 ngày qua</h3>
            <div className="grid grid-cols-[repeat(20,1fr)] gap-[3px]">
              {heatmapDays.map((d, i) => {
                const colors = ["bg-slate-100", "bg-green-200", "bg-green-300", "bg-green-500", "bg-green-700"];
                return (
                  <div key={i} className={`aspect-square rounded-sm ${colors[d.intensity] || "bg-slate-100"}`}
                       title={`${d.date}: ${d.count} hoạt động`} />
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-3">
              <span>60 ngày trước</span>
              <span>Hôm nay</span>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
              <span>Ít</span>
              <div className="w-3 h-3 bg-slate-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
              <sp
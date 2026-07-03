"use client";

import { useState, useEffect } from "react";
import Topbar from "@/components/Topbar";
import { ListSkeleton } from "@/components/Skeleton";
import { createClient } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

type Tab = "leaderboard" | "badges" | "levels" | "gala";

export default function VinhDanhPage() {
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("leaderboard");
  const [profile, setProfile] = useState<any>(null);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [myBadges, setMyBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [{ data: p }, { data: ps }, { data: bs }, { data: ls }, { data: ub }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("profiles").select("*").eq("show_in_leaderboard", true).order("total_xp", { ascending: false }).limit(20),
      supabase.from("badges").select("*").order("display_order"),
      supabase.from("levels").select("*").order("id"),
      supabase.from("user_badges").select("badge_id").eq("user_id", user.id),
    ]);
    setProfile(p);
    setAllProfiles(ps || []);
    setBadges(bs || []);
    setLevels(ls || []);
    setMyBadges((ub || []).map((b: any) => b.badge_id));
    setLoading(false);
  }

  if (loading) return (
    <div className="min-h-screen">
      <Topbar profile={null} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <ListSkeleton rows={10} />
      </main>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🏆 Vinh danh</h1>
          <p className="text-slate-600">Xếp hạng, huy hiệu, cấp độ và sự kiện Gala 12/05.</p>
        </div>

        {/* Sub-tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200 mb-6 w-fit overflow-x-auto">
          {([
            ["leaderboard", "🏆 Hall of Fame"],
            ["badges", "🏅 Huy hiệu"],
            ["levels", "💎 Cấp độ"],
            ["gala", "🔔 Rung chuông vàng"],
          ] as [Tab, string][]).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
                tab === k ? "bg-gradient-to-r from-primary to-cyan-500 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "leaderboard" && <LeaderboardTab profiles={allProfiles} myId={profile?.id} />}
        {tab === "badges" && <BadgesTab badges={badges} myBadges={myBadges} />}
        {tab === "levels" && <LevelsTab levels={levels} myXp={profile?.total_xp || 0} />}
        {tab === "gala" && <GalaTab profiles={allProfiles} />}
      </main>
    </div>
  );
}

function LeaderboardTab({ profiles, myId }: { profiles: any[]; myId: string }) {
  const top3 = profiles.slice(0, 3);
  return (
    <div>
      {/* Podium */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 mb-6 items-end">
          <PodiumCard rank={2} medal="🥈" profile={top3[1]} bg="from-slate-300 to-slate-500" h={170} />
          <PodiumCard rank={1} medal="🥇" profile={top3[0]} bg="from-yellow-400 to-orange-500" h={210} />
          <PodiumCard rank={3} medal="🥉" profile={top3[2]} bg="from-amber-700 to-orange-900" h={150} />
        </div>
      )}
      {/* Full list */}
      <div className="card">
        <h3 className="font-bold text-lg mb-4">📊 Bảng xếp hạng đầy đủ</h3>
        <div className="space-y-2">
          {profiles.map((u, i) => (
            <div key={u.id} className={`flex items-center gap-3 p-3 rounded-lg ${u.id === myId ? "bg-gradient-to-r from-primary-50 to-cyan-50 border border-primary" : "bg-slate-50"}`}>
              <div className="font-black text-primary w-8 text-center">#{i + 1}</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 text-white grid place-items-center font-bold text-sm">
                {u.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">{u.display_name}{u.id === myId && " (bạn)"}</div>
                <div className="text-xs text-slate-500">{u.level}</div>
              </div>
              <div>
                <div className="font-bold text-amber-600">{u.total_xp.toLocaleString("vi-VN")} XP</div>
                <div className="text-xs text-slate-500 text-right">🔥 {u.streak}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ rank, medal, profile, bg, h }: any) {
  return (
    <div className={`bg-gradient-to-br ${bg} text-white rounded-xl p-4 text-center`} style={{ minHeight: h, order: rank }}>
      <div className="text-3xl mb-2">{medal}</div>
      <div className="w-14 h-14 rounded-full bg-white text-amber-700 grid place-items-center font-bold mx-auto mb-2 border-4 border-white/50">
        {profile?.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("")}
      </div>
      <div className="font-bold text-sm">{profile?.display_name}</div>
      <div className="text-xs opacity-90 mt-1">{profile?.total_xp?.toLocaleString("vi-VN")} XP</div>
    </div>
  );
}

function BadgesTab({ badges, myBadges }: { badges: any[]; myBadges: string[] }) {
  const earned = badges.filter((b) => myBadges.includes(b.id));
  const locked = badges.filter((b) => !myBadges.includes(b.id));
  const tierBg: Record<string, string> = {
    bronze: "from-orange-100 to-orange-200",
    silver: "from-slate-200 to-slate-400",
    gold: "from-yellow-200 to-amber-400 text-amber-900",
    legendary: "from-purple-300 to-purple-600 text-white",
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card text-center"><div className="text-xs text-slate-500">Đã đạt</div><div className="text-2xl font-bold">{earned.length}</div></div>
        <div className="card text-center"><div className="text-xs text-slate-500">Tổng số</div><div className="text-2xl font-bold">{badges.length}</div></div>
        <div className="card text-center"><div className="text-xs text-slate-500">Tỷ lệ</div><div className="text-2xl font-bold">{badges.length ? Math.round(earned.length / badges.length * 100) : 0}%</div></div>
      </div>
      
      <h3 className="font-bold mb-3">🏅 Đã sưu tầm ({earned.length})</h3>
      {earned.length === 0 && <p className="text-slate-500 text-sm mb-4">Chưa có huy hiệu nào. Hoàn thành Daily/Weekly để bắt đầu!</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {earned.map((b) => (
          <div key={b.id} className={`bg-gradient-to-br ${tierBg[b.tier]} rounded-xl p-4 text-center`}>
            <div className="text-3xl mb-2">{b.icon}</div>
            <div className="font-bold text-sm">{b.name}</div>
            <div className="text-xs opacity-75 mt-1">{b.description}</div>
          </div>
        ))}
      </div>
      
      <h3 className="font-bold mb-3 mt-6">🔒 Cần mở khoá ({locked.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {locked.map((b) => (
          <div key={b.id} className="bg-slate-100 rounded-xl p-4 text-center opacity-50">
            <div className="text-3xl mb-2 grayscale">{b.icon}</div>
            <div className="font-bold text-sm">{b.name}</div>
            <div className="text-xs text-slate-500 mt-1">{b.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LevelsTab({ levels, myXp }: { levels: any[]; myXp: number }) {
  const myLevel = [...levels].reverse().find((l) => myXp >= l.xp_min);
  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-4">💎 10 cấp độ — Tân binh đến Huyền thoại GMHS</h3>
      <div className="space-y-2">
        {levels.map((l) => {
          const reached = myXp >= l.xp_min;
          const isCurrent = myLevel?.id === l.id;
          return (
            <div key={l.id} className={`flex items-center gap-3 p-3 rounded-xl ${isCurrent ? "border-2" : ""} ${!reached ? "opacity-50" : ""}`}
                 style={{ background: isCurrent ? `${l.color}22` : "#F8FAFC", borderColor: isCurrent ? l.color : "transparent" }}>
              <div className="w-12 h-12 rounded-full text-white grid place-items-center text-xl font-bold flex-shrink-0" style={{ background: l.color }}>
                {l.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold">Lv {l.id} · {l.name}{isCurrent && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Bạn đang ở đây</span>}</div>
                <div className="text-xs text-slate-500">{l.xp_min.toLocaleString("vi-VN")} - {l.xp_max >= 99999 ? "∞" : l.xp_max.toLocaleString("vi-VN")} XP</div>
              </div>
              {reached && <span className="text-green-600 font-bold">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GalaTab({ profiles }: { profiles: any[] }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let target = new Date(now.getFullYear(), 4, 12, 19, 0); // May 12, 19:00
      if (target < now) target = new Date(now.getFullYear() + 1, 4, 12, 19, 0);
      const diff = target.getTime() - now.getTime();
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-red-700 via-red-500 to-amber-400 text-white rounded-2xl p-8 text-center mb-6 shadow-2xl relative overflow-hidden">
        <div className="text-sm font-bold opacity-95 tracking-wider">🌟 SỰ KIỆN ĐẶC BIỆT</div>
        <div className="text-4xl font-black my-3">🔔 RUNG CHUÔNG VÀNG</div>
        <div className="text-sm opacity-95 mb-6">Đêm Gala kỷ niệm Quốc tế Điều dưỡng — 12/05</div>
        <div className="flex justify-center gap-3 flex-wrap">
          {[["Ngày", countdown.days], ["Giờ", countdown.hours], ["Phút", countdown.mins], ["Giây", countdown.secs]].map(([label, val]: any) => (
            <div key={label} className="bg-white/20 backdrop-blur rounded-xl p-3 min-w-[80px]">
              <div className="text-3xl font-mono font-black">{String(val).padStart(2, "0")}</div>
              <div className="text-xs uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-bold text-lg mb-3">📜 Thể lệ</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Top 30 Hall of Fame được mời tham gia.</li>
            <li>• Mỗi câu hỏi 30 giây - sai 1 câu loại.</li>
            <li>• Bộ câu cuối: 5 tình huống lâm sàng nâng cao.</li>
            <li>• Người trụ vững cuối cùng giành huy hiệu "Vô địch Rung chuông vàng".</li>
            <li className="text-amber-700 font-bold">• Sự kiện chỉ mang tính tôn vinh; không là căn cứ đánh giá nhân sự chính thức.</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-3">🎯 Top 30 dự kiến</h3>
          <p className="text-sm text-slate-600 mb-3">Dựa trên điểm trung bình 12 tháng và mức độ tham gia.</p>
          <div className="flex flex-wrap gap-1">
            {profiles.slice(0, 30).map((p) => (
              <div key={p.id} title={p.display_name}
                   className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-cyan-500 text-white grid place-items-center text-xs font-bold">
                {p.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

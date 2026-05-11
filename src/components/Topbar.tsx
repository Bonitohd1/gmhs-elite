"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Sidebar from "./Sidebar";

export default function Topbar({ profile }: { profile: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  // Compute level + progress
  const xp = profile?.total_xp || 0;
  const levelMap = [
    { id: 1, name: "Tân binh", min: 0, max: 500, color: "#94A3B8" },
    { id: 2, name: "Học việc", min: 500, max: 1200, color: "#60A5FA" },
    { id: 3, name: "Thực tập sinh", min: 1200, max: 2200, color: "#34D399" },
    { id: 4, name: "Điều dưỡng viên", min: 2200, max: 3500, color: "#10B981" },
    { id: 5, name: "Kỳ cựu", min: 3500, max: 5000, color: "#0EA5E9" },
    { id: 6, name: "Chuyên gia", min: 5000, max: 7000, color: "#F59E0B" },
    { id: 7, name: "Bậc thầy", min: 7000, max: 9500, color: "#EAB308" },
    { id: 8, name: "Tinh anh", min: 9500, max: 12500, color: "#A855F7" },
    { id: 9, name: "Đại sư", min: 12500, max: 16000, color: "#EC4899" },
    { id: 10, name: "Huyền thoại GMHS", min: 16000, max: 99999, color: "#DC2626" },
  ];
  const level = [...levelMap].reverse().find((l) => xp >= l.min) || levelMap[0];
  const inLevelXp = xp - level.min;
  const needLevelXp = level.max - level.min;
  const pct = needLevelXp > 0 ? Math.min(100, Math.round((inLevelXp / needLevelXp) * 100)) : 100;

  return (
    <>
      <header className="bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg sticky top-0 z-40 h-14">
        <div className="h-full px-3 flex items-center gap-3">
          {/* Mobile hamburger */}
          <button onClick={() => setMobileNavOpen(true)} className="lg:hidden bg-white/15 hover:bg-white/25 w-9 h-9 rounded-lg grid place-items-center text-lg flex-shrink-0">☰</button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-bold flex-shrink-0 lg:w-56">
            <span className="bg-white text-primary w-8 h-8 rounded-lg grid place-items-center font-black">G</span>
            <span className="hidden sm:inline">GMHS Elite 2026</span>
          </Link>

          {/* Level + XP bar (desktop) */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
              {level.id <= 5 ? "🌱" : level.id <= 7 ? "🎯" : level.id <= 9 ? "💎" : "⚡"} Lv {level.id} · {level.name}
            </span>
            <div className="flex-1 bg-white/20 rounded-full h-2 relative overflow-hidden min-w-[80px]">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs whitespace-nowrap font-mono">{xp.toLocaleString("vi-VN")} / {level.max.toLocaleString("vi-VN")} XP</span>
          </div>

          {/* Spacer */}
          <div className="flex-1 md:hidden" />

          {/* Streak + Avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="bg-orange-500 px-2 py-1 rounded-full text-xs font-bold">🔥 {profile?.streak || 0}</span>
            <button className="hidden sm:block hover:bg-white/15 w-9 h-9 rounded-lg" title="Thông báo">🔔</button>
            <Link href="/profile" className="bg-white/20 hover:bg-white/30 w-9 h-9 rounded-full grid place-items-center text-xs font-bold flex-shrink-0">
              {profile?.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("") || "?"}
            </Link>
            <span className="hidden md:inline text-sm font-semibold">{profile?.display_name}</span>
            <button onClick={logout} className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs hidden sm:inline">Đăng xuất</button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}

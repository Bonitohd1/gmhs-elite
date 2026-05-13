"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Sidebar from "./Sidebar";
import EnergyBar from "./EnergyBar";

export default function Topbar({ profile }: { profile: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);

  async function loadNotifs() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("notifications")
      .select("*").eq("user_id", user.id)
      .order("created_at", { ascending: false }).limit(15);
    setNotifs(data || []);
    setUnreadCount((data || []).filter((n) => !n.is_read).length);
  }

  useEffect(() => {
    loadNotifs();
    const t = setInterval(loadNotifs, 30000); // refresh every 30s
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [notifOpen]);

  async function markAllRead() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true })
      .eq("user_id", user.id).eq("is_read", false);
    loadNotifs();
  }

  async function markRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    loadNotifs();
  }

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
          <div className="hidden md:flex items-center gap-3 max-w-md flex-shrink min-w-0">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
              {level.id <= 5 ? "🌱" : level.id <= 7 ? "🎯" : level.id <= 9 ? "💎" : "⚡"} Lv {level.id} · {level.name}
            </span>
            <div className="flex-1 bg-white/20 rounded-full h-2 relative overflow-hidden min-w-[80px]">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs whitespace-nowrap font-mono">{xp.toLocaleString("vi-VN")} / {level.max.toLocaleString("vi-VN")} XP</span>
          </div>

          {/* Streak + Avatar — pushed to far right */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <span className="bg-orange-500 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">🔥 {profile?.streak || 0}</span>
            <span className="hidden md:inline-flex"><EnergyBar compact /></span>
            <span className="bg-amber-500/90 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" title="Coins">🪙 {profile?.coins || 0}</span>
            <div ref={notifRef} className="relative hidden sm:block">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative hover:bg-white/15 w-9 h-9 rounded-lg" title="Thông báo">
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] grid place-items-center px-1">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 max-h-96 overflow-hidden flex flex-col z-50">
                  <div className="flex justify-between items-center p-3 border-b border-slate-200">
                    <h4 className="font-bold text-sm">Thông báo</h4>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">Đánh dấu đã đọc tất cả</button>
                    )}
                  </div>
                  <div className="overflow-y-auto flex-1">
                    {notifs.length === 0 ? (
                      <div className="p-6 text-center text-sm text-slate-500">
                        <div className="text-3xl mb-2">📭</div>
                        Không có thông báo
                      </div>
                    ) : (
                      notifs.map((n) => (
                        <a
                          key={n.id}
                          href={n.link || "#"}
                          onClick={(e) => {
                            if (!n.link) e.preventDefault();
                            markRead(n.id);
                          }}
                          className={`block p-3 border-b border-slate-100 hover:bg-slate-50 ${!n.is_read ? "bg-blue-50" : ""}`}
                        >
                          <div className="flex gap-2 items-start">
                            <span className="text-xl flex-shrink-0">{n.icon || "🔔"}</span>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm ${!n.is_read ? "font-semibold" : ""} text-slate-900`}>{n.title}</div>
                              {n.body && <div className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.body}</div>}
                              <div className="text-[10px] text-slate-400 mt-1">{new Date(n.created_at).toLocaleString("vi-VN")}</div>
                            </div>
                            {!n.is_read && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></span>}
                          </div>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link href="/profile" className="bg-white/20 hover:bg-white/30 w-9 h-9 rounded-full grid place-items-center text-xs font-bold flex-shrink-0 overflow-hidden">
              {profile?.avatar_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" />
              ) : (
                profile?.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("") || "?"
              )}
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

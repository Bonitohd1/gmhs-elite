"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

const NAV_PRIMARY = [
  { href: "/dashboard", icon: "🏠", label: "Tổng quan" },
  { href: "/daily", icon: "🎯", label: "Daily" },
  { href: "/weekly", icon: "📝", label: "Weekly" },
  { href: "/scenarios", icon: "🏥", label: "Tình huống" },
  { href: "/skillmap", icon: "🗺️", label: "Skill Map" },
  { href: "/library", icon: "📚", label: "Thư viện" },
];

const NAV_SECONDARY = [
  { href: "/vinhdanh", icon: "🏆", label: "Vinh danh" },
  { href: "/ai", icon: "🤖", label: "AI" },
  { href: "/forum", icon: "💬", label: "Diễn đàn" },
  { href: "/announcements", icon: "📣", label: "Thông báo" },
  { href: "/insights", icon: "🧠", label: "AI Insights" },
  { href: "/cohorts", icon: "👥", label: "Lớp học" },
  { href: "/mentor", icon: "🎓", label: "Mentor" },
  { href: "/calendar", icon: "📅", label: "Lịch" },
  { href: "/surveys", icon: "📊", label: "Khảo sát" },
  { href: "/bookmarks", icon: "⭐", label: "Yêu thích" },
  { href: "/shop", icon: "🛍️", label: "Cửa hàng" },
  { href: "/profile", icon: "👤", label: "Hồ sơ" },
  { href: "/settings", icon: "⚙️", label: "Cài đặt" },
  { href: "/help", icon: "❓", label: "Trợ giúp" },
  { href: "/admin", icon: "🔐", label: "Admin" },
];

export default function Topbar({ profile }: { profile: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  async function logout() { await supabase.auth.signOut(); router.push("/auth/login"); router.refresh(); }

  return (
    <header className="bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 py-3 flex items-center gap-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden bg-white/15 hover:bg-white/25 w-9 h-9 rounded-lg grid place-items-center text-lg">☰</button>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg flex-shrink-0">
          <span className="bg-white text-primary w-8 h-8 rounded-lg grid place-items-center font-black">G</span>
          <span className="hidden sm:inline">GMHS Elite</span>
        </Link>
        <nav className="flex-1 hidden lg:flex gap-1 overflow-x-auto">
          {NAV_PRIMARY.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${active ? "bg-white text-primary" : "hover:bg-white/20"}`}>
                <span className="mr-1">{item.icon}</span>
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}
          <div className="relative">
            <button onClick={() => setMoreOpen(!moreOpen)} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/20">⋯ Khác</button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white text-slate-800 rounded-xl shadow-2xl p-2 min-w-[220px] z-50">
                {NAV_SECONDARY.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMoreOpen(false)}
                    className={`block px-3 py-2 rounded text-sm hover:bg-slate-100 ${pathname === item.href ? "bg-primary-50 text-primary font-bold" : ""}`}>
                    {item.icon} {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-2 text-sm flex-shrink-0">
          <span className="bg-white/20 px-2 py-1 rounded text-xs hidden md:inline">XP: {profile?.total_xp || 0}</span>
          <span className="bg-orange-500 px-2 py-1 rounded text-xs">🔥 {profile?.streak || 0}</span>
          <Link href="/profile" className="bg-white/20 hover:bg-white/30 w-9 h-9 rounded-full grid place-items-center text-xs font-bold">
            {profile?.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("") || "?"}
          </Link>
          <button onClick={logout} className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs hidden sm:inline">Đăng xuất</button>
        </div>
      </div>
      {menuOpen && (
        <nav className="lg:hidden bg-white/10 backdrop-blur border-t border-white/20 px-3 py-2 grid grid-cols-2 gap-1 max-h-[60vh] overflow-y-auto">
          {[...NAV_PRIMARY, ...NAV_SECONDARY].map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${pathname === item.href ? "bg-white text-primary" : "hover:bg-white/20"}`}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

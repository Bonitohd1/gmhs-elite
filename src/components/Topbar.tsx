"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function Topbar({ profile }: { profile: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  const navItems = [
    { href: "/dashboard", icon: "🏠", label: "Tổng quan" },
    { href: "/daily", icon: "🎯", label: "Daily" },
    { href: "/weekly", icon: "📝", label: "Weekly" },
    { href: "/scenarios", icon: "🏥", label: "Tình huống" },
    { href: "/skillmap", icon: "🗺️", label: "Skill Map" },
    { href: "/library", icon: "📚", label: "Thư viện" },
  ];
  const moreItems = [
    { href: "/profile", icon: "👤", label: "Hồ sơ" },
    { href: "/settings", icon: "⚙️", label: "Cài đặt" },
  ];

  return (
    <header className="bg-gradient-to-r from-primary to-cyan-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg flex-shrink-0">
          <span className="bg-white text-primary w-8 h-8 rounded-lg grid place-items-center font-black">G</span>
          <span className="hidden sm:inline">GMHS Elite</span>
        </Link>
        <nav className="flex-1 flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-white text-primary" : "hover:bg-white/20"
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm flex-shrink-0">
          <span className="bg-white/20 px-2 py-1 rounded text-xs hidden md:inline">XP: {profile?.total_xp || 0}</span>
          <span className="bg-orange-500 px-2 py-1 rounded text-xs">🔥 {profile?.streak || 0}</span>
          <Link href="/profile" className="bg-white/20 hover:bg-white/30 w-8 h-8 rounded-full grid place-items-center text-xs font-bold">
            {profile?.display_name?.split(" ").slice(-2).map((n: string) => n[0]).join("") || "?"}
          </Link>
          <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs hidden sm:inline">
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}

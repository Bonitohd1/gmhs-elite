"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_GROUPS = [
  {
    title: "Học tập",
    items: [
      { href: "/dashboard", icon: "🏠", label: "Tổng quan" },
      { href: "/daily", icon: "🎯", label: "Daily Challenge" },
      { href: "/weekly", icon: "📝", label: "Weekly Mini-test" },
      { href: "/scenarios", icon: "🏥", label: "Tình huống lâm sàng" },
      { href: "/skillmap", icon: "🗺️", label: "Skill Map" },
    ],
  },
  {
    title: "Cộng đồng & Tài nguyên",
    items: [
      { href: "/vinhdanh", icon: "🏆", label: "Vinh danh" },
      { href: "/library", icon: "📚", label: "Thư viện" },
      { href: "/ai", icon: "🤖", label: "Trợ lý AI" },
      { href: "/forum", icon: "💬", label: "Diễn đàn" },
      { href: "/mentor", icon: "🎓", label: "Mentor Program" },
      { href: "/cohorts", icon: "👥", label: "Lớp học" },
      { href: "/bookmarks", icon: "⭐", label: "Yêu thích" },
      { href: "/shop", icon: "🛍️", label: "Cửa hàng" },
    ],
  },
  {
    title: "Thông tin & Khảo sát",
    items: [
      { href: "/announcements", icon: "📣", label: "Thông báo" },
      { href: "/calendar", icon: "📅", label: "Lịch sự kiện" },
      { href: "/surveys", icon: "📊", label: "Khảo sát" },
      { href: "/insights", icon: "🧠", label: "AI Insights" },
    ],
  },
  {
    title: "Cá nhân",
    items: [
      { href: "/profile", icon: "👤", label: "Hồ sơ" },
      { href: "/settings", icon: "⚙️", label: "Cài đặt" },
      { href: "/help", icon: "❓", label: "Trợ giúp" },
    ],
  },
  {
    title: "Quản trị",
    items: [
      { href: "/admin", icon: "🔐", label: "Admin Dashboard" },
      { href: "/admin/feedback", icon: "🚩", label: "Question Feedback" },
    ],
  },
];

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  const navContent = (
    <nav className="p-3 space-y-4 overflow-y-auto h-full">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-3 py-2">{group.title}</div>
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href + "/"));
              return (
                <Link key={item.href} href={item.href} onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    active
                      ? "bg-gradient-to-r from-primary to-cyan-500 text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}>
                  <span className="text-base w-5 text-center">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar - fixed left */}
      <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-60 bg-white border-r border-slate-200 z-30">
        {navContent}
      </aside>

      {/* Mobile sidebar - overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
          <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 lg:hidden shadow-2xl animate-in slide-in-from-left">
            <div className="h-14 bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-between px-4">
              <span className="font-bold text-white">GMHS Elite</span>
              <button onClick={onClose} className="text-white text-2xl">×</button>
            </div>
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}

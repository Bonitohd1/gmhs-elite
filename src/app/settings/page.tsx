"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedFont = localStorage.getItem("fontSize") || "medium";
    setTheme(savedTheme);
    setFontSize(savedFont);
    if (savedTheme === "dark") document.body.classList.add("dark");
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(data);
    setLoading(false);
  }

  function applyTheme(t: string) {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.body.classList.toggle("dark", t === "dark");
  }

  function applyFontSize(f: string) {
    setFontSize(f);
    localStorage.setItem("fontSize", f);
    document.body.style.fontSize = f === "small" ? "13px" : f === "large" ? "16px" : "14px";
  }

  async function changePassword() {
    const newPassword = prompt("Nhập mật khẩu mới (≥ 6 ký tự):");
    if (!newPassword || newPassword.length < 6) return;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    alert(error ? "Lỗi: " + error.message : "✓ Đã đổi mật khẩu");
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-3xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-6">⚙️ Cài đặt</h1>

        {/* Appearance */}
        <div className="card mb-4">
          <h3 className="font-bold mb-4">🎨 Giao diện</h3>
          
          <div className="py-3 border-b border-slate-200">
            <div className="font-semibold text-sm mb-2">Chế độ màu</div>
            <div className="flex gap-2">
              <button onClick={() => applyTheme("light")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme === "light" ? "bg-primary text-white" : "bg-slate-100"}`}>☀️ Sáng</button>
              <button onClick={() => applyTheme("dark")} className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme === "dark" ? "bg-primary text-white" : "bg-slate-100"}`}>🌙 Tối</button>
            </div>
          </div>

          <div className="py-3">
            <div className="font-semibold text-sm mb-2">Cỡ chữ</div>
            <div className="flex gap-2">
              <button onClick={() => applyFontSize("small")} className={`px-4 py-2 rounded-lg text-sm ${fontSize === "small" ? "bg-primary text-white" : "bg-slate-100"}`}>Nhỏ</button>
              <button onClick={() => applyFontSize("medium")} className={`px-4 py-2 rounded-lg text-sm ${fontSize === "medium" ? "bg-primary text-white" : "bg-slate-100"}`}>Vừa</button>
              <button onClick={() => applyFontSize("large")} className={`px-4 py-2 rounded-lg text-sm ${fontSize === "large" ? "bg-primary text-white" : "bg-slate-100"}`}>Lớn</button>
            </div>
          </div>
        </div>

        {/* Privacy (NĐ 13/2023) */}
        <div className="card mb-4">
          <h3 className="font-bold mb-4">🔒 Quyền riêng tư (NĐ 13/2023)</h3>
          <p className="text-sm text-slate-600 mb-4">
            Bạn có quyền xem, sửa, hoặc yêu cầu xoá toàn bộ dữ liệu cá nhân bất cứ lúc nào.
          </p>
          <div className="space-y-2">
            <Link href="/profile" className="btn-ghost block text-center">→ Xem & sửa hồ sơ cá nhân</Link>
            <Link href="/profile" className="btn-ghost block text-center">→ Tải dữ liệu của tôi (export JSON)</Link>
            <Link href="/profile" className="btn-ghost block text-center text-red-600 border-red-300">→ Yêu cầu xoá tài khoản</Link>
          </div>
        </div>

        {/* Account */}
        <div className="card mb-4">
          <h3 className="font-bold mb-4">🔧 Tài khoản</h3>
          
          <div className="py-3 border-b border-slate-200">
            <div className="font-semibold text-sm">Email</div>
            <div className="text-sm text-slate-600 mt-1">{profile.id ? "đã đăng nhập" : ""}</div>
          </div>

          <div className="py-3 border-b border-slate-200">
            <div className="font-semibold text-sm mb-2">Đổi mật khẩu</div>
            <button onClick={changePassword} className="btn-ghost text-sm">🔑 Đổi mật khẩu</button>
          </div>

          <div className="py-3">
            <div className="font-semibold text-sm mb-2">Đăng xuất</div>
            <button onClick={async () => { await supabase.auth.signOut(); router.push("/"); }} className="btn-ghost text-sm">→ Đăng xuất</button>
          </div>
        </div>

        {/* About */}
        <div className="card text-center text-xs text-slate-500">
          GMHS Elite 2026 v1.0 • Build {new Date().toISOString().slice(0, 10)} • Tool ôn luyện nội bộ khoa GMHS
        </div>
      </main>
    </div>
  );
}

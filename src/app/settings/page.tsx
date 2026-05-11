"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [notifEmail, setNotifEmail] = useState(false);
  const [notifWeekly, setNotifWeekly] = useState(true);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
    setFontSize(localStorage.getItem("fontSize") || "medium");
    setNotifEmail(localStorage.getItem("notifEmail") === "true");
    setNotifWeekly(localStorage.getItem("notifWeekly") !== "false");
    if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  function applyTheme(t: string) {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.body.classList.toggle("dark", t === "dark");
  }
  function applyFont(f: string) {
    setFontSize(f);
    localStorage.setItem("fontSize", f);
    document.body.style.fontSize = f === "small" ? "13px" : f === "large" ? "16px" : "14px";
  }

  async function changePassword() {
    const np = prompt("Nhập mật khẩu mới (≥6 ký tự):");
    if (!np || np.length < 6) return;
    const { error } = await supabase.auth.updateUser({ password: np });
    alert(error ? "Lỗi: " + error.message : "✓ Đã đổi mật khẩu");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">⚙️ Cài đặt</h1>

        <div className="card mb-4">
          <h3 className="font-bold mb-4">🎨 Giao diện</h3>
          <div className="py-3 border-b border-slate-200">
            <div className="font-semibold text-sm mb-2">Chế độ màu</div>
            <div className="flex gap-2">
              {["light", "dark"].map((t) => (
                <button key={t} onClick={() => applyTheme(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme === t ? "bg-primary text-white" : "bg-slate-100"}`}>
                  {t === "light" ? "☀️ Sáng" : "🌙 Tối"}
                </button>
              ))}
            </div>
          </div>
          <div className="py-3">
            <div className="font-semibold text-sm mb-2">Cỡ chữ</div>
            <div className="flex gap-2">
              {[["small", "Nhỏ"], ["medium", "Vừa"], ["large", "Lớn"]].map(([k, l]) => (
                <button key={k} onClick={() => applyFont(k)} className={`px-4 py-2 rounded-lg text-sm ${fontSize === k ? "bg-primary text-white" : "bg-slate-100"}`}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <h3 className="font-bold mb-4">🔔 Thông báo</h3>
          {[
            { key: "notifEmail", label: "Nhận email tóm tắt tuần", val: notifEmail, set: (v: boolean) => { setNotifEmail(v); localStorage.setItem("notifEmail", String(v)); } },
            { key: "notifWeekly", label: "Nhắc Weekly Mini-test (Chủ nhật)", val: notifWeekly, set: (v: boolean) => { setNotifWeekly(v); localStorage.setItem("notifWeekly", String(v)); } },
          ].map((t) => (
            <label key={t.key} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0 cursor-pointer">
              <span className="text-sm">{t.label}</span>
              <input type="checkbox" checked={t.val} onChange={(e) => t.set(e.target.checked)} className="w-5 h-5" />
            </label>
          ))}
        </div>

        <div className="card mb-4">
          <h3 className="font-bold mb-4">🔒 Quyền riêng tư (NĐ 13/2023)</h3>
          <p className="text-sm text-slate-600 mb-4">Bạn có quyền xem, sửa, hoặc yêu cầu xoá dữ liệu cá nhân bất cứ lúc nào.</p>
          <div className="space-y-2">
            <Link href="/profile" className="btn-ghost block text-center">→ Xem & sửa hồ sơ cá nhân</Link>
            <Link href="/profile" className="btn-ghost block text-center">→ Tải dữ liệu của tôi</Link>
            <Link href="/profile" className="btn-ghost block text-center text-red-600 border-red-300">→ Yêu cầu xoá tài khoản</Link>
          </div>
        </div>

        <div className="card mb-4">
          <h3 className="font-bold mb-4">🔧 Tài khoản</h3>
          <button onClick={changePassword} className="btn-ghost block w-full text-center mb-2">🔑 Đổi mật khẩu</button>
          <button onClick={logout} className="btn-ghost block w-full text-center">→ Đăng xuất</button>
        </div>

        <div className="card text-center text-xs text-slate-500">
          GMHS Elite 2026 v1.0 • Tool ôn luyện nội bộ khoa GMHS
        </div>
      </main>
    </div>
  );
}

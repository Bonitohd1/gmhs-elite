"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function AdminAnnouncementsPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data: { user } }) => { if (user) supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data)); }); }, []);
  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">📢 Quản lý Thông báo</h1>
        <div className="card mb-4">
          <h3 className="font-bold mb-3">✍️ Soạn thông báo mới</h3>
          <input className="input mb-3" placeholder="Tiêu đề" />
          <textarea className="input mb-3" rows={6} placeholder="Nội dung..."></textarea>
          <div className="flex gap-2 mb-3">
            <button className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100">📄 Thường</button>
            <button className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">⚡ Quan trọng</button>
          </div>
          <button className="btn-primary w-full">📤 Đăng tới toàn khoa</button>
        </div>
      </main>
    </div>
  );
}

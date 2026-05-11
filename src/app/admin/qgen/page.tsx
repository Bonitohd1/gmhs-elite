"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function QGenPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data: { user } }) => { if (user) supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data)); }); }, []);
  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">🤖 AI Question Generator</h1>
        <div className="card">
          <p className="text-slate-600 mb-4">PRD §6.2: AI sinh câu hỏi từ tài liệu nguồn → đẩy vào hàng đợi pending review để chuyên gia GMHS duyệt 2 cấp.</p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg text-sm">
            ⚠ Tính năng này cần kết nối Claude API. Sẽ active ở Phase 2 production.
          </div>
        </div>
      </main>
    </div>
  );
}

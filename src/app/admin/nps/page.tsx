"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function NPSPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data: { user } }) => { if (user) supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data)); }); }, []);
  const nps = 56;
  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">💚 NPS Dashboard</h1>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center">
          <div className="text-sm opacity-95 font-bold uppercase">Net Promoter Score</div>
          <div className="text-7xl font-black my-2">+{nps}</div>
          <div className="text-sm opacity-95">{nps >= 40 ? "✓ Đạt mục tiêu PRD (≥40)" : "Cần cải thiện"} • 50 phản hồi</div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="card text-center border-t-4 border-green-500"><div className="font-bold">😍 PROMOTERS</div><div className="text-3xl font-bold text-green-600 mt-1">68%</div></div>
          <div className="card text-center border-t-4 border-amber-500"><div className="font-bold">😐 PASSIVES</div><div className="text-3xl font-bold text-amber-600 mt-1">20%</div></div>
          <div className="card text-center border-t-4 border-red-500"><div className="font-bold">😞 DETRACTORS</div><div className="text-3xl font-bold text-red-600 mt-1">12%</div></div>
        </div>
      </main>
    </div>
  );
}

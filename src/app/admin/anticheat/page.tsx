"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const FLAGS = [
  { time: "10/05 14:23", user: "U008", flag: "speed", detail: "Trả lời 5 câu trong 8s", severity: "high" },
  { time: "09/05 22:15", user: "U010", flag: "device", detail: "Cùng device fingerprint với U008", severity: "high" },
  { time: "08/05 16:48", user: "U006", flag: "ip", detail: "Cùng IP với U010, U008", severity: "medium" },
];

export default function AntiCheatPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data: { user } }) => { if (user) supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data)); }); }, []);
  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">🛡️ Phát hiện gian lận</h1>
        <div className="card">
          <h3 className="font-bold mb-4">Cờ phát hiện ({FLAGS.length})</h3>
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50 text-left"><th className="p-3">Thời gian</th><th className="p-3">User</th><th className="p-3">Loại</th><th className="p-3">Chi tiết</th><th className="p-3">Mức</th></tr></thead>
            <tbody>{FLAGS.map((f, i) => (
              <tr key={i} className="border-t border-slate-200">
                <td className="p-3 font-mono text-xs">{f.time}</td>
                <td className="p-3 font-bold">{f.user}</td>
                <td className="p-3">{f.flag}</td>
                <td className="p-3 text-xs">{f.detail}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs ${f.severity === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{f.severity === "high" ? "Cao" : "TB"}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

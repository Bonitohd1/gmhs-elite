import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CompliancePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: users } = await supabase.from("profiles").select("*").limit(12);
  const { data: starSkills } = await supabase.from("skills").select("*").eq("tt32_tag", "*");

  function statusOf(uLevel: string): "allow" | "partial" | "deny" {
    if (uLevel === "secondary" || uLevel === "college") return "deny";
    if (uLevel === "university+") return "allow";
    return "partial";
  }
  const cellColor = { allow: "bg-green-200 text-green-800", partial: "bg-amber-200 text-amber-800", deny: "bg-red-200 text-red-800" };

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">⚖️ TT32 Compliance Dashboard</h1>

        <div className="card overflow-x-auto">
          <h3 className="font-bold mb-4">Heatmap thẩm quyền (Nhân sự × Kỹ thuật *)</h3>
          <table className="text-xs border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="bg-slate-700 text-white p-2 sticky left-0">Nhân sự</th>
                {starSkills?.map((s) => <th key={s.id} className="bg-slate-700 text-white p-2 border-l border-slate-600 min-w-[80px]" title={s.name}>{s.id}</th>)}
              </tr>
            </thead>
            <tbody>
              {users?.map((u) => (
                <tr key={u.id} className="border-t border-slate-300">
                  <td className="bg-slate-50 p-2 font-semibold sticky left-0">{u.display_name}</td>
                  {starSkills?.map((s) => {
                    const st = statusOf(u.level);
                    return <td key={s.id} className={`text-center p-2 border-l border-slate-300 font-bold ${cellColor[st]}`}>{st === "allow" ? "✓" : st === "partial" ? "~" : "✗"}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-3 text-xs mt-3">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-200 inline-block"></span> Đủ thẩm quyền</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-200 inline-block"></span> Cần đào tạo bổ sung</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-200 inline-block"></span> Không đủ thẩm quyền</span>
          </div>
        </div>
      </main>
    </div>
  );
}

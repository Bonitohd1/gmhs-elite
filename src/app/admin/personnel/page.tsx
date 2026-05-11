import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminPersonnelPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: users } = await supabase.from("profiles").select("*").order("total_xp", { ascending: false });

  const levelLabels: Record<string, string> = { secondary: "TC", college: "CĐ", university: "ĐH", "university+": "ĐH+CK" };
  const stats = {
    total: users?.length || 0,
    sec: users?.filter(u => u.level === "secondary").length || 0,
    col: users?.filter(u => u.level === "college").length || 0,
    uni: users?.filter(u => u.level === "university").length || 0,
    ck: users?.filter(u => u.level === "university+").length || 0,
  };

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">👥 Quản lý nhân sự</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="card text-center"><div className="text-xs text-slate-500">Tổng</div><div className="text-2xl font-bold">{stats.total}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">TC</div><div className="text-2xl font-bold">{stats.sec}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">CĐ</div><div className="text-2xl font-bold">{stats.col}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">ĐH</div><div className="text-2xl font-bold">{stats.uni}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">ĐH+CK</div><div className="text-2xl font-bold text-purple-600">{stats.ck}</div></div>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="p-3">Tên</th>
                <th className="p-3">Cấp</th>
                <th className="p-3">XP</th>
                <th className="p-3">Streak</th>
                <th className="p-3">Đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u) => (
                <tr key={u.id} className="border-t border-slate-200">
                  <td className="p-3 font-semibold">{u.display_name}</td>
                  <td className="p-3"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{levelLabels[u.level] || u.level}</span></td>
                  <td className="p-3 text-amber-600 font-bold">{u.total_xp.toLocaleString("vi-VN")}</td>
                  <td className="p-3">🔥 {u.streak}</td>
                  <td className="p-3 text-xs text-slate-500">{new Date(u.created_at).toLocaleDateString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminQuestionsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: questions } = await supabase.from("questions").select("*").limit(50).order("id");

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold">📝 Ngân hàng câu hỏi</h1>
          <button className="btn-primary">+ Thêm câu hỏi mới</button>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="p-3">ID</th>
                <th className="p-3">Câu hỏi</th>
                <th className="p-3">Skill</th>
                <th className="p-3">Độ</th>
                <th className="p-3">TT32</th>
                <th className="p-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {questions?.map((q) => (
                <tr key={q.id} className="border-t border-slate-200">
                  <td className="p-3 font-mono text-xs">{q.id}</td>
                  <td className="p-3 max-w-md">{q.question.length > 90 ? q.question.substring(0, 90) + "…" : q.question}</td>
                  <td className="p-3 font-mono text-xs">{q.skill_id}</td>
                  <td className="p-3 text-center">Lv{q.difficulty}</td>
                  <td className="p-3">
                    {q.tt32_tag === "+" ? <span className="bg-red-100 text-red-700 px-2 rounded text-xs">+</span> :
                     q.tt32_tag === "*" ? <span className="bg-amber-100 text-amber-700 px-2 rounded text-xs">*</span> : "—"}
                  </td>
                  <td className="p-3"><span className="bg-green-100 text-green-700 px-2 rounded text-xs">✓ {q.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center text-sm text-slate-500 mt-4">Hiển thị 50/{questions?.length || 0} câu đầu</div>
        </div>
      </main>
    </div>
  );
}

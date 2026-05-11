import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';


export default async function ScenariosListPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: scenarios } = await supabase.from("scenarios").select("*").order("id");
  const { data: myAttempts } = await supabase.from("scenario_attempts").select("scenario_id, total_points").eq("user_id", user!.id);

  const completedIds = new Set((myAttempts || []).map((a) => a.scenario_id));

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🏥 Tình huống lâm sàng</h1>
          <p className="text-slate-600">Học qua case thực tế với nhánh quyết định. Mỗi lựa chọn có hậu quả.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {(scenarios || []).map((s) => (
            <Link key={s.id} href={`/scenarios/${s.id}`} className="card hover:shadow-lg transition cursor-pointer">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">🏥</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight">{s.title}</h3>
                  <div className="flex gap-2 mt-2 text-xs">
                    {s.tt32_tag === "+" && <span className="bg-red-100 text-red-700 px-2 rounded">⚡ Cấp cứu</span>}
                    {s.tt32_tag === "*" && <span className="bg-amber-100 text-amber-700 px-2 rounded">⭐ Chuyên khoa</span>}
                    <span className="bg-slate-100 px-2 rounded">{(s.steps as any[]).length} bước</span>
                    {completedIds.has(s.id) && <span className="bg-green-100 text-green-700 px-2 rounded">✓ Đã làm</span>}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{s.intro.length > 200 ? s.intro.substring(0, 200) + "…" : s.intro}</p>
            </Link>
          ))}
        </div>

        <div className="card mt-6 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <b>Cách tính điểm:</b> Mỗi lựa chọn đúng +15 đến +20 điểm. Lựa chọn sai nguy hiểm có thể -25 đến -30. Cuối tình huống nhận XP = max(20, điểm × 2).
          </p>
        </div>
      </main>
    </div>
  );
}

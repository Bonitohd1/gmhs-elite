import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export const dynamic = 'force-dynamic';


export default async function LibraryPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: docs } = await supabase.from("documents").select("*").order("id");

  // Group by category
  const byCategory: Record<string, any[]> = {};
  (docs || []).forEach((d) => {
    if (!byCategory[d.category]) byCategory[d.category] = [];
    byCategory[d.category].push(d);
  });

  const categoryNames: Record<string, string> = {
    "01_Van_Ban_Phap_Quy": "📜 Văn bản pháp quy",
    "02_Quy_Trinh_Ky_Thuat": "🔧 Quy trình kỹ thuật",
    "03_Quy_Trinh_Cham_Soc": "💚 Quy trình chăm sóc",
    "04_Bang_Kiem_Danh_Gia": "✅ Bảng kiểm đánh giá",
    "05_Tai_Lieu_Dao_Tao": "🎓 Tài liệu đào tạo",
  };

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">📚 Thư viện 31 tài liệu nguồn</h1>
          <p className="text-slate-600">Tra cứu Thông tư, Quy trình, Bảng kiểm chuẩn của khoa GMHS</p>
        </div>

        {Object.entries(categoryNames).map(([catKey, catLabel]) => (
          <div key={catKey} className="mb-6">
            <h2 className="text-lg font-bold mb-3">{catLabel} ({byCategory[catKey]?.length || 0})</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {(byCategory[catKey] || []).map((d) => (
                <Link key={d.id} href={`/library/${d.id}`} className="card hover:shadow-lg transition flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary grid place-items-center font-bold text-xs flex-shrink-0">
                    {d.format?.toUpperCase().slice(0, 3) || "DOC"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm leading-snug mb-1">{d.title}</div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-slate-400">{d.id}</span>
                      {d.tt32_tag === "+" && <span className="bg-red-100 text-red-700 px-2 rounded">⚡ Cấp cứu</span>}
                      {d.tt32_tag === "*" && <span className="bg-amber-100 text-amber-700 px-2 rounded">⭐ Chuyên khoa</span>}
                      {d.priority === "P0" && <span className="bg-green-100 text-green-700 px-2 rounded">P0</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: attempts } = await supabase.from("attempts").select("is_correct").eq("user_id", user!.id);

  const total = attempts?.length || 0;
  const correct = attempts?.filter(a => a.is_correct).length || 0;
  const accuracy = total > 0 ? Math.round(correct / total * 100) : 0;

  const patterns = [
    { pattern: "Liều thuốc cấp cứu", desc: "Hay nhầm liều adrenalin TM vs IM trong phản vệ.", count: 5, severity: "high" },
    { pattern: "Phân biệt nhịp tim", desc: "Nhầm chỉ định sốc điện - vô tâm thu KHÔNG sốc điện.", count: 4, severity: "high" },
    { pattern: "Quy trình 5 đúng truyền máu", desc: "Bỏ sót đối chiếu nhóm máu/người bệnh.", count: 3, severity: "medium" },
  ];

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🧠 AI Insights — Phân tích lỗi sai</h1>
          <p className="text-slate-600">AI phân tích pattern lỗi sai trong 30 ngày và đề xuất lộ trình ôn luyện.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="card text-center"><div className="text-xs text-slate-500">Tổng câu</div><div className="text-2xl font-bold">{total}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Tỷ lệ đúng</div><div className="text-2xl font-bold text-green-600">{accuracy}%</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Pattern lỗi</div><div className="text-2xl font-bold text-amber-600">{patterns.length}</div></div>
          <div className="card text-center"><div className="text-xs text-slate-500">Vi phạm TT32</div><div className="text-2xl font-bold text-green-600">0</div></div>
        </div>

        <div className="card">
          <h3 className="font-bold text-lg mb-4">🔍 Pattern lỗi sai (AI nhận diện)</h3>
          <div className="space-y-3">
            {patterns.map((p) => {
              const color = p.severity === "high" ? "border-red-500" : p.severity === "medium" ? "border-amber-500" : "border-slate-400";
              return (
                <div key={p.pattern} className={`bg-slate-50 rounded-lg p-4 border-l-4 ${color}`}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="font-bold mb-1">{p.pattern}</div>
                      <p className="text-sm text-slate-600">{p.desc}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{p.count}</div>
                      <div className="text-xs text-slate-500">lần sai</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-primary-50 border-l-4 border-primary p-4 rounded-r-lg mt-6 text-sm text-slate-700">
          🔒 <b>Quyền riêng tư:</b> Phân tích này chỉ hiển thị cho bạn và quản lý trực tiếp. Dữ liệu được dùng để cá nhân hoá lộ trình học, không dùng đánh giá nhân sự chính thức theo TT32.
        </div>
      </main>
    </div>
  );
}

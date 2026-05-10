import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();

  // Today's daily completion
  const today = new Date().toISOString().split("T")[0];
  const { data: todayCompletion } = await supabase
    .from("daily_completions")
    .select("*")
    .eq("user_id", user!.id)
    .eq("completed_date", today)
    .single();

  // Recent attempts
  const { data: recentAttempts } = await supabase
    .from("attempts")
    .select("*")
    .eq("user_id", user!.id)
    .order("taken_at", { ascending: false })
    .limit(10);

  const totalAttempts = recentAttempts?.length || 0;
  const correctAttempts = recentAttempts?.filter((a) => a.is_correct).length || 0;
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary to-cyan-500 text-white rounded-2xl p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-1">Xin chào, {profile?.display_name}!</h1>
          <p className="opacity-90">Hôm nay là {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-semibold">Tổng XP</div>
            <div className="text-3xl font-bold text-primary">{profile?.total_xp || 0}</div>
          </div>
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-semibold">Streak</div>
            <div className="text-3xl font-bold text-orange-500">🔥 {profile?.streak || 0}</div>
          </div>
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-semibold">Daily hôm nay</div>
            <div className="text-3xl font-bold">{todayCompletion ? "✓" : "—"}</div>
          </div>
          <div className="card">
            <div className="text-xs uppercase text-slate-500 font-semibold">Độ chính xác</div>
            <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
          </div>
        </div>

        {/* Daily CTA */}
        {!todayCompletion ? (
          <div className="card bg-gradient-to-r from-amber-50 to-pink-50 border-amber-200 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold mb-1">🎯 Daily Challenge</h2>
                <p className="text-slate-600">5 câu hỏi, 5 phút. Duy trì streak {profile?.streak || 0} ngày của bạn!</p>
              </div>
              <Link href="/daily" className="btn-primary">Bắt đầu →</Link>
            </div>
          </div>
        ) : (
          <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">✓</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Đã hoàn thành Daily Challenge hôm nay!</h2>
                <p className="text-slate-600">
                  Đúng {todayCompletion.questions_correct}/{todayCompletion.questions_total} • +{todayCompletion.xp_earned} XP
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/library" className="card hover:shadow-lg transition cursor-pointer">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-bold text-lg mb-1">Thư viện 31 tài liệu nguồn</h3>
            <p className="text-sm text-slate-600">Tra cứu Thông tư, Quy trình, Bảng kiểm chuẩn của khoa</p>
          </Link>
          <Link href="/profile" className="card hover:shadow-lg transition cursor-pointer">
            <div className="text-3xl mb-2">👤</div>
            <h3 className="font-bold text-lg mb-1">Hồ sơ cá nhân</h3>
            <p className="text-sm text-slate-600">Xem tiến độ học tập + cài đặt quyền riêng tư</p>
          </Link>
        </div>

        {/* Recent activity */}
        {totalAttempts > 0 && (
          <div className="card mt-6">
            <h3 className="font-bold text-lg mb-4">📊 Hoạt động gần đây</h3>
            <div className="space-y-2">
              {recentAttempts?.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                  <span>{a.is_correct ? "✓" : "✗"} Câu {a.question_id}</span>
                  <span className="text-slate-500">{new Date(a.taken_at).toLocaleString("vi-VN")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

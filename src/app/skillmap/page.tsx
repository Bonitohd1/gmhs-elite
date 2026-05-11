import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import SkillRadar from "@/components/SkillRadar";

export const dynamic = 'force-dynamic';

export default async function SkillMapPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: domains } = await supabase.from("skill_domains").select("*").order("id");
  const { data: skills } = await supabase.from("skills").select("*").order("id");
  const { data: attempts } = await supabase.from("attempts").select("question_id, is_correct").eq("user_id", user!.id);
  const { data: questions } = await supabase.from("questions").select("id, skill_id");

  const qToSkill: Record<string, string> = {};
  questions?.forEach((q) => { qToSkill[q.id] = q.skill_id; });

  const skillStats: Record<string, { correct: number; total: number }> = {};
  attempts?.forEach((a) => {
    const skillId = qToSkill[a.question_id];
    if (!skillId) return;
    if (!skillStats[skillId]) skillStats[skillId] = { correct: 0, total: 0 };
    skillStats[skillId].total++;
    if (a.is_correct) skillStats[skillId].correct++;
  });

  const domainStats: Record<string, { correct: number; total: number }> = {};
  skills?.forEach((s) => {
    const ss = skillStats[s.id];
    if (!ss) return;
    if (!domainStats[s.domain_id]) domainStats[s.domain_id] = { correct: 0, total: 0 };
    domainStats[s.domain_id].correct += ss.correct;
    domainStats[s.domain_id].total += ss.total;
  });

  const domainScore = (id: string) => {
    const s = domainStats[id];
    return s && s.total > 0 ? Math.round((s.correct / s.total) * 100) : null;
  };
  const skillScore = (id: string) => {
    const s = skillStats[id];
    return s && s.total > 0 ? Math.round((s.correct / s.total) * 100) : null;
  };

  const radarLabels = (domains || []).map((d) => d.name);
  const radarScores = (domains || []).map((d) => domainScore(d.id));

  // Top 3 weak skills
  const weakSkills = (skills || [])
    .map((s) => ({ ...s, score: skillScore(s.id) }))
    .filter((s) => s.score !== null && s.score < 70)
    .sort((a, b) => (a.score || 0) - (b.score || 0))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🗺️ Skill Map — Bản đồ năng lực</h1>
          <p className="text-slate-600">6 trụ năng lực × 27 kỹ năng. AI gợi ý lộ trình ôn luyện cá nhân hoá theo TT32.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Radar chart */}
          <div className="card">
            <h3 className="font-bold text-lg mb-4">📊 Radar 6 chuyên ngành</h3>
            <div style={{ height: 400 }}>
              <SkillRadar labels={radarLabels} scores={radarScores} />
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">Đường nét đứt vàng = mục tiêu khoa</p>
          </div>

          {/* Skill tree */}
          <div className="card">
            <h3 className="font-bold text-lg mb-4">🌳 Cây kỹ năng</h3>
            <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
              {(domains || []).map((d) => (
                <div key={d.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    <h4 className="font-bold text-sm">{d.name}</h4>
                  </div>
                  <div className="space-y-1 ml-5">
                    {(skills || []).filter((s) => s.domain_id === d.id).map((s) => {
                      const score = skillScore(s.id);
                      return (
                        <div key={s.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded text-xs">
                          <span className="flex-1 truncate">
                            {s.name}
                            {s.tt32_tag === "+" && <span className="ml-1 text-red-600">⚡</span>}
                            {s.tt32_tag === "*" && <span className="ml-1 text-amber-600">⭐</span>}
                          </span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full" style={{ width: `${score || 0}%`, background: d.color }} />
                          </div>
                          <span className="w-10 text-right font-semibold">{score === null ? "—" : score + "%"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI suggestions */}
        <div className="card bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <h3 className="font-bold text-lg mb-4">💡 Gợi ý cá nhân hoá (AI)</h3>
          {weakSkills.length === 0 ? (
            <div className="text-center py-6 text-slate-600">
              <p>📊 Hãy làm thêm Daily/Weekly để AI có dữ liệu phân tích.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-3">
              {weakSkills.map((s, i) => {
                const colors = [
                  "bg-gradient-to-br from-yellow-100 to-amber-200",
                  "bg-gradient-to-br from-blue-100 to-indigo-200",
                  "bg-gradient-to-br from-green-100 to-emerald-200",
                ];
                const icons = ["🎯", "⚡", "🏅"];
                return (
                  <div key={s.id} className={`${colors[i]} rounded-lg p-4`}>
                    <div className="text-2xl mb-2">{icons[i]}</div>
                    <div className="font-bold text-sm mb-1">Ưu tiên {i + 1}</div>
                    <div className="text-xs text-slate-700">
                      {s.name} đạt {s.score}% — {s.score && s.score < 60 ? "cần ôn nghiêm túc" : "có thể cải thiện thêm"}.
                      {s.tt32_tag === "*" && " Đây là kỹ thuật chuyên khoa (*)."}
                      {s.tt32_tag === "+" && " Đây là kỹ thuật cấp cứu (+)."}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";

export const dynamic = 'force-dynamic';


export default async function SkillMapPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: domains } = await supabase.from("skill_domains").select("*").order("id");
  const { data: skills } = await supabase.from("skills").select("*").order("id");
  const { data: attempts } = await supabase.from("attempts").select("question_id, is_correct").eq("user_id", user!.id);
  const { data: questions } = await supabase.from("questions").select("id, skill_id");

  // Map question_id → skill_id
  const qToSkill: Record<string, string> = {};
  questions?.forEach((q) => { qToSkill[q.id] = q.skill_id; });

  // Compute score per skill
  const skillStats: Record<string, { correct: number; total: number }> = {};
  attempts?.forEach((a) => {
    const skillId = qToSkill[a.question_id];
    if (!skillId) return;
    if (!skillStats[skillId]) skillStats[skillId] = { correct: 0, total: 0 };
    skillStats[skillId].total++;
    if (a.is_correct) skillStats[skillId].correct++;
  });

  // Compute score per domain
  const domainScores: Record<string, { correct: number; total: number }> = {};
  skills?.forEach((s) => {
    const stats = skillStats[s.id];
    if (!stats) return;
    if (!domainScores[s.domain_id]) domainScores[s.domain_id] = { correct: 0, total: 0 };
    domainScores[s.domain_id].correct += stats.correct;
    domainScores[s.domain_id].total += stats.total;
  });

  const domainScore = (domainId: string) => {
    const s = domainScores[domainId];
    if (!s || s.total === 0) return null;
    return Math.round((s.correct / s.total) * 100);
  };

  const skillScore = (skillId: string) => {
    const s = skillStats[skillId];
    if (!s || s.total === 0) return null;
    return Math.round((s.correct / s.total) * 100);
  };

  // Find weak skills
  const skillsWithScores = (skills || []).map((s) => ({ ...s, score: skillScore(s.id) ?? -1 }));
  const weakSkills = skillsWithScores.filter((s) => s.score >= 0 && s.score < 70).sort((a, b) => a.score - b.score).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🗺️ Skill Map — Bản đồ năng lực</h1>
          <p className="text-slate-600">6 trụ năng lực × 27 kỹ năng. Cá nhân hoá theo lịch sử trả lời của bạn.</p>
        </div>

        {/* 6 domains radar (simple bar visualization) */}
        <div className="card mb-6">
          <h2 className="font-bold text-lg mb-4">🎯 6 trụ năng lực</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(domains || []).map((d) => {
              const score = domainScore(d.id);
              const display = score === null ? "—" : score + "%";
              const color = score === null ? "#94A3B8" : score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#DC2626";
              return (
                <div key={d.id} className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    <h3 className="font-semibold text-sm flex-1">{d.name}</h3>
                  </div>
                  <div className="text-3xl font-bold" style={{ color }}>{display}</div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                    <div className="h-full transition-all" style={{ width: `${score || 0}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak skills - AI suggestions */}
        {weakSkills.length > 0 && (
          <div className="card mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <h2 className="font-bold text-lg mb-3">💡 Đề xuất cá nhân: tập trung 3 kỹ năng yếu nhất</h2>
            <div className="space-y-3">
              {weakSkills.map((s) => (
                <div key={s.id} className="bg-white rounded-lg p-3 flex items-center gap-3">
                  <div className="text-2xl">📌</div>
                  <div className="flex-1">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Đúng {skillStats[s.id]?.correct || 0}/{skillStats[s.id]?.total || 0} câu
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">{s.score}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed skills by domain */}
        <div className="card">
          <h2 className="font-bold text-lg mb-4">📋 Chi tiết 27 kỹ năng</h2>
          <div className="space-y-4">
            {(domains || []).map((d) => (
              <div key={d.id}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <h3 className="font-semibold text-sm">{d.name}</h3>
                </div>
                <div className="space-y-1">
                  {(skills || []).filter((s) => s.domain_id === d.id).map((s) => {
                    const score = skillScore(s.id);
                    const display = score === null ? "—" : score + "%";
                    return (
                      <div key={s.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded text-sm">
                        <span className="flex-1">
                          {s.name}
                          {s.tt32_tag === "+" && <span className="ml-1 text-red-600">⚡</span>}
                          {s.tt32_tag === "*" && <span className="ml-1 text-amber-600">⭐</span>}
                        </span>
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: `${score || 0}%`, background: d.color }} />
                        </div>
                        <span className="w-12 text-right font-semibold text-xs">{display}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {(attempts?.length || 0) === 0 && (
          <div className="card mt-6 text-center bg-blue-50 border-blue-200">
            <p className="text-blue-800">📊 Chưa có dữ liệu. Hãy làm <b>Daily Challenge</b> để bắt đầu xây dựng Skill Map của bạn!</p>
          </div>
        )}
      </main>
    </div>
  );
}

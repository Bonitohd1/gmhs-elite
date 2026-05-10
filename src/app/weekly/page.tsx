"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

function getWeekId(d = new Date()) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  const w = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  return `${date.getFullYear()}-W${String(w).padStart(2, "0")}`;
}

export default function WeeklyPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [loading, setLoading] = useState(true);
  const [thisWeekDone, setThisWeekDone] = useState(false);
  const [thisWeekResult, setThisWeekResult] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { loadData(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }
    const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(prof);
    
    const weekId = getWeekId();
    const { data: existing } = await supabase
      .from("weekly_attempts")
      .select("*")
      .eq("user_id", user.id)
      .eq("week_id", weekId)
      .single();
    
    if (existing) {
      setThisWeekDone(true);
      setThisWeekResult(existing);
    }
    setLoading(false);
  }

  async function handleStart() {
    const { data: qs } = await supabase
      .from("questions")
      .select("*")
      .eq("status", "approved")
      .limit(50);
    if (!qs || qs.length < 15) {
      alert("Không đủ câu hỏi. Vui lòng liên hệ admin.");
      return;
    }
    const shuffled = qs.sort(() => Math.random() - 0.5).slice(0, 15);
    setQuestions(shuffled);
    setStarted(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  async function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setDone(true);
    
    const correct = questions.filter((q, i) => answers[i] === q.correct_index).length;
    const xp = correct >= 12 ? 100 : correct >= 9 ? 60 : 30;
    const weekId = getWeekId();
    const duration = 15 * 60 - timeLeft;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("weekly_attempts").insert({
        user_id: user.id,
        week_id: weekId,
        questions_correct: correct,
        questions_total: questions.length,
        xp_earned: xp,
        duration_seconds: duration,
        started_at: new Date(Date.now() - duration * 1000).toISOString(),
      });
      
      // Insert all attempts
      const attemptsData = questions.map((q, i) => ({
        user_id: user.id,
        question_id: q.id,
        answer_index: answers[i] ?? -1,
        is_correct: answers[i] === q.correct_index,
        context: "weekly",
      }));
      await supabase.from("attempts").insert(attemptsData);
      
      await supabase.from("profiles").update({
        total_xp: (profile.total_xp || 0) + xp,
      }).eq("id", user.id);
    }
    
    setThisWeekResult({ questions_correct: correct, questions_total: questions.length, xp_earned: xp });
    setThisWeekDone(true);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  if (thisWeekDone && !done) {
    return (
      <div className="min-h-screen">
        <Topbar profile={profile} />
        <main className="max-w-2xl mx-auto p-4 sm:p-8">
          <div className="card text-center">
            <div className="text-5xl mb-4">📝</div>
            <h1 className="text-2xl font-bold mb-2">Đã hoàn thành Weekly tuần này</h1>
            <p className="text-slate-600 mb-4">Đúng {thisWeekResult.questions_correct}/{thisWeekResult.questions_total} câu • +{thisWeekResult.xp_earned} XP</p>
            <p className="text-sm text-slate-500 mb-6">Bài Weekly mới sẽ mở vào Chủ nhật tuần tới.</p>
            <Link href="/dashboard" className="btn-primary">Về Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  if (done) {
    const correct = questions.filter((q, i) => answers[i] === q.correct_index).length;
    const score = Math.round((correct / questions.length) * 100);
    return (
      <div className="min-h-screen">
        <Topbar profile={profile} />
        <main className="max-w-2xl mx-auto p-4 sm:p-8">
          <div className="card text-center">
            <div className="text-6xl mb-4">{score >= 80 ? "🥇" : score >= 60 ? "🥈" : "🥉"}</div>
            <h1 className="text-2xl font-bold mb-2">Hoàn thành Weekly!</h1>
            <div className="grid grid-cols-3 gap-3 mb-6 mt-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">ĐIỂM</div>
                <div className="text-2xl font-bold">{score}%</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">ĐÚNG</div>
                <div className="text-2xl font-bold">{correct}/15</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">XP</div>
                <div className="text-2xl font-bold text-amber-600">+{thisWeekResult?.xp_earned}</div>
              </div>
            </div>
            <Link href="/dashboard" className="btn-primary">Về Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen">
        <Topbar profile={profile} />
        <main className="max-w-2xl mx-auto p-4 sm:p-8">
          <div className="card text-center">
            <div className="text-5xl mb-4">📝</div>
            <h1 className="text-2xl font-bold mb-2">Weekly Mini-test</h1>
            <p className="text-slate-600 mb-6">Bài kiểm tra hàng tuần — 15 câu hỏi, thời gian 15 phút.</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">SỐ CÂU</div>
                <div className="text-2xl font-bold">15</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">THỜI GIAN</div>
                <div className="text-2xl font-bold">15:00</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">XP</div>
                <div className="text-2xl font-bold text-amber-600">100</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4">⚠ Khi bắt đầu, đếm ngược không tạm dừng. 1 lần/tuần.</p>
            <button onClick={handleStart} className="btn-primary w-full">🚀 Bắt đầu</button>
          </div>
        </main>
      </div>
    );
  }

  // Test in progress
  const q = questions[currentIdx];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerCls = timeLeft < 60 ? "bg-red-100 text-red-700 animate-pulse" : "bg-amber-100 text-amber-700";

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-2xl mx-auto p-4 sm:p-8">
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="font-semibold">Câu {currentIdx + 1}/{questions.length}</span>
          <span className={`px-3 py-1 rounded-full font-bold font-mono ${timerCls}`}>⏱ {minutes}:{String(seconds).padStart(2, "0")}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-to-r from-primary to-cyan-500" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">{q.question}</h2>
          <div className="space-y-2">
            {q.options.map((opt: string, idx: number) => {
              const isSelected = answers[currentIdx] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [currentIdx]: idx })}
                  className={`w-full text-left p-3 border-2 rounded-lg transition ${isSelected ? "border-primary bg-primary-50 font-semibold" : "border-slate-300 hover:border-primary"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between mt-6 gap-2">
            <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0} className="btn-ghost">← Trước</button>
            {currentIdx < questions.length - 1 ? (
              <button onClick={() => setCurrentIdx(currentIdx + 1)} className="btn-primary">Tiếp →</button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary bg-gradient-to-r from-green-500 to-emerald-500">Nộp bài 📤</button>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`p-2 rounded text-xs font-bold ${
                i === currentIdx ? "bg-primary text-white" :
                answers[i] !== undefined ? "bg-green-100 text-green-700" : "bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

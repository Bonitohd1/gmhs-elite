"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";
import { CardSkeleton } from "@/components/Skeleton";
import QuestionFlagButton from "@/components/QuestionFlagButton";

interface Question {
  id: string;
  skill_id: string;
  difficulty: number;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  tt32_tag: string;
}

export default function DailyPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }
    
    const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(prof);

    // Check if already completed today
    const today = new Date().toISOString().split("T")[0];
    const { data: completion } = await supabase
      .from("daily_completions")
      .select("*")
      .eq("user_id", user.id)
      .eq("completed_date", today)
      .single();
    
    if (completion) {
      setAlreadyCompleted(true);
      setLoading(false);
      return;
    }

    // Load 5 random questions
    const { data: qs } = await supabase
      .from("questions")
      .select("*")
      .eq("status", "approved")
      .limit(50);
    
    if (qs && qs.length >= 5) {
      const shuffled = qs.sort(() => Math.random() - 0.5).slice(0, 5);
      setQuestions(shuffled);
    }
    setLoading(false);
  }

  async function handleAnswer(idx: number) {
    if (showFeedback) return;

    // Tiêu 5 energy trước khi cho phép trả lời
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: ok } = await supabase.rpc("consume_energy", { p_user_id: user.id, p_amount: 5 });
      if (ok === false) {
        alert("⚡ Hết năng lượng! Chờ hồi hoặc mua refill trong Shop (100 coins).");
        return;
      }
    }

    setSelectedAnswer(idx);
    setShowFeedback(true);
    const isCorrect = idx === questions[currentIdx].correct_index;
    if (isCorrect) setCorrectCount(c => c + 1);

    // Log attempt
    if (user) {
      await supabase.from("attempts").insert({
        user_id: user.id,
        question_id: questions[currentIdx].id,
        answer_index: idx,
        is_correct: isCorrect,
        context: "daily",
      });
    }
  }

  async function handleNext() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Done — save completion
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const xp = correctCount * 10 + (correctCount === 5 ? 20 : 0);
        const today = new Date().toISOString().split("T")[0];
        // INSERT vào daily_completions - DB trigger sẽ tự update streak + total_xp
        await supabase.from("daily_completions").insert({
          user_id: user.id,
          completed_date: today,
          questions_correct: correctCount,
          questions_total: questions.length,
          xp_earned: xp,
        });
        // Refetch profile để hiện streak + XP mới nhất sau khi trigger chạy
        const { data: updated } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (updated) setProfile(updated);
      }
      setDone(true);
    }
  }

  if (loading) return (
    <div className="min-h-screen">
      <Topbar profile={null} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        <CardSkeleton />
        <div className="mt-4"><CardSkeleton /></div>
      </main>
    </div>
  );

  if (alreadyCompleted) {
    return (
      <div className="min-h-screen">
        <Topbar profile={profile} />
        <main className="lg:ml-60 p-4 sm:p-8">
          <div className="card text-center">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold mb-2">Hoàn thành Daily hôm nay rồi!</h1>
            <p className="text-slate-600 mb-6">Quay lại vào ngày mai để duy trì streak 🔥</p>
            <Link href="/dashboard" className="btn-primary">Về Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  if (done) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="min-h-screen">
        <Topbar profile={profile} />
        <main className="lg:ml-60 p-4 sm:p-8">
          <div className="card text-center">
            <div className="text-6xl mb-4">{score >= 80 ? "🎉" : score >= 60 ? "💪" : "📚"}</div>
            <h1 className="text-2xl font-bold mb-2">{score >= 80 ? "Xuất sắc!" : score >= 60 ? "Khá tốt!" : "Cần ôn lại"}</h1>
            <p className="text-slate-600 mb-6">Đúng {correctCount}/{questions.length} câu</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">ĐIỂM</div>
                <div className="text-2xl font-bold">{score}%</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">XP</div>
                <div className="text-2xl font-bold text-amber-600">+{correctCount * 10 + (correctCount === 5 ? 20 : 0)}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="text-xs text-slate-500">STREAK</div>
                <div className="text-2xl font-bold text-orange-500">🔥 {(profile?.streak || 0) + 1}</div>
              </div>
            </div>
            <Link href="/dashboard" className="btn-primary inline-block">Về Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen">
        <Topbar profile={profile} />
        <main className="lg:ml-60 p-4 sm:p-8">
          <div className="card text-center">
            <p>Không có câu hỏi. Vui lòng liên hệ admin.</p>
          </div>
        </main>
      </div>
    );
  }

  const q = questions[currentIdx];
  const tagColors: Record<string, string> = {
    "+": "bg-red-100 text-red-700",
    "*": "bg-amber-100 text-amber-700",
    "": "bg-slate-100 text-slate-600",
  };
  const tagLabels: Record<string, string> = {
    "+": "⚡ Cấp cứu (+)",
    "*": "⭐ Chuyên khoa (*)",
    "": "Cơ bản",
  };

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-8">
        {/* Progress */}
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="font-semibold">Câu {currentIdx + 1}/{questions.length}</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${tagColors[q.tt32_tag]}`}>{tagLabels[q.tt32_tag]}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-gradient-to-r from-primary to-cyan-500 transition-all" style={{ width: `${((currentIdx + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>

        {/* TT32 warning if user level not enough for (*) */}
        {q.tt32_tag === "*" && profile?.level !== "university" && profile?.level !== "university+" && (
          <div className="bg-gradient-to-r from-red-50 to-amber-50 border-l-4 border-red-500 p-4 rounded-lg mb-4 text-sm">
            <b>⚠ Phạm vi chuyên môn (TT 32/2023):</b> Đây là kỹ thuật chuyên khoa (*). Cấp đào tạo của bạn chưa đủ thẩm quyền xác nhận. Câu hỏi hiển thị để học hỏi.
          </div>
        )}

        {/* Question */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4 leading-relaxed">{q.question}</h2>
          <div className="space-y-2">
            {q.options.map((opt: string, idx: number) => {
              let cls = "w-full text-left p-3 border-2 rounded-lg transition ";
              if (showFeedback) {
                if (idx === q.correct_index) cls += "border-green-500 bg-green-50 font-semibold";
                else if (idx === selectedAnswer) cls += "border-red-500 bg-red-50 font-semibold";
                else cls += "border-slate-200 bg-white opacity-60";
              } else {
                cls += "border-slate-300 bg-white hover:border-primary hover:bg-primary-50 cursor-pointer";
              }
              return (
                <button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback} className={cls}>
                  {opt}
                  {showFeedback && idx === q.correct_index && " ✓"}
                  {showFeedback && idx === selectedAnswer && idx !== q.correct_index && " ✗"}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <>
              <div className={`mt-4 p-4 rounded-lg ${selectedAnswer === q.correct_index ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className="text-sm">
                  <b>{selectedAnswer === q.correct_index ? "✓ Đúng!" : "✗ Chưa đúng."}</b> {q.explanation}
                </p>
              </div>
              <QuestionFlagButton questionId={q.id} />
            </>
          )}

          {showFeedback && (
            <button onClick={handleNext} className="btn-primary mt-4 w-full">
              {currentIdx < questions.length - 1 ? "Câu tiếp →" : "Xem kết quả →"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

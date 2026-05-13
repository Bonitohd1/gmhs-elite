"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";
import { CardSkeleton } from "@/components/Skeleton";

interface Step {
  id: string;
  prompt: string;
  options: { label: string; next: string; points: number; feedback: string }[];
}

export default function ScenarioPlayer() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const scenarioId = params.id as string;
  
  const [profile, setProfile] = useState<any>(null);
  const [scenario, setScenario] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [endingKey, setEndingKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }
    const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(prof);
    const { data: s } = await supabase.from("scenarios").select("*").eq("id", scenarioId).single();
    if (s) {
      setScenario(s);
      const steps = s.steps as Step[];
      setCurrentStep(steps[0]);
    }
    setLoading(false);
  }

  function handleChoice(optIdx: number) {
    if (!currentStep) return;
    setSelectedOption(optIdx);
    const opt = currentStep.options[optIdx];
    setPoints(p => p + opt.points);
    setHistory(h => [...h, { step_id: currentStep.id, label: opt.label, points: opt.points, feedback: opt.feedback }]);
  }

  async function handleNext() {
    if (selectedOption === null || !currentStep || !scenario) return;
    const opt = currentStep.options[selectedOption];
    setSelectedOption(null);
    
    // Find next step or ending
    const steps = scenario.steps as Step[];
    const nextStep = steps.find((s: Step) => s.id === opt.next);
    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      // It's an ending key
      setEndingKey(opt.next);
      setCurrentStep(null);
      // Save attempt
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("scenario_attempts").insert({
          user_id: user.id,
          scenario_id: scenarioId,
          total_points: points + opt.points,
          history: [...history, { step_id: currentStep.id, label: opt.label, points: opt.points, feedback: opt.feedback }],
          ending_key: opt.next,
        });
        const xp = Math.max(20, (points + opt.points) * 2);
        await supabase.from("profiles").update({
          total_xp: (profile.total_xp || 0) + xp,
        }).eq("id", user.id);
      }
    }
  }

  if (loading) return (
    <div className="min-h-screen">
      <Topbar profile={null} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        <CardSkeleton />
      </main>
    </div>
  );
  if (!scenario) return <div className="p-8">Không tìm thấy tình huống.</div>;

  // Ending screen
  if (endingKey) {
    const ending = scenario.endings[endingKey];
    const xp = Math.max(20, points * 2);
    return (
      <div className="min-h-screen">
        <Topbar profile={profile} />
        <main className="lg:ml-60 p-4 sm:p-8">
          <div className="card text-center">
            <div className="text-6xl mb-4">{points >= 40 ? "🎉" : points >= 20 ? "💪" : points >= 0 ? "📚" : "⚠"}</div>
            <h1 className="text-2xl font-bold mb-2">{ending?.title || "Hoàn thành"}</h1>
            <p className="text-slate-600 mb-4">{ending?.msg || ""}</p>
            <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-bold mb-6">
              🏆 Tổng điểm: {points} → +{xp} XP
            </div>
            
            <div className="text-left mt-6 border-t pt-6">
              <h3 className="font-bold mb-3">📋 Lịch sử quyết định</h3>
              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg text-sm">
                    <div className="font-semibold mb-1">Bước {i + 1}: {h.label}</div>
                    <div className={h.points >= 0 ? "text-green-700" : "text-red-700"}>
                      {h.points >= 0 ? "+" : ""}{h.points} điểm — {h.feedback}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Link href="/scenarios" className="btn-primary inline-block mt-6">← Về danh sách</Link>
          </div>
        </main>
      </div>
    );
  }

  // Step view
  if (!currentStep) return null;

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-8">
        <div className="flex justify-between items-center mb-4">
          <Link href="/scenarios" className="btn-ghost text-sm">← Thoát</Link>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
            🏆 Điểm: {points}
          </div>
        </div>

        <div className="card">
          <h1 className="text-xl font-bold mb-3">{scenario.title}</h1>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6 text-sm leading-relaxed">
            {scenario.intro}
          </div>
          
          <h3 className="font-bold mb-3">Bước {history.length + 1}: {currentStep.prompt}</h3>
          
          <div className="space-y-2">
            {currentStep.options.map((opt, idx: number) => {
              let cls = "w-full text-left p-3 border-2 rounded-lg transition ";
              if (selectedOption !== null) {
                if (idx === selectedOption) {
                  cls += opt.points >= 0 ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50";
                } else cls += "border-slate-200 opacity-60";
              } else {
                cls += "border-slate-300 hover:border-primary hover:bg-primary-50 cursor-pointer";
              }
              return (
                <button key={idx} onClick={() => handleChoice(idx)} disabled={selectedOption !== null} className={cls}>
                  {opt.label}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <>
              <div className={`mt-4 p-4 rounded-lg ${currentStep.options[selectedOption].points >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className="text-sm font-semibold">{currentStep.options[selectedOption].feedback}</p>
                <p className="text-xs mt-1">
                  {currentStep.options[selectedOption].points >= 0 ? "+" : ""}{currentStep.options[selectedOption].points} điểm
                </p>
              </div>
              <button onClick={handleNext} className="btn-primary mt-4 w-full">Tiếp →</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

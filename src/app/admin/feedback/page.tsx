"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";
import EmptyState from "@/components/EmptyState";

const REASON_LABELS: Record<string, string> = {
  wrong_answer: "❌ Đáp án sai",
  unclear: "❓ Khó hiểu",
  outdated: "📅 Lỗi thời",
  typo: "✏️ Lỗi chính tả",
  other: "💬 Khác",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "⏳ Chờ xem", color: "bg-amber-100 text-amber-800" },
  reviewing: { label: "👀 Đang xem", color: "bg-blue-100 text-blue-800" },
  accepted: { label: "✓ Chấp nhận", color: "bg-green-100 text-green-800" },
  rejected: { label: "✗ Từ chối", color: "bg-slate-100 text-slate-700" },
};

export default function AdminFeedbackPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
    loadFeedbacks();
  }, [filter]);

  async function loadFeedbacks() {
    setLoading(true);
    let q = supabase
      .from("question_feedback")
      .select("*, questions(id, question, options, correct_index, explanation, skill_id)")
      .order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setFeedbacks(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("question_feedback").update({
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user?.id,
    }).eq("id", id);
    loadFeedbacks();
  }

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-2">🚩 Question Feedback</h1>
        <p className="text-sm text-slate-600 mb-6">Báo cáo từ ĐD về nội dung câu hỏi cần rà soát</p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["pending", "reviewing", "accepted", "rejected", "all"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                filter === s ? "bg-blue-600 text-white" : "bg-white border border-slate-300 hover:bg-slate-50"
              }`}
            >
              {s === "all" ? "Tất cả" : STATUS_LABELS[s]?.label || s}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500">Đang tải...</p>
        ) : feedbacks.length === 0 ? (
          <EmptyState
            icon="🎉"
            title={filter === "pending" ? "Không có báo cáo chờ xử lý" : "Không có báo cáo"}
            description="Ngân hàng câu hỏi đang được rà soát tốt!"
          />
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="card">
                <div className="flex justify-between items-start gap-3 mb-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded ${STATUS_LABELS[fb.status]?.color}`}>
                        {STATUS_LABELS[fb.status]?.label}
                      </span>
                      <span className="text-xs text-slate-500">{new Date(fb.created_at).toLocaleString("vi-VN")}</span>
                      <span className="text-xs font-mono text-slate-400">{fb.question_id}</span>
                    </div>
                    <div className="text-sm font-semibold text-red-700">{REASON_LABELS[fb.reason] || fb.reason}</div>
                  </div>
                </div>

                {fb.questions && (
                  <div className="bg-slate-50 p-3 rounded-lg mb-3">
                    <div className="text-sm font-medium mb-2">{fb.questions.question}</div>
                    <div className="text-xs text-slate-600 space-y-1">
                      {fb.questions.options?.map((opt: string, i: number) => (
                        <div key={i} className={i === fb.questions.correct_index ? "font-bold text-green-700" : ""}>
                          {i === fb.questions.correct_index ? "✓ " : "○ "}{opt}
                        </div>
                      ))}
                    </div>
                    {fb.questions.explanation && (
                      <div className="text-xs text-slate-500 mt-2 italic">→ {fb.questions.explanation}</div>
                    )}
                  </div>
                )}

                {fb.comment && (
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 text-sm">
                    <b>Nhận xét của user:</b> {fb.comment}
                  </div>
                )}

                {fb.status === "pending" && (
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => updateStatus(fb.id, "reviewing")} className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Bắt đầu xem</button>
                    <button onClick={() => updateStatus(fb.id, "accepted")} className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded font-medium">Chấp nhận - sẽ sửa</button>
                    <button onClick={() => updateStatus(fb.id, "rejected")} className="px-3 py-1.5 text-xs bg-slate-600 hover:bg-slate-700 text-white rounded font-medium">Từ chối</button>
                  </div>
                )}
                {fb.status === "reviewing" && (
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => updateStatus(fb.id, "accepted")} className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded font-medium">Chấp nhận</button>
                    <button onClick={() => updateStatus(fb.id, "rejected")} className="px-3 py-1.5 text-xs bg-slate-600 hover:bg-slate-700 text-white rounded font-medium">Từ chối</button>
                    <button onClick={() => updateStatus(fb.id, "pending")} className="px-3 py-1.5 text-xs border border-slate-300 hover:bg-slate-50 rounded font-medium">↩ Để sau</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

interface Props {
  questionId: string;
}

const REASONS = [
  { value: "wrong_answer", label: "❌ Đáp án sai" },
  { value: "unclear", label: "❓ Câu hỏi khó hiểu" },
  { value: "outdated", label: "📅 Thông tin lỗi thời" },
  { value: "typo", label: "✏️ Lỗi chính tả/đánh máy" },
  { value: "other", label: "💬 Khác" },
];

export default function QuestionFlagButton({ questionId }: Props) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("wrong_answer");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setErr(null);
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setErr("Bạn cần đăng nhập");
        return;
      }
      const { error } = await supabase.from("question_feedback").insert({
        user_id: user.id,
        question_id: questionId,
        reason,
        comment: comment.trim() || null,
      });
      if (error) throw error;
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        setDone(false);
        setComment("");
        setReason("wrong_answer");
      }, 1500);
    } catch (e: any) {
      setErr(e.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-slate-400 hover:text-red-600 hover:underline mt-2 inline-flex items-center gap-1"
        title="Báo cáo câu hỏi có vấn đề"
      >
        🚩 Báo cáo câu này
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        {done ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">✓</div>
            <h3 className="font-bold text-lg mb-1">Cảm ơn phản hồi</h3>
            <p className="text-sm text-slate-600">Admin sẽ rà soát câu hỏi này.</p>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-lg mb-1">🚩 Báo cáo câu hỏi</h3>
            <p className="text-xs text-slate-500 mb-4">Câu ID: <code className="font-mono">{questionId}</code></p>

            <label className="block text-sm font-medium mb-2">Lý do:</label>
            <div className="space-y-2 mb-4">
              {REASONS.map((r) => (
                <label key={r.value} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded">
                  <input
                    type="radio"
                    name="reason"
                    value={r.value}
                    checked={reason === r.value}
                    onChange={() => setReason(r.value)}
                  />
                  <span className="text-sm">{r.label}</span>
                </label>
              ))}
            </div>

            <label className="block text-sm font-medium mb-2">Mô tả thêm (tuỳ chọn):</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: theo TT 32/2023 mục B thì đáp án đúng phải là..."
            />
            <p className="text-xs text-slate-400 mt-1">{comment.length}/500</p>

            {err && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded mt-3">{err}</div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 py-2 border border-slate-300 hover:bg-slate-100 rounded-lg text-sm font-medium"
              >
                Huỷ
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white rounded-lg text-sm font-medium"
              >
                {loading ? "Đang gửi..." : "Gửi báo cáo"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

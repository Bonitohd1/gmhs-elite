"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Step = {
  title: string;
  body: string;
  emoji: string;
  cta?: { label: string; href: string };
};

const STEPS: Step[] = [
  {
    emoji: "👋",
    title: "Chào mừng đến với GMHS Elite!",
    body: "Đây là công cụ ôn luyện chuyên môn dành riêng cho ĐD khoa Gây mê Hồi sức. Mục tiêu: nâng cao kiến thức + thực hành lâm sàng theo TT 32/2023/TT-BYT, không phải đánh giá KPI.",
  },
  {
    emoji: "🎯",
    title: "Daily Challenge - 5-10 phút mỗi ngày",
    body: "Mỗi ngày bạn có 1 bộ 10 câu hỏi thích ứng (AI ưu tiên kỹ năng bạn còn yếu). Hoàn thành → nhận XP + giữ chuỗi streak. Mục tiêu nhỏ, đều đặn → hiệu quả lớn.",
    cta: { label: "Thử ngay Daily Challenge", href: "/daily" },
  },
  {
    emoji: "📊",
    title: "Skill Map - bản đồ năng lực 27 kỹ năng",
    body: "Biểu đồ radar hiển thị điểm mạnh/yếu của bạn theo 6 nhóm năng lực ĐD. Sau 1-2 tuần dùng app, hệ thống sẽ vẽ chính xác vùng cần cải thiện.",
    cta: { label: "Xem Skill Map", href: "/skill-map" },
  },
  {
    emoji: "🏥",
    title: "Tình huống lâm sàng (Scenarios)",
    body: "Mô phỏng case thực tế (sốt cao ác tính, phản vệ, CPR, high spinal block...). Bạn ra quyết định từng bước → nhận phản hồi tức thì. Học từ tình huống = nhớ lâu hơn lý thuyết.",
    cta: { label: "Vào Scenarios", href: "/scenarios" },
  },
  {
    emoji: "🔒",
    title: "Quyền riêng tư của bạn",
    body: "Theo NĐ 13/2023: dữ liệu cá nhân được bảo mật. Trưởng khoa CHỈ xem được số liệu tổng hợp ẩn danh (tỷ lệ trung bình của khoa), KHÔNG xem được điểm cá nhân từng người. Sai/đúng của bạn là việc của bạn để cải thiện.",
  },
];

export default function OnboardingTour({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    // Check localStorage to see if user has already seen tour
    if (typeof window === "undefined") return;
    const key = `gmhs_onboarded_${userId}`;
    const done = window.localStorage.getItem(key);
    if (!done) {
      // Delay 600ms to avoid flash on page load
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [userId]);

  function close(complete: boolean) {
    if (typeof window !== "undefined") {
      const key = `gmhs_onboarded_${userId}`;
      window.localStorage.setItem(key, complete ? "completed" : "skipped");
    }
    setOpen(false);
  }

  if (!open) return null;

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) close(false);
      }}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${((stepIdx + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <div className="text-5xl mb-4">{step.emoji}</div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            {step.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
            {step.body}
          </p>

          {step.cta && (
            <Link
              href={step.cta.href}
              onClick={() => close(true)}
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              {step.cta.label} →
            </Link>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === stepIdx
                    ? "w-6 bg-blue-600"
                    : i < stepIdx
                    ? "w-1.5 bg-blue-400"
                    : "w-1.5 bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => close(false)}
              className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Bỏ qua
            </button>
            {stepIdx > 0 && (
              <button
                onClick={() => setStepIdx(stepIdx - 1)}
                className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
              >
                ← Trước
              </button>
            )}
            {!isLast ? (
              <button
                onClick={() => setStepIdx(stepIdx + 1)}
                className="px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Tiếp →
              </button>
            ) : (
              <button
                onClick={() => close(true)}
                className="px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-md"
              >
                Bắt đầu! 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

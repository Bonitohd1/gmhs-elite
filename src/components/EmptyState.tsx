"use client";

import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  variant?: "default" | "compact";
}

export default function EmptyState({
  icon = "🎯",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  variant = "default",
}: EmptyStateProps) {
  const padding = variant === "compact" ? "py-6" : "py-12";
  const iconSize = variant === "compact" ? "text-4xl" : "text-6xl";

  return (
    <div className={`${padding} px-6 text-center`}>
      <div className={`${iconSize} mb-3`}>{icon}</div>
      <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-md mx-auto">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

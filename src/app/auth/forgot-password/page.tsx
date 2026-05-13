"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email.includes("@")) {
      setErr("Email không hợp lệ");
      return;
    }
    setLoading(true);
    const redirectTo = typeof window !== "undefined"
      ? `${window.location.origin}/auth/reset-password`
      : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Kiểm tra email</h1>
          <p className="text-slate-600 mb-6">
            Chúng tôi đã gửi link đặt lại mật khẩu đến <b>{email}</b>.
            Vui lòng kiểm tra hộp thư (cả mục Spam) và bấm vào link để đổi mật khẩu mới.
          </p>
          <Link
            href="/auth/login"
            className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Quay về đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🔑</div>
          <h1 className="text-2xl font-bold text-slate-900">Quên mật khẩu?</h1>
          <p className="text-sm text-slate-600 mt-2">
            Nhập email đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="ban@example.com"
            />
          </div>

          {err && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg font-semibold"
          >
            {loading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

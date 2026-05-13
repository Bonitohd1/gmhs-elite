"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase will set the session automatically from the URL hash
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      else {
        // Wait for onAuthStateChange in case URL hash is still being parsed
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
        });
        setTimeout(() => {
          setReady(true);
          subscription.unsubscribe();
        }, 1500);
      }
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (pwd.length < 6) {
      setErr("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (pwd !== pwd2) {
      setErr("Hai mật khẩu không khớp");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/auth/login?registered=1"), 2000);
  }

  if (done) {
    return (
      <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Đổi mật khẩu thành công</h1>
          <p className="text-slate-600 mb-4">Đang chuyển về trang đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🔐</div>
          <h1 className="text-2xl font-bold text-slate-900">Đặt lại mật khẩu</h1>
          <p className="text-sm text-slate-600 mt-2">
            Nhập mật khẩu mới cho tài khoản của bạn.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu mới</label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tối thiểu 6 ký tự"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          {err && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !ready}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg font-semibold"
          >
            {loading ? "Đang lưu..." : !ready ? "Đang xác thực..." : "Đặt lại mật khẩu"}
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

"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registeredToast, setRegisteredToast] = useState(false);

  useEffect(() => {
    // Show toast if just registered
    if (searchParams.get("registered") === "1") {
      const registeredEmail = searchParams.get("email");
      if (registeredEmail) setEmail(decodeURIComponent(registeredEmail));
      setRegisteredToast(true);
      // Auto-hide toast after 6s
      setTimeout(() => setRegisteredToast(false), 6000);
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (loginError) {
      if (loginError.message === "Invalid login credentials") {
        setError("Email hoặc mật khẩu sai. Vui lòng kiểm tra lại.");
      } else if (loginError.message.includes("Email not confirmed")) {
        setError("Email chưa xác nhận. Vui lòng check email + click link kích hoạt.");
      } else {
        setError(loginError.message);
      }
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      {/* Success toast after registration */}
      {registeredToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-top max-w-md">
          <span className="text-2xl">✓</span>
          <div>
            <div className="font-bold">Đăng ký thành công!</div>
            <div className="text-xs opacity-95">Nhập mật khẩu để đăng nhập vào tài khoản mới.</div>
          </div>
          <button onClick={() => setRegisteredToast(false)} className="ml-2 hover:opacity-70">×</button>
        </div>
      )}

      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🩺</div>
          <h1 className="text-2xl font-bold">Đăng nhập GMHS Elite</h1>
          <p className="text-sm text-slate-500 mt-2">Hệ thống ôn luyện chuyên môn nội bộ khoa GMHS</p>
        </div>
        <form onSubmit={handleLogin} className="card space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              autoFocus
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">
              ⚠ {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <div className="text-center text-xs text-slate-400">— hoặc —</div>
          <button type="button" onClick={handleGoogleLogin} className="btn-ghost w-full">
            🔑 Đăng nhập bằng Google
          </button>
          <p className="text-sm text-center text-slate-600 pt-3 border-t border-slate-200">
            Chưa có tài khoản?{" "}
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
              Đăng ký mới
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <LoginForm />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message === "Invalid login credentials" ? "Email hoặc mật khẩu sai" : error.message);
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🩺</div>
          <h1 className="text-2xl font-bold">Đăng nhập GMHS Elite</h1>
        </div>
        <form onSubmit={handleLogin} className="card space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mật khẩu</label>
            <input type="password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <div className="text-center text-xs text-slate-400">— hoặc —</div>
          <button type="button" onClick={handleGoogleLogin} className="btn-ghost w-full">
            🔑 Đăng nhập bằng Google
          </button>
          <p className="text-sm text-center text-slate-600 pt-3">
            Chưa có tài khoản? <Link href="/auth/signup" className="text-primary font-semibold">Đăng ký</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

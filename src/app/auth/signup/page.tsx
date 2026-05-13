"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [level, setLevel] = useState("college");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success" | "checkemail">("form");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!agree) {
      setError("Vui lòng đồng ý điều khoản sử dụng");
      return;
    }
    setLoading(true);
    
    // Default display name from email if not provided
    const finalName = displayName.trim() || email.split("@")[0];
    
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: finalName, level },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);

    if (signupError) {
      if (signupError.message.includes("already") || signupError.message.includes("registered")) {
        setError("Email này đã được đăng ký. Vui lòng đăng nhập.");
      } else if (signupError.message.includes("password")) {
        setError("Mật khẩu không đủ mạnh (cần ≥ 6 ký tự).");
      } else {
        setError(signupError.message);
      }
      return;
    }

    // Check if has session = email confirm disabled = auto-login
    if (data.session) {
      setStep("success");
      // Auto-redirect to login after 2 seconds (let user see message)
      setTimeout(() => {
        router.push("/auth/login?registered=1&email=" + encodeURIComponent(email));
      }, 1500);
    } else {
      // Email confirmation required
      setStep("checkemail");
    }
  }

  // Success step (auto-redirect)
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md text-center animate-in fade-in zoom-in">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold mb-3 text-green-600">Đăng ký thành công!</h2>
          <p className="text-slate-600 mb-2">Tài khoản <b>{email}</b> đã được tạo.</p>
          <p className="text-sm text-slate-500">Đang chuyển sang trang đăng nhập...</p>
          <div className="mt-6 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-cyan-500 animate-progress" style={{ animation: "progress 1.5s linear" }} />
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes progress { from { width: 0% } to { width: 100% } }
          `}} />
        </div>
      </div>
    );
  }

  // Check email step
  if (step === "checkemail") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold mb-3">Kiểm tra email!</h2>
          <p className="text-slate-600 mb-4">
            Chúng tôi vừa gửi link xác nhận đến <b className="text-primary">{email}</b>.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Click link trong email để kích hoạt tài khoản, sau đó quay lại đây để đăng nhập.
          </p>
          <Link href="/auth/login" className="btn-primary inline-block w-full text-center">
            → Về trang đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  // Form step
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🩺</div>
          <h1 className="text-2xl font-bold">Đăng ký GMHS Elite</h1>
          <p className="text-sm text-slate-500 mt-2">Chỉ cần email + mật khẩu là bắt đầu được</p>
        </div>
        <form onSubmit={handleSignup} className="card space-y-4">
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
            <label className="block text-sm font-semibold mb-1">Mật khẩu (≥ 6 ký tự)</label>
            <input
              type="password"
              required
              minLength={6}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>

          {/* Advanced options - collapsed by default */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-slate-500 hover:text-primary flex items-center gap-1"
          >
            <span>{showAdvanced ? "▼" : "▶"}</span>
            <span>Tuỳ chỉnh thêm (tên hiển thị, cấp đào tạo)</span>
          </button>

          {showAdvanced && (
            <div className="space-y-3 pl-3 border-l-2 border-slate-200">
              <div>
                <label className="block text-xs font-semibold mb-1">Tên hiển thị</label>
                <input
                  type="text"
                  className="input text-sm"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={email ? email.split("@")[0] : "Để trống = dùng email"}
                />
                <p className="text-[10px] text-slate-400 mt-1">Có thể đổi sau trong Hồ sơ</p>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Cấp đào tạo</label>
                <select className="input text-sm" value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option value="secondary">Trung cấp</option>
                  <option value="college">Cao đẳng</option>
                  <option value="university">Đại học</option>
                  <option value="university+">Đại học + Chuyên khoa</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1">Tự khai - không gắn pháp lý</p>
              </div>
            </div>
          )}

          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 w-4 h-4"
            />
            <span>Tôi đồng ý <a href="/terms" target="_blank" className="text-primary underline">Điều khoản sử dụng</a> và <a href="/privacy" target="_blank" className="text-primary underline">Chính sách bảo mật</a> (NĐ 13/2023)</span>
          </label>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">
              ⚠ {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-sm text-center text-slate-600 pt-3 border-t border-slate-200">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

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
  const [displayName, setDisplayName] = useState("");
  const [level, setLevel] = useState("college");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!agree) { setError("Vui lòng đồng ý điều khoản sử dụng"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { display_name: displayName, level }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-bold mb-2">Kiểm tra email!</h2>
          <p className="text-slate-600">Chúng tôi vừa gửi link xác nhận đến <b>{email}</b>. Click vào link để hoàn tất đăng ký.</p>
          <Link href="/auth/login" className="btn-primary inline-block mt-6">Về trang đăng nhập</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🩺</div>
          <h1 className="text-2xl font-bold">Đăng ký GMHS Elite</h1>
          <p className="text-sm text-slate-500 mt-2">Tool ôn luyện nội bộ — chỉ cần email và tên hiển thị</p>
        </div>
        <form onSubmit={handleSignup} className="card space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Tên hiển thị</label>
            <input type="text" required className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="VD: Nguyễn Hà (có thể là nickname)" />
            <p className="text-xs text-slate-500 mt-1">Có thể là tên thật hoặc nickname tuỳ bạn</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mật khẩu (≥ 6 ký tự)</label>
            <input type="password" required minLength={6} className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Cấp đào tạo</label>
            <select className="input" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="secondary">Trung cấp</option>
              <option value="college">Cao đẳng</option>
              <option value="university">Đại học</option>
              <option value="university+">Đại học + Chuyên khoa</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">Tự khai - chỉ để cá nhân hoá bài học, không gắn pháp lý</p>
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
            <span>Tôi đồng ý điều khoản sử dụng và chính sách quyền riêng tư. Dữ liệu chỉ dùng nội bộ khoa.</span>
          </label>
          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
          <p className="text-sm text-center text-slate-600 pt-3">
            Đã có tài khoản? <Link href="/auth/login" className="text-primary font-semibold">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

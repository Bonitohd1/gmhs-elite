"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";
import AvatarUpload from "@/components/AvatarUpload";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ totalAttempts: 0, correctRate: 0, dailyDone: 0 });

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }
    const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(p);
    
    // Stats
    const { data: attempts } = await supabase.from("attempts").select("is_correct").eq("user_id", user.id);
    const total = attempts?.length || 0;
    const correct = attempts?.filter(a => a.is_correct).length || 0;
    const { count } = await supabase.from("daily_completions").select("*", { count: "exact", head: true }).eq("user_id", user.id);
    setStats({ totalAttempts: total, correctRate: total > 0 ? Math.round(correct / total * 100) : 0, dailyDone: count || 0 });
    setLoading(false);
  }

  async function updateProfile(updates: any) {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("profiles").update(updates).eq("id", user!.id);
    setProfile({ ...profile, ...updates });
    setSaving(false);
  }

  async function handleDeleteAccount() {
    if (!confirm("Bạn CHẮC CHẮN muốn xoá tài khoản? Toàn bộ dữ liệu sẽ mất vĩnh viễn.")) return;
    const { data: { user } } = await supabase.auth.getUser();
    // Delete profile cascade
    await supabase.from("profiles").delete().eq("id", user!.id);
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleExportData() {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: attempts } = await supabase.from("attempts").select("*").eq("user_id", user!.id);
    const { data: dailies } = await supabase.from("daily_completions").select("*").eq("user_id", user!.id);
    const exportData = { profile, attempts, dailies, exported_at: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gmhs-export-${user!.id}.json`;
    a.click();
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">👤 Hồ sơ cá nhân</h1>

        {/* Hero */}
        <div className="card bg-gradient-to-r from-primary-50 to-cyan-50 mb-6">
          <div className="flex items-center gap-4">
            <AvatarUpload
              userId={profile.id}
              displayName={profile.display_name}
              currentUrl={profile.avatar_url}
              size={80}
              onUploaded={(url) => setProfile({ ...profile, avatar_url: url })}
            />
            <div>
              <h2 className="text-xl font-bold">{profile.display_name}</h2>
              <div className="text-sm text-slate-600 mt-1">
                {({secondary: "Trung cấp", college: "Cao đẳng", university: "Đại học", "university+": "Đại học + Chuyên khoa"} as Record<string, string>)[profile.level]}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-xs uppercase text-slate-500">XP</div>
            <div className="text-2xl font-bold text-primary">{profile.total_xp}</div>
          </div>
          <div className="card text-center">
            <div className="text-xs uppercase text-slate-500">Streak</div>
            <div className="text-2xl font-bold text-orange-500">🔥 {profile.streak}</div>
          </div>
          <div className="card text-center">
            <div className="text-xs uppercase text-slate-500">Daily đã làm</div>
            <div className="text-2xl font-bold">{stats.dailyDone}</div>
          </div>
          <div className="card text-center">
            <div className="text-xs uppercase text-slate-500">Độ chính xác</div>
            <div className="text-2xl font-bold text-green-600">{stats.correctRate}%</div>
          </div>
        </div>

        {/* Edit profile */}
        <div className="card mb-6">
          <h3 className="font-bold text-lg mb-4">✏️ Chỉnh sửa hồ sơ</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Tên hiển thị</label>
              <input className="input" defaultValue={profile.display_name} onBlur={(e) => updateProfile({ display_name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Cấp đào tạo (tự khai)</label>
              <select className="input" defaultValue={profile.level} onChange={(e) => updateProfile({ level: e.target.value })}>
                <option value="secondary">Trung cấp</option>
                <option value="college">Cao đẳng</option>
                <option value="university">Đại học</option>
                <option value="university+">Đại học + Chuyên khoa</option>
              </select>
            </div>
          </div>
          {saving && <p className="text-xs text-slate-500 mt-2">Đang lưu...</p>}
        </div>

        {/* Privacy */}
        <div className="card mb-6">
          <h3 className="font-bold text-lg mb-4">🔒 Quyền riêng tư (NĐ 13/2023)</h3>
          <label className="flex justify-between items-center py-3 border-b border-slate-200">
            <div>
              <div className="font-semibold text-sm">Hiển thị tên trên Hall of Fame</div>
              <div className="text-xs text-slate-500">Tắt = chỉ hiển thị cấp đào tạo</div>
            </div>
            <input type="checkbox" defaultChecked={profile.show_in_leaderboard} onChange={(e) => updateProfile({ show_in_leaderboard: e.target.checked })} className="w-5 h-5" />
          </label>
          <div className="pt-4 flex gap-2 flex-wrap">
            <button onClick={handleExportData} className="btn-ghost">📥 Tải dữ liệu của tôi (JSON)</button>
            <button onClick={handleDeleteAccount} className="btn-ghost text-red-600 border-red-300 hover:bg-red-50">🗑️ Xoá tài khoản</button>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Theo NĐ 13/2023/NĐ-CP, bạn có quyền xem, mang đi, hoặc yêu cầu xoá toàn bộ dữ liệu cá nhân bất cứ lúc nào.
          </p>
        </div>
      </main>
    </div>
  );
}

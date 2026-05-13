"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";
import {
  exportMonthlyReport,
  exportTT32Report,
  exportPersonalProfile,
} from "@/lib/pdf-export";

export default function AdminReportsPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  async function downloadMonthly() {
    setLoadingId("monthly");
    try {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("display_name, total_xp, streak, last_active_date")
        .order("total_xp", { ascending: false });
      const all = profiles || [];
      const totalUsers = all.length;
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      const activeUsers = all.filter((p) => p.last_active_date && new Date(p.last_active_date) >= monthAgo).length;
      const avgXp = totalUsers > 0 ? all.reduce((s, p) => s + (p.total_xp || 0), 0) / totalUsers : 0;
      const monthLabel = new Date().toISOString().slice(0, 7);
      await exportMonthlyReport({
        totalUsers,
        activeUsers,
        avgXp,
        topPerformers: all.slice(0, 10) as any,
        monthLabel,
      });
    } catch (e: any) {
      alert("Lỗi xuất báo cáo: " + e.message);
    } finally {
      setLoadingId(null);
    }
  }

  async function downloadTT32() {
    setLoadingId("tt32");
    try {
      const { data: questions } = await supabase.from("questions").select("id, tt32_tag");
      const all = questions || [];
      const basicQ = all.filter((q) => !q.tt32_tag).length;
      const emergencyQ = all.filter((q) => q.tt32_tag === "+").length;
      const specialtyQ = all.filter((q) => q.tt32_tag === "*").length;
      await exportTT32Report({
        totalQuestions: all.length,
        basicQ,
        emergencyQ,
        specialtyQ,
        violations: [], // chưa có anti-cheat detection real, để trống
      });
    } catch (e: any) {
      alert("Lỗi xuất báo cáo: " + e.message);
    } finally {
      setLoadingId(null);
    }
  }

  async function downloadProfile() {
    setLoadingId("profile");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      const { data: ub } = await supabase
        .from("user_badges")
        .select("earned_at, badges(name, icon, tier)")
        .eq("user_id", user.id)
        .order("earned_at", { ascending: false });
      const { data: dailies } = await supabase
        .from("daily_completions")
        .select("completed_date, questions_correct, questions_total, xp_earned")
        .eq("user_id", user.id)
        .order("completed_date", { ascending: false })
        .limit(30);

      await exportPersonalProfile({
        user: {
          display_name: p?.display_name || "(unknown)",
          level: p?.level || "college",
          total_xp: p?.total_xp || 0,
          streak: p?.streak || 0,
        },
        badges: (ub || []).map((b: any) => ({
          name: b.badges?.name || "",
          icon: b.badges?.icon || "",
          tier: b.badges?.tier || "bronze",
          earned_at: b.earned_at,
        })),
        recentActivity: (dailies || []).map((d) => ({
          type: "Daily Challenge",
          date: d.completed_date,
          detail: `${d.questions_correct}/${d.questions_total} đúng, +${d.xp_earned} XP`,
        })),
      });
    } catch (e: any) {
      alert("Lỗi xuất báo cáo: " + e.message);
    } finally {
      setLoadingId(null);
    }
  }

  const reports = [
    { id: "monthly", icon: "📊", title: "Báo cáo tiến độ tháng", desc: "Điểm trung bình, tỷ lệ tham gia, top performer của khoa.", onClick: downloadMonthly },
    { id: "tt32", icon: "⚖️", title: "Báo cáo TT 32/2023", desc: "Đối soát phân loại câu hỏi theo phạm vi chuyên môn (+/*).", onClick: downloadTT32 },
    { id: "profile", icon: "🏥", title: "Hồ sơ năng lực cá nhân", desc: "Tải hồ sơ ĐD đang đăng nhập - dùng cho hồ sơ cán bộ định kỳ.", onClick: downloadProfile },
  ];

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-2">📈 Báo cáo</h1>
        <p className="text-sm text-slate-600 mb-6">Xuất PDF chuyên nghiệp dùng cho hồ sơ + báo cáo nội bộ.</p>

        <div className="grid md:grid-cols-3 gap-4">
          {reports.map((r) => (
            <div key={r.id} className="card">
              <div className="text-4xl mb-2">{r.icon}</div>
              <h3 className="font-bold mb-2">{r.title}</h3>
              <p className="text-sm text-slate-600 mb-4 min-h-[40px]">{r.desc}</p>
              <button
                onClick={r.onClick}
                disabled={loadingId === r.id}
                className="btn-primary w-full text-sm"
              >
                {loadingId === r.id ? "⏳ Đang tạo PDF..." : "📥 Tải PDF"}
              </button>
            </div>
          ))}
        </div>

        <div className="card mt-6 bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-900">
            <b>Lưu ý:</b> PDF sinh bằng <code>jsPDF</code> client-side, font Helvetica (không dấu tiếng Việt trong PDF).
            Để có dấu đầy đủ, cần upload font Roboto custom (sẽ làm sau pilot). Hiện tại nội dung Việt sẽ hiển thị không dấu.
          </p>
        </div>
      </main>
    </div>
  );
}

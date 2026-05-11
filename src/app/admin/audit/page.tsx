"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const AUDIT_LOG = [
  { time: "10/05/2026 14:23", actor: "admin@gmhs", action: "APPROVE", target: "Q0142", note: "Phê duyệt câu hỏi sau review" },
  { time: "10/05/2026 14:01", actor: "truong.gmhs", action: "VIEW_REPORT", target: "BC-2026-04", note: "Tải báo cáo tháng 4" },
  { time: "10/05/2026 09:15", actor: "system", action: "SCOPE_CHECK", target: "U003 → S3.4", note: "AI từ chối: ĐD CĐ không đủ thẩm quyền rút NKQ (*)" },
  { time: "09/05/2026 16:48", actor: "admin@gmhs", action: "ADD_QUESTION", target: "Q0150", note: "Thêm câu hỏi mới (status: review)" },
  { time: "09/05/2026 11:32", actor: "editor.b", action: "EDIT_QUESTION", target: "Q0089", note: "Sửa giải thích sau góp ý chuyên môn" },
  { time: "09/05/2026 08:00", actor: "system", action: "BACKUP", target: "DB", note: "Daily backup OK (12.4 GB)" },
];

export default function AuditPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <Link href="/admin" className="btn-ghost text-sm mb-4 inline-block">← Admin</Link>
        <h1 className="text-2xl font-bold mb-6">🔍 Audit Log (NĐ 13/2023)</h1>

        <div className="card mb-4">
          <p className="text-sm text-slate-600">Lưu trữ tối thiểu 12 tháng. Mọi hành động ảnh hưởng dữ liệu cá nhân và pháp lý đều được log.</p>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="p-3">Thời gian</th>
                <th className="p-3">Actor</th>
                <th className="p-3">Hành động</th>
                <th className="p-3">Target</th>
                <th className="p-3">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_LOG.map((a, i) => (
                <tr key={i} className="border-t border-slate-200">
                  <td className="p-3 font-mono text-xs">{a.time}</td>
                  <td className="p-3 font-mono text-xs">{a.actor}</td>
                  <td className="p-3"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold">{a.action}</span></td>
                  <td className="p-3 font-mono text-xs">{a.target}</td>
                  <td className="p-3 text-xs">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

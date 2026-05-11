"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const FAQ = [
  {
    title: "🚀 Bắt đầu", icon: "🚀",
    items: [
      { q: "Tôi đăng nhập lần đầu, nên bắt đầu từ đâu?", a: "Vào Dashboard → click Daily Challenge → làm 5 câu khởi động. Vào Skill Map để xem điểm mạnh/yếu." },
      { q: "Cấp độ và XP hoạt động thế nào?", a: "Mỗi hoạt động cộng XP. 10 cấp từ Tân binh đến Huyền thoại GMHS, mốc XP cố định. Lên cấp mở khoá huy hiệu." },
      { q: "Streak là gì? Mất streak khi nào?", a: "Số ngày liên tục hoàn thành ít nhất 1 Daily. Bỏ 1 ngày = mất streak. Có thể mua 'Bảo vệ Streak' (80 Coin) trong Cửa hàng." },
    ]
  },
  {
    title: "⚖️ Tuân thủ TT 32/2023", icon: "⚖️",
    items: [
      { q: "Kỹ thuật (+) (*) và không dấu khác nhau thế nào?", a: "(+) Sơ cứu, cấp cứu - tất cả cấp được làm. (*) Chuyên khoa - chỉ ĐD ĐH+ có đào tạo bổ sung. Không dấu - cơ bản, tất cả cấp." },
      { q: "Tôi là ĐD Cao đẳng - làm câu hỏi (*) thế nào?", a: "Vẫn được làm để học, nhưng nếu chọn 'thực hiện độc lập', hệ thống ghi nhận vi phạm phạm vi (chỉ giáo dục, không pháp lý)." },
      { q: "AI đối soát phạm vi dựa vào đâu?", a: "Cấp đào tạo + chứng chỉ chuyên khoa + đào tạo bổ sung trong hồ sơ. Mọi quyết định có giải thích kèm điều khoản TT32." },
    ]
  },
  {
    title: "📝 Đánh giá & Thi", icon: "📝",
    items: [
      { q: "Daily Challenge khác Weekly Mini-test ở đâu?", a: "Daily: 5 câu/5 phút mỗi ngày. Weekly: 15 câu/15 phút mỗi Chủ nhật. Monthly: 60 phút/50 câu, đầu tháng." },
      { q: "Tôi có thể làm lại bài đã hoàn thành không?", a: "Daily/Weekly có nút Làm lại. Monthly chỉ làm 1 lần/tháng (do có giám thị)." },
    ]
  },
  {
    title: "🔒 Quyền riêng tư", icon: "🔒",
    items: [
      { q: "Dữ liệu cá nhân của tôi được lưu ở đâu?", a: "Server đặt tại Việt Nam theo NĐ 13/2023. Mã hoá AES-256 at rest, TLS 1.3 in transit." },
      { q: "Tôi có thể yêu cầu xoá dữ liệu không?", a: "Có. Vào Hồ sơ → 'Xoá tài khoản'. Xử lý trong 72 giờ." },
    ]
  },
];

export default function HelpPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">❓ Trợ giúp & FAQ</h1>
          <p className="text-slate-600">Hướng dẫn sử dụng GMHS Elite, giải thích TT32, liên hệ hỗ trợ.</p>
        </div>

        {FAQ.map((group) => (
          <div key={group.title} className="card mb-4">
            <h3 className="font-bold text-lg mb-3">{group.title}</h3>
            {group.items.map((item, i) => {
              const key = `${group.title}-${i}`;
              const isOpen = expanded[key];
              return (
                <div key={key} className="border-t border-slate-200 py-3 cursor-pointer" onClick={() => setExpanded({ ...expanded, [key]: !isOpen })}>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-sm flex-1">{item.q}</div>
                    <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                  </div>
                  {isOpen && <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 leading-relaxed">{item.a}</div>}
                </div>
              );
            })}
          </div>
        ))}

        <div className="card mt-6">
          <h3 className="font-bold text-lg mb-3">📞 Liên hệ hỗ trợ</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Câu hỏi nội dung chuyên môn</h4>
              <div className="font-bold text-primary">📧 chuyenmon.gmhs@bv.local</div>
              <p className="text-xs text-slate-500">Phản hồi trong 48 giờ.</p>
            </div>
            <div>
              <h4 className="font-semibold">Hỗ trợ kỹ thuật</h4>
              <div className="font-bold text-primary">📧 it.support@bv.local</div>
              <p className="text-xs text-slate-500">Trực 24/7 cho ca trực.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

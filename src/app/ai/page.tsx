"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const CANNED: { pattern: RegExp; answer: string; src: string }[] = [
  { pattern: /tt32|thông tư 32|phạm vi/i, src: "VB01, VB02",
    answer: "Theo Thông tư 32/2023/TT-BYT, Phụ lục 12 phân loại kỹ thuật điều dưỡng thành 3 nhóm: (+) sơ cứu/cấp cứu - tất cả cấp được thực hiện và chỉ định; (*) kỹ thuật chuyên khoa - chỉ ĐD trình độ Đại học trở lên có đào tạo bổ sung hoặc có văn bằng chuyên khoa; không dấu - kỹ thuật cơ bản, tất cả cấp được thực hiện." },
  { pattern: /rút.*nkq|rút.*ống/i, src: "KT04, BK03",
    answer: "Quy trình rút ống NKQ là kỹ thuật chuyên khoa (*). Tiêu chuẩn rút: NB tỉnh, hợp tác, phản xạ ho/nuốt tốt, SpO2 ≥ 92% với FiO2 ≤ 40%, thông số khí máu đạt. Trước rút phải hút trên cuff (subglottic) và trong ống. Theo dõi sát ≥ 30-60 phút sau rút - đặc biệt phát hiện stridor (phù thanh quản)." },
  { pattern: /truyền máu|tai biến/i, src: "KT03",
    answer: "Quy trình truyền máu áp dụng nguyên tắc 5 đúng: đúng NB, đúng chế phẩm, đúng nhóm máu, đúng số lượng, đúng thời gian. 15 phút đầu truyền chậm để phát hiện phản ứng. Khi nghi phản ứng cấp: NGỪNG TRUYỀN ngay, giữ đường truyền NaCl 0.9%, báo BS, lưu túi máu+bộ dây 24h. Đây là kỹ thuật (+) cấp cứu - mọi cấp ĐD được thực hiện." },
  { pattern: /vap|thở máy|viêm phổi/i, src: "CS04",
    answer: "Gói VAP bundle phòng viêm phổi liên quan thở máy: nâng đầu giường 30-45°, vệ sinh răng miệng bằng chlorhexidine 0.12-0.2%, đánh giá weaning hàng ngày, dự phòng loét stress, dự phòng huyết khối tĩnh mạch sâu. Áp lực cuff duy trì 20-30 cmH2O. Hút đờm ≤ 10-15s/lần." },
  { pattern: /kiểm soát nhiễm khuẩn|ksnk|3916/i, src: "VB09",
    answer: "QĐ 3916/QĐ-BYT quy định kiểm soát nhiễm khuẩn trong cơ sở KCB. Phòng ngừa chuẩn áp dụng cho mọi NB, mọi tình huống. 5 thời điểm rửa tay theo WHO. Phân loại Spaulding cho dụng cụ: critical (vô khuẩn) → tiệt khuẩn; semi-critical → khử khuẩn mức cao; non-critical → khử khuẩn mức thấp." },
  { pattern: /an toàn phẫu thuật|7482/i, src: "VB10",
    answer: "QĐ 7482/2018 và bộ checklist WHO an toàn phẫu thuật gồm 3 giai đoạn: Sign-In (trước GM) - kiểm tra danh tính/vị trí/đồng thuận/dị ứng/đường thở khó; Time-Out (trước rạch da) - cả kíp xác nhận đúng NB-vị trí-thủ thuật; Sign-Out (sau ca mổ) - tên ca, đếm gạc/kim/dụng cụ, nhãn bệnh phẩm." },
];

const SUGGESTED = [
  "Kỹ thuật (*) trong TT32 là gì?",
  "Quy trình rút NKQ?",
  "Xử trí phản ứng truyền máu cấp?",
  "VAP bundle gồm gì?",
  "Phòng ngừa chuẩn theo QĐ 3916?",
  "Checklist an toàn phẫu thuật?",
];

export default function AIPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string; src?: string }[]>([
    { role: "bot", text: "Xin chào! Tôi là trợ lý AI dựa trên 31 tài liệu nguồn của khoa GMHS. Bạn có câu hỏi gì về quy trình, TT32, hoặc xử trí lâm sàng?" },
  ]);
  const [input, setInput] = useState("");
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  useEffect(() => {
    msgRef.current?.scrollTo(0, msgRef.current.scrollHeight);
  }, [messages]);

  function send(text: string) {
    if (!text.trim()) return;
    const newMsgs = [...messages, { role: "user" as const, text }];
    setMessages(newMsgs);
    setInput("");
    setTimeout(() => {
      const match = CANNED.find((c) => c.pattern.test(text));
      const botReply = match
        ? { role: "bot" as const, text: match.answer, src: match.src }
        : { role: "bot" as const, text: "Tôi chưa có thông tin đủ để trả lời câu hỏi này. Bạn có thể hỏi về TT32, quy trình truyền máu, rút NKQ, VAP, KSNK, hoặc an toàn phẫu thuật." };
      setMessages([...newMsgs, botReply]);
    }, 600);
  }

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🤖 Trợ lý AI</h1>
          <p className="text-slate-600">Hỏi đáp dựa trên 31 tài liệu nguồn. Luôn trích dẫn nguồn, từ chối nếu ngoài phạm vi.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-4">
          <div className="card flex flex-col" style={{ height: 540 }}>
            <div ref={msgRef} className="flex-1 overflow-y-auto space-y-3 pr-2 mb-3">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[80%] px-4 py-3 rounded-2xl ${m.role === "user" ? "ml-auto bg-gradient-to-r from-primary to-cyan-500 text-white" : "bg-slate-100"}`}>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                  {m.src && <div className="text-xs italic opacity-70 mt-2">📖 Nguồn: {m.src}</div>}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-200 pt-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Hỏi về TT32, quy trình, xử trí lâm sàng..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={() => send(input)} className="btn-primary">Gửi</button>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-sm mb-3">💡 Câu hỏi gợi ý</h3>
            <div className="space-y-2">
              {SUGGESTED.map((q) => (
                <button key={q} onClick={() => send(q)} className="w-full text-left p-2 bg-slate-50 hover:bg-primary-50 hover:text-primary border border-slate-200 rounded text-xs">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

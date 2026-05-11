"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

const ITEMS = [
  { id: "avatar_1", icon: "🎨", name: "Skin avatar Vàng", desc: "Khung avatar màu vàng kim trên Hall of Fame", cost: 200, cat: "Trang trí" },
  { id: "avatar_2", icon: "💎", name: "Skin avatar Kim cương", desc: "Khung avatar lấp lánh - exclusive Top 10", cost: 500, cat: "Trang trí" },
  { id: "theme_dark", icon: "🌙", name: "Dark mode", desc: "Mở khoá giao diện tối", cost: 150, cat: "Giao diện" },
  { id: "streak_protect", icon: "🛡️", name: "Bảo vệ Streak", desc: "Giữ chuỗi 1 ngày nếu bỏ lỡ Daily", cost: 80, cat: "Tiện ích" },
  { id: "hint_pack", icon: "💡", name: "Gói gợi ý ×5", desc: "5 lần dùng gợi ý trong Daily/Mini-test", cost: 60, cat: "Tiện ích" },
  { id: "voucher_book", icon: "📚", name: "Voucher mua sách 100K", desc: "Đổi tại nhà sách BV", cost: 1000, cat: "Phần thưởng thực" },
  { id: "voucher_coffee", icon: "☕", name: "Voucher cà phê 50K", desc: "Đổi tại căng tin BV", cost: 300, cat: "Phần thưởng thực" },
  { id: "day_off", icon: "🎟️", name: "Đề cử nghỉ thưởng 1 buổi", desc: "Đề cử với trưởng khoa - cần phê duyệt", cost: 2000, cat: "Phần thưởng thực" },
];

export default function ShopPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [coins, setCoins] = useState(480); // mock initial
  const [owned, setOwned] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
    const sav = localStorage.getItem("gmhs_owned"); if (sav) setOwned(JSON.parse(sav));
    const sc = localStorage.getItem("gmhs_coins"); if (sc) setCoins(parseInt(sc));
  }, []);

  function buy(item: typeof ITEMS[0]) {
    if (coins < item.cost) return;
    const newCoins = coins - item.cost;
    const newOwned = [...owned, item.id];
    setCoins(newCoins);
    setOwned(newOwned);
    localStorage.setItem("gmhs_coins", newCoins.toString());
    localStorage.setItem("gmhs_owned", JSON.stringify(newOwned));
    alert(`✓ Đã đổi: ${item.name}`);
  }

  const cats = ["all", ...Array.from(new Set(ITEMS.map((i) => i.cat)))];
  const filtered = filter === "all" ? ITEMS : ITEMS.filter((i) => i.cat === filter);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">🛍️ Cửa hàng đổi thưởng</h1>
          <p className="text-slate-600">Dùng Coin tích luỹ từ học tập để đổi vật phẩm.</p>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white rounded-2xl p-6 flex justify-between items-center mb-6 shadow-xl">
          <div>
            <div className="text-xs uppercase font-bold opacity-95">Số Coin của bạn</div>
            <div className="text-4xl font-black mt-1">🪙 {coins.toLocaleString("vi-VN")}</div>
          </div>
          <div className="text-right text-sm opacity-95">
            <div className="font-bold mb-2">Cách kiếm Coin:</div>
            <div>• Daily 5/5: +20</div>
            <div>• Weekly hoàn hảo: +60</div>
            <div>• Khoá học hoàn thành: +30</div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${filter === c ? "bg-primary text-white" : "bg-white border border-slate-300"}`}>
              {c === "all" ? "Tất cả" : c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const isOwned = owned.includes(item.id);
            const canAfford = coins >= item.cost;
            return (
              <div key={item.id} className={`card text-center ${isOwned ? "opacity-60" : ""}`}>
                <div className="text-5xl mb-3">{item.icon}</div>
                <div className="text-xs bg-slate-100 inline-block px-2 py-0.5 rounded mb-1">{item.cat}</div>
                <h3 className="font-bold mb-1">{item.name}</h3>
                <p className="text-xs text-slate-600 min-h-[36px] mb-3">{item.desc}</p>
                <div className="flex justify-between items-center pt-3 border-t border-dashed border-slate-200">
                  <div className="font-bold text-amber-600">🪙 {item.cost.toLocaleString("vi-VN")}</div>
                  {isOwned ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs">✓ Đã sở hữu</span>
                  ) : (
                    <button onClick={() => buy(item)} disabled={!canAfford}
                      className={`px-3 py-1 rounded text-xs font-bold ${canAfford ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
                      {canAfford ? "Đổi ngay" : "Chưa đủ"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";
import EmptyState from "@/components/EmptyState";

const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "energy", label: "⚡ Năng lượng" },
  { id: "protection", label: "🛡️ Bảo vệ" },
  { id: "cosmetic", label: "🎨 Trang trí" },
  { id: "content", label: "📦 Nội dung" },
  { id: "realworld", label: "🎁 Phần thưởng thực" },
];

export default function ShopPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [{ data: p }, { data: i }, { data: pur }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("shop_items").select("*").eq("is_active", true).order("display_order"),
      supabase.from("shop_purchases").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
    ]);
    setProfile(p);
    setItems(i || []);
    setPurchases(pur || []);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  async function buy(itemId: string, itemName: string, cost: number) {
    if (!confirm(`Mua "${itemName}" với giá ${cost} coins?`)) return;
    setPurchasing(itemId);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase.rpc("purchase_shop_item", { p_user_id: user.id, p_item_id: itemId });
    setPurchasing(null);
    if (error) {
      alert("Lỗi: " + error.message);
      return;
    }
    if (data?.success === false) {
      alert("Không mua được: " + data.error + (data.need ? ` (cần ${data.need} coins, hiện có ${data.have})` : ""));
      return;
    }
    alert(`✓ Đã mua ${data.item_name}!\nCòn lại: ${data.remaining_coins} coins`);
    loadData();
  }

  const filteredItems = category === "all" ? items : items.filter((i) => i.category === category);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Topbar profile={null} />
        <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
          <p className="text-slate-500">Đang tải...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-2">🛒 Cửa hàng</h1>
        <p className="text-sm text-slate-600 mb-4">Dùng coins kiếm được để mua vật phẩm + phần thưởng.</p>

        {/* Coins balance */}
        <div className="card bg-gradient-to-r from-amber-400 to-orange-500 text-white mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs opacity-90">Số dư hiện tại</div>
              <div className="text-3xl font-black flex items-center gap-2">🪙 {profile?.coins?.toLocaleString("vi-VN") || 0}</div>
            </div>
            <div className="text-xs opacity-90 text-right">
              <div>+2 coins/câu đúng</div>
              <div>+50 coins/streak 7 ngày</div>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                category === c.id ? "bg-blue-600 text-white" : "bg-white border border-slate-300 hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {filteredItems.length === 0 ? (
          <EmptyState icon="🛒" title="Chưa có vật phẩm" description="Mục này đang được cập nhật." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const canAfford = (profile?.coins || 0) >= item.cost_coins;
              return (
                <div key={item.id} className="card relative overflow-hidden">
                  {!canAfford && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] pointer-events-none rounded-lg" />}
                  <div className="text-5xl mb-2">{item.icon}</div>
                  <h3 className="font-bold mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-600 mb-3 min-h-[36px]">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-amber-600">🪙 {item.cost_coins.toLocaleString("vi-VN")}</div>
                    <button
                      onClick={() => buy(item.id, item.name, item.cost_coins)}
                      disabled={!canAfford || purchasing === item.id}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold relative z-10 ${
                        canAfford ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-300 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {purchasing === item.id ? "..." : canAfford ? "Mua" : "Chưa đủ"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recent purchases */}
        {purchases.length > 0 && (
          <div className="card mt-6">
            <h3 className="font-bold mb-3">📜 Lịch sử mua gần đây</h3>
            <div className="space-y-2 text-sm">
              {purchases.map((p) => (
                <div key={p.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span>{p.meta?.item_name || p.item_id}</span>
                  <span className="text-slate-500 text-xs">{new Date(p.created_at).toLocaleString("vi-VN")} · -{p.cost_paid} 🪙</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

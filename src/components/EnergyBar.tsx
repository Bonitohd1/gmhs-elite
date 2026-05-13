"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

interface EnergyData {
  current_energy: number;
  max_energy: number;
  next_refill_in_seconds: number;
}

export default function EnergyBar({ compact = false }: { compact?: boolean }) {
  const supabase = createClient();
  const [data, setData] = useState<EnergyData | null>(null);
  const [countdown, setCountdown] = useState(0);

  async function fetchEnergy() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: rpcData } = await supabase.rpc("compute_and_sync_energy", { p_user_id: user.id });
    if (rpcData && rpcData[0]) {
      setData(rpcData[0]);
      setCountdown(rpcData[0].next_refill_in_seconds || 0);
    }
  }

  useEffect(() => {
    fetchEnergy();
    const t = setInterval(fetchEnergy, 60000); // resync every 60s
    return () => clearInterval(t);
  }, []);

  // Local countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          fetchEnergy();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [countdown]);

  if (!data) {
    return compact ? null : (
      <div className="bg-white/15 px-3 py-1.5 rounded-full text-xs animate-pulse">⚡ ...</div>
    );
  }

  const pct = Math.round((data.current_energy / data.max_energy) * 100);
  const isFull = data.current_energy >= data.max_energy;
  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1 bg-yellow-400/30 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap"
        title={isFull ? "Năng lượng đầy!" : `Hồi 1 năng lượng sau ${mins}p ${secs}s`}
      >
        ⚡ {data.current_energy}/{data.max_energy}
      </span>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-2 flex items-center gap-2 text-xs">
      <span className="text-yellow-300 text-lg">⚡</span>
      <div className="flex-1 min-w-[100px]">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold">{data.current_energy}/{data.max_energy}</span>
          {!isFull && (
            <span className="text-[10px] opacity-80 font-mono">
              {mins}:{secs.toString().padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-300 to-amber-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

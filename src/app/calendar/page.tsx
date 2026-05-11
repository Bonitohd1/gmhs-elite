"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function CalendarPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function eventsFor(day: number): { type: string; icon: string; title: string }[] {
    const events: any[] = [];
    const dow = new Date(year, month, day).getDay();
    if (dow === 0) events.push({ type: "weekly", icon: "📝", title: "Weekly mở" });
    if (day === 1 || (day <= 7 && dow === 1)) events.push({ type: "monthly", icon: "🏆", title: "Monthly Big-test" });
    if (month === 4 && day === 12) events.push({ type: "gala", icon: "🔔", title: "Gala Rung chuông vàng" });
    if (month === 4 && day === 15) events.push({ type: "training", icon: "🎓", title: "Workshop GMHS" });
    return events;
  }

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">📅 Lịch sự kiện</h1>
          <p className="text-slate-600">Lịch học, thi đấu, đào tạo và deadline.</p>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{monthNames[month]} {year}</h3>
            <div className="flex gap-2">
              <button onClick={() => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); }} className="btn-ghost">←</button>
              <button onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()); }} className="btn-ghost">Hôm nay</button>
              <button onClick={() => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); }} className="btn-ghost">→</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((d) => <div key={d} className="p-2 text-center font-bold text-xs text-slate-500">{d}</div>)}
            {Array(firstDay).fill(0).map((_, i) => <div key={`e${i}`} className="aspect-square bg-slate-50 rounded" />)}
            {Array(daysInMonth).fill(0).map((_, i) => {
              const day = i + 1;
              const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
              const events = eventsFor(day);
              return (
                <div key={day} className={`aspect-square border rounded p-1 flex flex-col gap-1 ${isToday ? "border-primary border-2" : "border-slate-200"}`}>
                  <div className={`text-xs font-bold ${isToday ? "text-primary" : ""}`}>{day}</div>
                  {events.slice(0, 2).map((e, j) => (
                    <div key={j} className={`text-[9px] px-1 rounded truncate ${
                      e.type === "weekly" ? "bg-blue-100 text-blue-700" :
                      e.type === "monthly" ? "bg-amber-100 text-amber-700" :
                      e.type === "gala" ? "bg-gradient-to-r from-yellow-400 to-red-500 text-white" :
                      "bg-green-100 text-green-700"
                    }`}>{e.icon} {e.title}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

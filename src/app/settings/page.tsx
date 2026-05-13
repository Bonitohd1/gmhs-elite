"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import Topbar from "@/components/Topbar";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [theme, setTheme] = useState("light");
  const [notifWeekly, setNotifWeekly] = useState(true);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
    setNotifWeekly(localStorage.getItem("notifWeekly") !== "false");
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => setProfile(data));
    });
  }, []);

  function applyTheme(t: string) {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.body.classList.toggle("dark", t === "dark");
  }

  async function changePassword() {
    const np = prompt("Mat khau moi (>= 6 ky tu):");
    if (!np || np.length < 6) return;
    const { error } = await supabase.auth.updateUser({ password: np });
    alert(error ? "Loi: " + error.message : "OK: Da doi mat khau");
  }

  function replayTour() {
    if (typeof window === "undefined") return;
    Object.keys(localStorage).filter(k => k.startsWith("gmhs_onboarded_")).forEach(k => localStorage.removeItem(k));
    alert("Tour se hien lai khi quay ve Dashboard.");
    window.location.href = "/dashboard";
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="lg:ml-60 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">Cai dat</h1>

        <div className="card mb-4">
          <h3 className="font-bold mb-4">Giao dien</h3>
          <div className="flex gap-2">
            {["light", "dark"].map((t) => (
              <button key={t} onClick={() => applyTheme(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme === t ? "bg-primary text-white" : "bg-slate-100"}`}>
                {t === "light" ? "Sang" : "Toi"}
              </button>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <h3 className="font-bold mb-4">Tai khoan</h3>
          <button onClick={changePassword} className="btn-ghost block w-full text-center mb-2">Doi mat khau</button>
          <button onClick={replayTour} className="btn-ghost block w-full text-center mb-2">Xem lai Onboarding Tour</button>
          <button onClick={logout} className="btn-ghost block w-full text-center">Dang xuat</button>
        </div>
      </main>
    </div>
  );
}
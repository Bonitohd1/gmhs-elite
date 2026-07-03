import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Keep-alive endpoint cho Uptime Robot: mỗi lần ping sẽ chạy 1 query thật
// chạm vào Postgres -> reset đồng hồ 7 ngày pause của Supabase Free.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Client nhẹ dùng anon key, không cần cookie/đăng nhập
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    // Query thật vào DB (đếm số câu hỏi) -> tính là "database activity"
    const { count, error } = await supabase
      .from("questions")
      .select("id", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, ts: new Date().toISOString() },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      db: "alive",
      questions: count ?? null,
      ts: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "unknown", ts: new Date().toISOString() },
      { status: 500 }
    );
  }
}

import { createClient } from "@/lib/supabase-server";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';


export default async function DocReader({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
  const { data: doc } = await supabase.from("documents").select("*").eq("id", params.id).single();

  if (!doc) notFound();

  // Find prev/next in same category
  const { data: sameCat } = await supabase
    .from("documents")
    .select("id, title")
    .eq("category", doc.category)
    .order("id");
  const idx = sameCat?.findIndex((d) => d.id === doc.id) ?? 0;
  const prev = idx > 0 ? sameCat![idx - 1] : null;
  const next = idx < (sameCat?.length || 0) - 1 ? sameCat![idx + 1] : null;

  // Find related questions
  const { data: relatedQs } = await supabase
    .from("questions")
    .select("id, question, skill_id, difficulty, tt32_tag")
    .contains("source_doc_ids", [doc.id])
    .limit(5);

  return (
    <div className="min-h-screen">
      <Topbar profile={profile} />
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <Link href="/library" className="btn-ghost">← Thư viện</Link>
          <div className="flex gap-2">
            {prev && <Link href={`/library/${prev.id}`} className="btn-ghost">← Trước</Link>}
            {next && <Link href={`/library/${next.id}`} className="btn-ghost">Tiếp →</Link>}
          </div>
        </div>

        <div className="card">
          <div className="flex items-start gap-4 pb-4 border-b border-slate-200 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary grid place-items-center font-bold flex-shrink-0">
              {doc.format?.toUpperCase().slice(0, 3) || "DOC"}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-slate-100 px-2 py-1 rounded text-xs">{doc.id}</span>
                {doc.tt32_tag === "+" && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">⚡ Cấp cứu (+)</span>}
                {doc.tt32_tag === "*" && <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">⭐ Chuyên khoa (*)</span>}
                {doc.priority && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{doc.priority}</span>}
              </div>
              <h1 className="text-xl font-bold leading-tight">{doc.title}</h1>
              <div className="text-xs text-slate-500 mt-1">
                {doc.category?.replace(/^\d+_/, "").replace(/_/g, " ")} • {doc.format?.toUpperCase()}
              </div>
            </div>
          </div>

          {doc.excerpt ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-h-[500px] overflow-y-auto" style={{ fontFamily: "Georgia, serif", lineHeight: "1.75" }}>
              {doc.excerpt.split("\n").filter(Boolean).slice(0, 80).map((p: string, i: number) => (
                <p key={i} className="mb-3 text-sm">{p}</p>
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl text-center">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-amber-800">Tài liệu định dạng <b>{doc.format?.toUpperCase()}</b> - chưa số hoá toàn văn.</p>
              <p className="text-amber-700 text-xs mt-2">Trong production, file gốc sẽ được hiển thị qua viewer.</p>
            </div>
          )}

          {doc.excerpt && (
            <div className="mt-4 p-3 bg-primary-50 border-l-4 border-primary rounded-r text-xs text-slate-600">
              <b>📌 Lưu ý:</b> Đây là trích đoạn từ văn bản chính thức. Vui lòng tham khảo file gốc cho mục đích pháp lý.
            </div>
          )}

          {relatedQs && relatedQs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">📝 {relatedQs.length} câu hỏi liên quan</h3>
              <div className="space-y-2">
                {relatedQs.map((q) => (
                  <div key={q.id} className="p-3 bg-slate-50 rounded-lg text-sm flex justify-between gap-3">
                    <span>{q.question.length > 120 ? q.question.substring(0, 120) + "…" : q.question}</span>
                    <span className="bg-slate-200 px-2 rounded text-xs flex-shrink-0">{q.id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

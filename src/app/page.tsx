import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">🩺</div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
          GMHS Elite 2026
        </h1>
        <p className="text-xl text-slate-600 mb-2">
          Hệ thống ôn luyện chuyên môn điều dưỡng Gây mê Hồi sức
        </p>
        <p className="text-sm text-slate-500 mb-8">
          150+ câu hỏi • 31 tài liệu nguồn • Skill Map cá nhân hoá • TT32/2023 enforced
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/auth/login" className="btn-primary">Đăng nhập</Link>
          <Link href="/auth/signup" className="btn-ghost">Đăng ký mới</Link>
        </div>
        <p className="text-xs text-slate-400 mt-12">
          Tool ôn luyện nội bộ khoa GMHS • Privacy-first • NĐ 13/2023 compliant
        </p>
      </div>
    </div>
  );
}

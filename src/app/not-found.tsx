import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">404</h1>
        <p className="text-lg text-slate-700 mb-2">Không tìm thấy trang này</p>
        <p className="text-sm text-slate-500 mb-6">
          Trang bạn truy cập có thể đã bị xoá, đổi tên hoặc tạm thời không khả dụng.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            🏠 Về Dashboard
          </Link>
          <Link
            href="/help"
            className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold"
          >
            ❓ Trợ giúp
          </Link>
        </div>
      </div>
    </div>
  );
}

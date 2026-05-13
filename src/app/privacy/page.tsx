import Link from "next/link";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Chính sách bảo mật - GMHS Elite 2026",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Về trang chủ</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">Chính sách bảo mật</h1>
        <p className="text-sm text-slate-500 mb-8">Áp dụng từ ngày 14/05/2026 • Tuân thủ NĐ 13/2023/NĐ-CP</p>

        <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">

          <section>
            <h2 className="text-xl font-bold mb-2">1. Phạm vi áp dụng</h2>
            <p className="text-slate-700 leading-relaxed">
              Chính sách này áp dụng cho người dùng (ĐD, BS, BV) của <b>GMHS Elite 2026</b> — công cụ ôn luyện chuyên môn nội bộ
              khoa Gây mê Hồi sức. Hệ thống <b>KHÔNG</b> phục vụ mục đích thương mại, chia sẻ dữ liệu ra ngoài bệnh viện, hay đánh giá KPI/kỷ luật nhân viên.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">2. Dữ liệu thu thập</h2>
            <p className="text-slate-700 mb-2">Chúng tôi thu thập tối thiểu các thông tin sau:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li><b>Định danh cơ bản</b>: email, tên hiển thị, trình độ chuyên môn (CĐ/ĐH/SĐH)</li>
              <li><b>Dữ liệu sử dụng</b>: lịch sử làm bài quiz, điểm số, streak, huy hiệu đạt được</li>
              <li><b>Dữ liệu kỹ thuật</b>: ngày tạo tài khoản, ngày hoạt động cuối, ảnh đại diện (tuỳ chọn)</li>
            </ul>
            <p className="text-slate-700 mt-3">
              <b>Chúng tôi KHÔNG thu thập</b>: số CMND/CCCD, số điện thoại, thông tin bệnh nhân, vị trí địa lý, dữ liệu sinh trắc.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">3. Mục đích sử dụng</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>Cá nhân hoá lộ trình học: AI ưu tiên kỹ năng người dùng còn yếu</li>
              <li>Theo dõi tiến độ cá nhân (chỉ user xem được điểm của mình)</li>
              <li>Tổng hợp <b>ẩn danh</b> mức độ thành thạo trung bình của khoa để cải thiện đào tạo</li>
            </ul>
          </section>

          <section className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">4. Cam kết quan trọng</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li><b>Trưởng khoa CHỈ xem được số liệu tổng hợp ẩn danh</b> (ví dụ: 75% ĐD khoa đạt skill X), KHÔNG xem được điểm của bất kỳ cá nhân nào.</li>
              <li>Tool này <b>KHÔNG dùng để xét lương, KPI, kỷ luật hay đánh giá nhân sự</b>.</li>
              <li>Dữ liệu cá nhân được lưu trên hạ tầng Supabase (EU/SG) + mã hoá khi nghỉ và truyền tải (TLS 1.2+).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">5. Quyền của người dùng (theo NĐ 13/2023)</h2>
            <p className="text-slate-700 mb-2">Bạn có các quyền sau, có thể thực hiện bất kỳ lúc nào tại trang <Link href="/profile" className="text-blue-600 underline">Hồ sơ cá nhân</Link>:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li><b>Quyền được biết</b>: xem dữ liệu cá nhân hệ thống đang lưu</li>
              <li><b>Quyền điều chỉnh</b>: sửa thông tin sai/thiếu</li>
              <li><b>Quyền xoá</b>: yêu cầu xoá toàn bộ tài khoản + dữ liệu</li>
              <li><b>Quyền chuyển dữ liệu</b>: xuất dữ liệu định dạng JSON</li>
              <li><b>Quyền hạn chế xử lý</b>: tạm ngừng tham gia khi cần</li>
              <li><b>Quyền phản đối</b>: liên hệ admin nếu phát hiện vi phạm</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">6. Thời gian lưu trữ</h2>
            <p className="text-slate-700">
              Dữ liệu cá nhân được lưu trong suốt thời gian bạn dùng app. Khi bạn yêu cầu xoá tài khoản, dữ liệu sẽ
              bị xoá <b>vĩnh viễn trong vòng 7 ngày</b> (trừ log audit hệ thống được giữ 30 ngày để tuân thủ pháp lý).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">7. Chia sẻ với bên thứ ba</h2>
            <p className="text-slate-700">
              Chúng tôi <b>KHÔNG bán, KHÔNG chia sẻ</b> dữ liệu cá nhân với bên thứ ba. Một số nhà cung cấp hạ tầng kỹ thuật
              (Supabase - lưu trữ, Vercel - hosting) có thể xử lý dữ liệu để vận hành dịch vụ, theo hợp đồng bảo mật dữ liệu chuẩn.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">8. An toàn dữ liệu</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>Mã hoá khi nghỉ (encryption at rest) trên database</li>
              <li>Mã hoá khi truyền (TLS 1.2+) qua HTTPS</li>
              <li>Row Level Security (RLS) — user chỉ xem được data của chính mình</li>
              <li>Backup tự động hàng ngày</li>
              <li>Audit log mọi truy cập admin</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">9. Trẻ em dưới 18 tuổi</h2>
            <p className="text-slate-700">
              GMHS Elite chỉ dành cho nhân viên y tế đã hoàn thành đào tạo chuyên môn (≥18 tuổi). Chúng tôi không cố ý thu thập dữ liệu của trẻ vị thành niên.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">10. Thay đổi chính sách</h2>
            <p className="text-slate-700">
              Mọi thay đổi sẽ được thông báo qua email và hiển thị trên Dashboard ít nhất 7 ngày trước khi áp dụng.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">11. Liên hệ</h2>
            <p className="text-slate-700">
              Mọi thắc mắc về quyền riêng tư, liên hệ admin khoa Gây mê Hồi sức hoặc gửi yêu cầu qua phần
              <Link href="/help" className="text-blue-600 underline mx-1">Trợ giúp</Link>
              trong app.
            </p>
          </section>

          <div className="border-t pt-4 mt-6 flex gap-4 flex-wrap text-sm">
            <Link href="/terms" className="text-blue-600 hover:underline">→ Điều khoản sử dụng</Link>
            <Link href="/auth/signup" className="text-blue-600 hover:underline">→ Đăng ký tài khoản</Link>
            <Link href="/dashboard" className="text-blue-600 hover:underline">→ Về Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

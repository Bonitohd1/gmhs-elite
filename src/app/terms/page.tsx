import Link from "next/link";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Điều khoản sử dụng - GMHS Elite 2026",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Về trang chủ</Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">Điều khoản sử dụng</h1>
        <p className="text-sm text-slate-500 mb-8">Áp dụng từ ngày 14/05/2026</p>

        <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">

          <section>
            <h2 className="text-xl font-bold mb-2">1. Chấp nhận điều khoản</h2>
            <p className="text-slate-700 leading-relaxed">
              Bằng việc tạo tài khoản và sử dụng <b>GMHS Elite 2026</b>, bạn đồng ý với các điều khoản dưới đây
              và <Link href="/privacy" className="text-blue-600 underline">Chính sách bảo mật</Link>. Nếu không đồng ý, vui lòng không sử dụng dịch vụ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">2. Đối tượng sử dụng</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>ĐD, BS thuộc khoa Gây mê Hồi sức hoặc đơn vị liên quan</li>
              <li>Đã hoàn thành đào tạo chuyên môn (≥18 tuổi, có chứng chỉ hành nghề)</li>
              <li>Có email công vụ hoặc cá nhân hợp lệ</li>
            </ul>
          </section>

          <section className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">3. Mục đích của tool</h2>
            <p className="text-slate-700 mb-2"><b>GMHS Elite là công cụ HỖ TRỢ ÔN LUYỆN</b> chuyên môn, KHÔNG phải:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>❌ Công cụ đánh giá KPI hay xét lương/thưởng</li>
              <li>❌ Công cụ kỷ luật hay đánh giá năng lực chính thức</li>
              <li>❌ Tài liệu thay thế hướng dẫn lâm sàng chính thống của BV/BYT</li>
              <li>❌ Lời khuyên y khoa cho quyết định lâm sàng thực tế</li>
            </ul>
            <p className="text-slate-700 mt-3">
              Nội dung trong app dựa trên TT 32/2023/TT-BYT, hướng dẫn BYT và tài liệu khoa, mang tính tham khảo. Trong tình huống thực tế, luôn tuân thủ quy trình chính thức của BV.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">4. Trách nhiệm người dùng</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>Cung cấp thông tin đăng ký chính xác</li>
              <li>Bảo mật mật khẩu - không chia sẻ tài khoản</li>
              <li>Sử dụng tool đúng mục đích đào tạo cá nhân</li>
              <li><b>Không</b> tải tài liệu chứa thông tin bệnh nhân (HIPAA/NĐ 13)</li>
              <li><b>Không</b> spam, lạm dụng hoặc tấn công hệ thống</li>
              <li>Báo cáo lỗi/nội dung không chính xác qua nút Cờ ❗ hoặc Trợ giúp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">5. Nội dung học liệu</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>Ngân hàng câu hỏi, scenarios, bài giảng do nội bộ khoa biên soạn</li>
              <li>Nội dung được rà soát định kỳ; khi có sai sót, vui lòng báo qua app</li>
              <li>Không được sao chép, phân phối nội dung ra ngoài bệnh viện</li>
              <li>Bản quyền thuộc Khoa Gây mê Hồi sức và các tác giả đóng góp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">6. Tài khoản và bảo mật</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>Mỗi cá nhân chỉ tạo 1 tài khoản</li>
              <li>Mật khẩu tối thiểu 6 ký tự, khuyến nghị 8+ ký tự</li>
              <li>Bạn chịu trách nhiệm về mọi hoạt động trên tài khoản của mình</li>
              <li>Khi nghi ngờ bị truy cập trái phép, đổi mật khẩu ngay và báo admin</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">7. Tính khả dụng và hạn chế trách nhiệm</h2>
            <p className="text-slate-700 leading-relaxed">
              Tool được cung cấp "AS-IS", không bảo đảm 100% uptime. Có thể gián đoạn để bảo trì, nâng cấp.
              Chúng tôi không chịu trách nhiệm về thiệt hại gián tiếp do gián đoạn dịch vụ hoặc lỗi nội dung -
              người dùng tự đánh giá trước khi áp dụng kiến thức vào thực tế lâm sàng.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">8. Chấm dứt tài khoản</h2>
            <p className="text-slate-700 mb-2">Tài khoản có thể bị tạm khoá hoặc xoá nếu:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>Vi phạm điều khoản này hoặc Chính sách bảo mật</li>
              <li>Phát tán nội dung sai/độc hại cho bệnh nhân</li>
              <li>Người dùng yêu cầu (qua trang Hồ sơ → Yêu cầu xoá tài khoản)</li>
              <li>Tài khoản không hoạt động ≥ 12 tháng (sau khi báo trước qua email)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">9. Sửa đổi điều khoản</h2>
            <p className="text-slate-700">
              Bệnh viện có quyền cập nhật điều khoản này khi cần. Thay đổi quan trọng sẽ được thông báo trước 7 ngày qua email + Dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">10. Liên hệ</h2>
            <p className="text-slate-700">
              Mọi thắc mắc về điều khoản này, vui lòng liên hệ admin khoa Gây mê Hồi sức hoặc qua phần
              <Link href="/help" className="text-blue-600 underline mx-1">Trợ giúp</Link>
              trong app.
            </p>
          </section>

          <div className="border-t pt-4 mt-6 flex gap-4 flex-wrap text-sm">
            <Link href="/privacy" className="text-blue-600 hover:underline">→ Chính sách bảo mật</Link>
            <Link href="/auth/signup" className="text-blue-600 hover:underline">→ Đăng ký tài khoản</Link>
            <Link href="/dashboard" className="text-blue-600 hover:underline">→ Về Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

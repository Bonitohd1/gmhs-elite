"use client";

// Lazy-load jsPDF to keep bundle size small
async function loadPdf() {
  const jsPDFModule = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;
  return { jsPDF: jsPDFModule.default, autoTable };
}

interface PdfHeaderOptions {
  title: string;
  subtitle?: string;
  generatedBy?: string;
}

function addHeader(doc: any, opts: PdfHeaderOptions) {
  doc.setFillColor(14, 165, 233); // primary cyan
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("GMHS Elite 2026", 14, 13);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Khoa Gay me Hoi suc - Noi bo", doc.internal.pageSize.getWidth() - 14, 13, { align: "right" });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(opts.title, 14, 32);

  if (opts.subtitle) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(opts.subtitle, 14, 39);
    doc.setTextColor(0, 0, 0);
  }

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  const now = new Date().toLocaleString("vi-VN");
  doc.text(`Xuat ngay: ${now}${opts.generatedBy ? " - " + opts.generatedBy : ""}`, 14, 45);
  doc.setTextColor(0, 0, 0);
}

function addFooter(doc: any) {
  const pageCount = doc.internal.pages.length - 1;
  const pageHeight = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(`Trang ${i}/${pageCount}`, doc.internal.pageSize.getWidth() / 2, pageHeight - 7, { align: "center" });
    doc.text("Tai lieu noi bo - khong pho bien ngoai benh vien", 14, pageHeight - 7);
  }
}

/**
 * Export bao cao tien do thang
 */
export async function exportMonthlyReport(data: {
  totalUsers: number;
  activeUsers: number;
  avgXp: number;
  topPerformers: { display_name: string; total_xp: number; streak: number }[];
  monthLabel: string;
}) {
  const { jsPDF, autoTable } = await loadPdf();
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  addHeader(doc, {
    title: "Bao cao tien do thang " + data.monthLabel,
    subtitle: `Tong ${data.totalUsers} DD - ${data.activeUsers} dang hoat dong - TB ${Math.round(data.avgXp)} XP`,
  });

  // Summary cards as table
  autoTable(doc, {
    startY: 52,
    head: [["Chi so", "Gia tri"]],
    body: [
      ["Tong DD trong khoa", data.totalUsers.toString()],
      ["DD dang hoat dong (>= 1 daily)", data.activeUsers.toString()],
      ["Ty le tham gia", data.totalUsers > 0 ? Math.round((data.activeUsers / data.totalUsers) * 100) + "%" : "0%"],
      ["Trung binh XP", Math.round(data.avgXp).toLocaleString("vi-VN")],
    ],
    headStyles: { fillColor: [14, 165, 233] },
    theme: "grid",
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Top 10 Performer", 14, (doc as any).lastAutoTable.finalY + 12);

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 16,
    head: [["#", "Ten DD", "Tong XP", "Streak"]],
    body: data.topPerformers.slice(0, 10).map((u, i) => [
      (i + 1).toString(),
      u.display_name || "(chua dat ten)",
      (u.total_xp || 0).toLocaleString("vi-VN"),
      (u.streak || 0).toString(),
    ]),
    headStyles: { fillColor: [14, 165, 233] },
    theme: "striped",
  });

  addFooter(doc);
  doc.save(`GMHS_BaoCaoThang_${data.monthLabel}.pdf`);
}

/**
 * Export bao cao TT32
 */
export async function exportTT32Report(data: {
  totalQuestions: number;
  basicQ: number;
  emergencyQ: number;
  specialtyQ: number;
  violations: { user: string; question_id: string; date: string }[];
}) {
  const { jsPDF, autoTable } = await loadPdf();
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  addHeader(doc, {
    title: "Bao cao TT 32/2023/TT-BYT",
    subtitle: `Doi soat pham vi chuyen mon dieu duong - Tong ${data.totalQuestions} cau hoi`,
  });

  autoTable(doc, {
    startY: 52,
    head: [["Phan loai", "So cau", "Ty le"]],
    body: [
      ["Co ban (khong tag)", data.basicQ.toString(), data.totalQuestions > 0 ? Math.round((data.basicQ / data.totalQuestions) * 100) + "%" : "0%"],
      ["Cap cuu (+)", data.emergencyQ.toString(), data.totalQuestions > 0 ? Math.round((data.emergencyQ / data.totalQuestions) * 100) + "%" : "0%"],
      ["Chuyen khoa GMHS (*)", data.specialtyQ.toString(), data.totalQuestions > 0 ? Math.round((data.specialtyQ / data.totalQuestions) * 100) + "%" : "0%"],
    ],
    headStyles: { fillColor: [14, 165, 233] },
    theme: "grid",
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Vi pham phat hien: ${data.violations.length}`, 14, (doc as any).lastAutoTable.finalY + 12);

  if (data.violations.length > 0) {
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 16,
      head: [["#", "DD", "Cau hoi", "Ngay"]],
      body: data.violations.map((v, i) => [
        (i + 1).toString(),
        v.user,
        v.question_id,
        v.date,
      ]),
      headStyles: { fillColor: [220, 38, 38] },
      theme: "striped",
    });
  } else {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(34, 197, 94);
    doc.text("Khong co vi pham phat hien trong ky bao cao.", 14, (doc as any).lastAutoTable.finalY + 20);
    doc.setTextColor(0, 0, 0);
  }

  addFooter(doc);
  doc.save(`GMHS_BaoCao_TT32_${new Date().toISOString().split("T")[0]}.pdf`);
}

/**
 * Export ho so nang luc ca nhan
 */
export async function exportPersonalProfile(data: {
  user: { display_name: string; level: string; total_xp: number; streak: number };
  badges: { name: string; icon: string; tier: string; earned_at?: string }[];
  recentActivity: { type: string; date: string; detail: string }[];
}) {
  const { jsPDF, autoTable } = await loadPdf();
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  addHeader(doc, {
    title: "Ho so nang luc - " + data.user.display_name,
    subtitle: `${data.user.level} - ${data.user.total_xp.toLocaleString("vi-VN")} XP - Streak ${data.user.streak} ngay`,
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Huy hieu da dat (" + data.badges.length + ")", 14, 56);

  autoTable(doc, {
    startY: 60,
    head: [["#", "Ten huy hieu", "Cap"]],
    body: data.badges.map((b, i) => [
      (i + 1).toString(),
      b.name,
      b.tier.toUpperCase(),
    ]),
    headStyles: { fillColor: [245, 158, 11] },
    theme: "grid",
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Hoat dong gan day", 14, (doc as any).lastAutoTable.finalY + 12);

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 16,
    head: [["Ngay", "Loai", "Chi tiet"]],
    body: data.recentActivity.slice(0, 30).map((a) => [a.date, a.type, a.detail]),
    headStyles: { fillColor: [14, 165, 233] },
    theme: "striped",
  });

  addFooter(doc);
  doc.save(`GMHS_HoSoNangLuc_${data.user.display_name.replace(/\s+/g, "_")}.pdf`);
}

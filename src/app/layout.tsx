import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GMHS Elite 2026",
  description: "Hệ thống ôn luyện chuyên môn điều dưỡng Gây mê Hồi sức",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Serif_KR, Inter } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_KR({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "THEOLOGIA | 기독교 교리 & 성경 AI 토론",
  description: "신학적 깊이와 다양한 교파적 관점에서 지적인 토론을 나누는 AI 기독교 토론 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerif.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] font-sans antialiased flex flex-col selection:bg-[#7A1C2C] selection:text-white">
        {children}
      </body>
    </html>
  );
}

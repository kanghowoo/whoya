import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "whoya - 나는 어떤 기준으로 투표하는 사람일까?",
  description:
    "제9회 전국동시지방선거를 위한 유권자 자기성찰 도구. 후보 추천 없이, 나만의 투표 기준을 찾아보세요.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "whoya - 나는 어떤 기준으로 투표하는 사람일까?",
    description: "제9회 전국동시지방선거를 위한 유권자 자기성찰 도구",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "whoya - 나의 투표 기준 찾기",
    description: "제9회 전국동시지방선거를 위한 유권자 자기성찰 도구",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

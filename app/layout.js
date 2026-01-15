"use client";

import { useEffect } from "react";
import "../styles/globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Keyword Analytics Platform",
  description: "데이터 기반 키워드 트렌드 분석 및 인사이트 플랫폼",
};

/**
 * RootLayout component
 *
 * Wraps all pages in a consistent layout with a top navigation bar
 * and applies a global safety patch for toLocaleString.
 */
export default function RootLayout({ children }) {
  useEffect(() => {
    // 🔒 전역 안전 패치 (Chart.js 내부 toLocaleString 에러 차단)
    const original = Number.prototype.toLocaleString;

    Number.prototype.toLocaleString = function (...args) {
      if (!Number.isFinite(this)) {
        return "0";
      }
      return original.apply(this, args);
    };
  }, []);

  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 max-w-7xl w-full mx-auto mt-4 p-4 space-y-6">
          {children}
        </main>
      </body>
    </html>
  );
}

"use client";

import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <ChartBarIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary-dark">Keyword Analytics</span>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-gray-500">데이터 기반 키워드 인사이트 플랫폼</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
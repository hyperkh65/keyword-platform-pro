"use client";

import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

/**
 * TrendingCharts component
 *
 * Renders charts showing aggregated trends over time and volume comparison for top keywords.
 */
export default function TrendingCharts({ trendingOverTime, trendingList }) {
  // Line chart for overall trend (sum of volumes over last 7 periods)
  const lineData = {
    labels: ['6일 전', '5일 전', '4일 전', '3일 전', '2일 전', '1일 전', '오늘'],
    datasets: [
      {
        label: '전체 검색량 (지수)',
        data: trendingOverTime,
        fill: false,
        borderColor: '#6d28d9',
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: trendingList.map((item) => item.keyword),
    datasets: [
      {
        label: '네이버 검색량',
        data: trendingList.map((item) => item.naverVol),
        backgroundColor: '#6d28d9',
      },
      {
        label: '구글 검색량',
        data: trendingList.map((item) => item.googleVol),
        backgroundColor: '#f97316',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">최근 7일간 전체 트렌드</h3>
        <Line data={lineData} options={{
          scales: { y: { beginAtZero: true } },
          plugins: { legend: { display: false } },
        }} />
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">TOP 10 검색량 비교</h3>
        <Bar data={barData} options={{
          responsive: true,
          scales: {
            x: { stacked: false },
            y: { beginAtZero: true },
          },
        }} />
      </div>
    </div>
  );
}
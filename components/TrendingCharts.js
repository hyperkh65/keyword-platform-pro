"use client";

import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function TrendingCharts({
  trendingList = [],
  trendingOverTime = [],
}) {
  // 방어
  if (!Array.isArray(trendingOverTime) || trendingOverTime.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <p className="text-gray-400">트렌드 데이터를 불러오는 중...</p>
      </div>
    );
  }

  const labels = trendingOverTime.map((d) => d.date);

  const dataValues = trendingOverTime.map((d) =>
    Number.isFinite(Number(d.volume)) ? Number(d.volume) : 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "전체 검색량",
        data: dataValues,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    parsing: false, // ⭐ 중요: Chart.js 자동 파싱 차단
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = Number(context.raw ?? 0);
            return `검색량: ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return Number(value).toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3">📈 최근 7일간 전체 트렌드</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

"use client";

import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { formatNumber } from "@/utils/format";

/**
 * KeywordDetail
 *
 * props:
 * - keyword: string
 * - naverData: {
 *     keywords: [
 *       {
 *         keyword,
 *         pcVolume,
 *         mobileVolume,
 *         totalVolume,
 *         competition,
 *         bid
 *       }
 *     ]
 *   }
 */
export default function KeywordDetail({ keyword, naverData }) {
  if (!keyword) return null;

  const keywords = Array.isArray(naverData?.keywords)
    ? naverData.keywords
    : [];

  const main = keywords[0];

  // 데이터 없을 때 안전 처리
  if (!main) {
    return (
      <section className="mt-8 bg-white rounded-xl shadow p-6">
        <p className="text-gray-400">해당 키워드의 데이터가 없습니다.</p>
      </section>
    );
  }

  /* ===========================
     차트 데이터 (숫자만 사용)
  =========================== */

  const volumeChartData = {
    labels: ["PC", "Mobile"],
    datasets: [
      {
        label: "검색량",
        data: [
          Number(main.pcVolume ?? 0),
          Number(main.mobileVolume ?? 0),
        ],
        backgroundColor: ["#3b82f6", "#60a5fa"],
      },
    ],
  };

  const competitionValue =
    main.competition === "HIGH"
      ? 3
      : main.competition === "MID"
      ? 2
      : 1;

  const competitionData = {
    labels: ["경쟁도"],
    datasets: [
      {
        data: [competitionValue],
        backgroundColor: ["#f97316"],
      },
    ],
  };

  return (
    <section className="mt-8 space-y-6">
      {/* ===== 헤더 ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-2">
          🔍 키워드 분석:{" "}
          <span className="text-blue-600">{keyword}</span>
        </h2>
        <p className="text-gray-500 text-sm">
          네이버 검색광고 실데이터 기반 분석
        </p>
      </div>

      {/* ===== 요약 카드 ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="총 검색량"
          value={formatNumber(main.totalVolume)}
        />
        <SummaryCard
          title="PC 검색량"
          value={formatNumber(main.pcVolume)}
        />
        <SummaryCard
          title="모바일 검색량"
          value={formatNumber(main.mobileVolume)}
        />
        <SummaryCard
          title="평균 CPC"
          value={`${formatNumber(main.bid)} 원`}
        />
      </div>

      {/* ===== 차트 ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="PC vs 모바일 검색량">
          <Bar data={volumeChartData} />
        </ChartCard>

        <ChartCard title="경쟁도 지표">
          <Doughnut data={competitionData} />
          <p className="text-center mt-2 font-semibold">
            {main.competition || "N/A"}
          </p>
        </ChartCard>
      </div>

      {/* ===== 연관 키워드 ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">연관 키워드</h3>

        <ul className="divide-y">
          {keywords.slice(0, 10).map((k) => (
            <li
              key={k.keyword}
              className="py-3 flex justify-between items-center"
            >
              <span className="font-medium">{k.keyword}</span>
              <span className="text-sm text-gray-600">
                {formatNumber(k.totalVolume)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===========================
   내부 컴포넌트
=========================== */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h4 className="font-semibold mb-4">{title}</h4>
      {children}
    </div>
  );
}

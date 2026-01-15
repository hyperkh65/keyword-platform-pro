"use client";

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';

/**
 * KeywordDetail component
 *
 * Displays detailed analytics for a selected keyword including search volumes,
 * demographic charts, trend line, and related keywords.
 *
 * @param {Object} props
 * @param {string} props.keyword - The selected keyword
 * @param {Object} props.data - Detailed data containing naver, google and demographics
 */
export default function KeywordDetail({ keyword, data }) {
  if (!data) return null;
  const { naver, google, demographics } = data;

  // Gender chart data: use a doughnut chart for male vs female ratio
  const genderData = {
    labels: ['남성', '여성'],
    datasets: [
      {
        data: [demographics.gender.male, demographics.gender.female],
        backgroundColor: ['#6d28d9', '#f97316'],
      },
    ],
  };

  // Age distribution: bar chart across age groups
  const ageGroups = Object.keys(demographics.age);
  const ageValues = ageGroups.map((age) => demographics.age[age]);
  const ageData = {
    labels: ageGroups,
    datasets: [
      {
        label: '비율',
        data: ageValues,
        backgroundColor: '#6d28d9',
      },
    ],
  };

  // Trend line data: show combined search volume over the past 7 periods
  const trendData = demographics.trend;
  const trendLineData = {
    labels: ['6일 전', '5일 전', '4일 전', '3일 전', '2일 전', '1일 전', '오늘'],
    datasets: [
      {
        label: '검색량',
        data: trendData,
        fill: false,
        borderColor: '#6d28d9',
        tension: 0.3,
      },
    ],
  };

  // Combine related keywords from both engines and deduplicate
  const combinedRelated = Array.from(
    new Set([...(naver.relatedKeywords || []), ...(google.relatedKeywords || [])])
  ).slice(0, 10);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">"{keyword}" 키워드 분석</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white shadow-sm p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">네이버 검색량</h3>
            <p className="text-2xl font-semibold text-primary-dark">
              {naver.volume.toLocaleString()}
            </p>
          </div>
          <div className="bg-white shadow-sm p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">구글 검색량</h3>
            <p className="text-2xl font-semibold text-primary-dark">
              {google.volume.toLocaleString()}
            </p>
          </div>
          <div className="bg-white shadow-sm p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">차이</h3>
            <p className="text-2xl font-semibold text-primary-dark">
              {(naver.volume - google.volume).toLocaleString()}
            </p>
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-2">성별 분포</h3>
          <Doughnut
            data={genderData}
            options={{
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-2">연령대 분포</h3>
          <Bar
            data={ageData}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">최근 7일 트렌드</h3>
        <Line
          data={trendLineData}
          options={{
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } },
          }}
        />
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-2">연관 키워드</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          {combinedRelated.length > 0 ? (
            combinedRelated.map((k, idx) => <li key={idx}>{k}</li>)
          ) : (
            <li>연관 키워드가 없습니다.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
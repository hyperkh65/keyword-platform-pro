"use client";

import { formatNumber } from "@/utils/format";

/**
 * TrendingList component
 *
 * Displays a ranking of trending keywords with volumes for Naver and Google.
 * Each item is clickable to allow users to drill down into a keyword.
 */
export default function TrendingList({ trendingList = [], onSelect }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-1">
        🔥 오늘의 핫 키워드 TOP 10
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">순위</th>
              <th className="px-3 py-2 text-left">키워드</th>
              <th className="px-3 py-2 text-right">네이버</th>
              <th className="px-3 py-2 text-right">구글</th>
              <th className="px-3 py-2 text-right">차이</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {trendingList.map((item, idx) => {
              const naver = Number(item?.naverVol || 0);
              const google = Number(item?.googleVol || 0);
              const diff = naver - google;

              return (
                <tr
                  key={item.keyword}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelect(item.keyword)}
                >
                  <td className="px-3 py-2 font-medium text-gray-500">
                    {idx + 1}
                  </td>

                  <td className="px-3 py-2 font-medium text-primary-dark underline">
                    {item.keyword}
                  </td>

                  <td className="px-3 py-2 text-right text-gray-700">
                    {formatNumber(naver)}
                  </td>

                  <td className="px-3 py-2 text-right text-gray-700">
                    {formatNumber(google)}
                  </td>

                  <td className="px-3 py-2 text-right text-gray-700">
                    {diff > 0
                      ? `+${formatNumber(diff)}`
                      : formatNumber(diff)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {trendingList.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            트렌딩 데이터가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

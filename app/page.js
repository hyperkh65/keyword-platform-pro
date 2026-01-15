"use client";

import { useState, useEffect } from "react";
import TrendingList from "../components/TrendingList";
import TrendingCharts from "../components/TrendingCharts";
import KeywordDetail from "../components/KeywordDetail";

/**
 * Home page component
 *
 * Renders the trending keywords dashboard and a search interface to display
 * detailed analytics for selected keywords.
 */
export default function HomePage() {
  const [trendingList, setTrendingList] = useState([]);
  const [trendingOverTime, setTrendingOverTime] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [keywordData, setKeywordData] = useState(null);
  const [loadingKeyword, setLoadingKeyword] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch trending data on mount
  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch("/api/trending");
        if (!res.ok) throw new Error("트렌드 데이터를 불러오지 못했습니다.");
        const data = await res.json();

        setTrendingList(
          Array.isArray(data.trendingList) ? data.trendingList : []
        );
        setTrendingOverTime(
          Array.isArray(data.trendingOverTime)
            ? data.trendingOverTime
            : []
        );
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrending();
  }, []);

  /**
   * Handle selection or search of a keyword
   */
  const handleSelectKeyword = async (keyword) => {
    if (!keyword) return;

    setSelectedKeyword(keyword);
    setLoadingKeyword(true);
    setError("");
    setKeywordData(null);

    try {
      const [naverRes, googleRes, demoRes] = await Promise.all([
        fetch("/api/naver", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        }),
        fetch("/api/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        }),
        fetch("/api/demographics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        }),
      ]);

      if (!naverRes.ok || !googleRes.ok || !demoRes.ok) {
        throw new Error("데이터를 불러오지 못했습니다.");
      }

      const [naverData, googleData, demoData] = await Promise.all([
        naverRes.json(),
        googleRes.json(),
        demoRes.json(),
      ]);

      setKeywordData({
        naver: naverData,
        google: googleData,
        demographics: demoData,
      });
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoadingKeyword(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 🔍 Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={inputKeyword}
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSelectKeyword(inputKeyword);
          }}
          placeholder="분석할 키워드를 입력하세요"
          className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <button
          onClick={() => handleSelectKeyword(inputKeyword)}
          className="bg-primary hover:bg-primary-dark text-white rounded-md px-4 py-2 text-sm font-medium"
        >
          검색
        </button>
      </div>

      {/* 📊 Trending Dashboard */}
      <div className="space-y-6">
        <TrendingCharts
          trendingOverTime={trendingOverTime}
          trendingList={trendingList}
        />
        <TrendingList
          trendingList={trendingList}
          onSelect={handleSelectKeyword}
        />
      </div>

      {/* 🔎 Keyword Detail */}
      {loadingKeyword && <p className="text-primary">분석 중입니다...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {keywordData && !loadingKeyword && (
        <KeywordDetail
          keyword={selectedKeyword}
          naverData={keywordData.naver}
          googleTrend={keywordData.google}
        />
      )}
    </div>
  );
}

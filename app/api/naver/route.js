import crypto from "crypto";
import { NextResponse } from "next/server";

/**
 * 네이버 검색광고 API 서명 생성
 * 공식 규격: {timestamp}.{method}.{uri}
 */
function createSignature({ timestamp, method, uri, secretKey }) {
  const message = `${timestamp}.${method}.${uri}`;
  return crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");
}

/**
 * POST /api/naver
 * body: { keyword: string }
 */
export async function POST(req) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json(
        { error: "keyword is required" },
        { status: 400 }
      );
    }

    // ===== 네이버 API 기본 설정 =====
    const method = "GET";
    const uri = "/keywordstool";
    const timestamp = Date.now().toString();

    const signature = createSignature({
      timestamp,
      method,
      uri,
      secretKey: process.env.NAVER_CLIENT_SECRET,
    });

    const apiUrl =
      "https://api.searchad.naver.com/keywordstool" +
      `?hintKeywords=${encodeURIComponent(keyword)}` +
      "&showDetail=1";

    // ===== 네이버 API 호출 =====
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Timestamp": timestamp,
        "X-API-KEY": process.env.NAVER_CLIENT_ID,      // Access License
        "X-Customer": process.env.NAVER_CUSTOMER_ID,  // Customer ID
        "X-Signature": signature,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          error: "NAVER_API_ERROR",
          status: res.status,
          detail: text,
        },
        { status: 500 }
      );
    }

    const data = await res.json();

    /**
     * 네이버 keywordstool 응답 예시:
     * data.keywordList = [
     *  {
     *    relKeyword,
     *    monthlyPcQcCnt,
     *    monthlyMobileQcCnt,
     *    compIdx,
     *    bidAmt
     *  }
     * ]
     */

    // ===== 프론트에서 쓰기 좋게 가공 =====
    const keywords = (data.keywordList || []).map((k) => ({
      keyword: k.relKeyword,
      pcVolume: Number(k.monthlyPcQcCnt) || 0,
      mobileVolume: Number(k.monthlyMobileQcCnt) || 0,
      totalVolume:
        (Number(k.monthlyPcQcCnt) || 0) +
        (Number(k.monthlyMobileQcCnt) || 0),
      competition: k.compIdx, // LOW / MID / HIGH
      bid: Number(k.bidAmt) || 0, // 평균 클릭 비용
    }));

    return NextResponse.json({
      source: "naver",
      baseKeyword: keyword,
      count: keywords.length,
      keywords,
    });
  } catch (error) {
    console.error("NAVER API ERROR:", error);
    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

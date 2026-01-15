export async function GET() {
  // Mock trending data. In a real implementation this would call external APIs
  // or your own backend to retrieve current top keywords and volumes.
  const sampleKeywords = [
    'AI',
    '챗GPT',
    '메타버스',
    '로봇공학',
    '클라우드 컴퓨팅',
    '빅데이터',
    '블록체인',
    '스마트시티',
    '자율주행',
    'IoT',
  ];
  const trendingList = sampleKeywords.map((kw) => {
    const naverVol = Math.floor(Math.random() * 50000) + 5000;
    const googleVol = Math.floor(naverVol * (0.5 + Math.random() * 0.5));
    return { keyword: kw, naverVol, googleVol };
  });
  // Generate a mock total search volume over the past 7 days. Summing volumes of all keywords.
  const trendingOverTime = Array.from({ length: 7 }).map(() =>
    Math.floor(Math.random() * 100000) + 50000
  );
  const body = { trendingList, trendingOverTime };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
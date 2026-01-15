export async function POST(request) {
  const { keyword } = await request.json();
  // Generate a mock search volume for Naver. In a real implementation,
  // you would query the Naver Search Ad API.
  const base = Math.floor(Math.random() * 80000) + 2000;
  // Create some related keywords by appending numbers or similar phrases
  const relatedKeywords = Array.from({ length: 5 }).map((_, idx) => `${keyword} 관련 ${idx + 1}`);
  const body = {
    volume: base,
    relatedKeywords,
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
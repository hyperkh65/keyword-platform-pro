export async function POST(request) {
  const { keyword } = await request.json();
  // Generate a mock search volume for Google; assume Google search volume
  // is roughly between 40% and 80% of the Naver volume.
  const base = Math.floor(Math.random() * 80000) + 2000;
  const googleVolume = Math.floor(base * (0.4 + Math.random() * 0.4));
  // Create related keywords similar to Naver response
  const relatedKeywords = Array.from({ length: 5 }).map((_, idx) => `${keyword} 키워드 ${idx + 1}`);
  const body = {
    volume: googleVolume,
    relatedKeywords,
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
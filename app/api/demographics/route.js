export async function POST(request) {
  const { keyword } = await request.json();
  // Generate random gender distribution where male+female=100
  const male = Math.floor(Math.random() * 60) + 20; // 20-79%
  const female = 100 - male;
  // Generate age distribution across 10s, 20s, 30s, 40s, 50s, 60s that sum to 100
  const ageGroups = ['10대', '20대', '30대', '40대', '50대', '60대'];
  let remaining = 100;
  const ageDistribution = {};
  for (let i = 0; i < ageGroups.length; i++) {
    if (i === ageGroups.length - 1) {
      ageDistribution[ageGroups[i]] = remaining;
    } else {
      const value = Math.floor(Math.random() * (remaining / 2));
      ageDistribution[ageGroups[i]] = value;
      remaining -= value;
    }
  }
  // Generate a trend array representing combined search volume over last 7 days
  const trend = Array.from({ length: 7 }).map(() => Math.floor(Math.random() * 80000) + 2000);
  const body = {
    gender: { male, female },
    age: ageDistribution,
    trend,
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
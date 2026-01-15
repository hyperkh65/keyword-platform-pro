# Keyword Analytics Platform

이 프로젝트는 키워드 트렌드를 분석하고 시각화하는 **Next.js + Tailwind CSS** 기반 데모 애플리케이션입니다. 네이버와 구글의 검색량을 비교하고, 실시간 트렌드와 인구통계 데이터를 시각적으로 제공하여 마케터와 블로거가 빠르게 인사이트를 얻을 수 있도록 설계되었습니다.

## 기능

- 🔥 **오늘의 핫 키워드 TOP 10** – 네이버와 구글 검색량을 비교하는 리스트와 차트
- 📈 **최근 7일 트렌드 차트** – 전체 검색량 변화를 선형 그래프로 표현
- 🔍 **키워드 검색** – 원하는 키워드를 입력하면 해당 키워드의 상세 분석 정보 제공
- 🎯 **상세 분석** – 네이버/구글 검색량 비교, 성별/연령대 분포, 주간 트렌드, 연관 키워드 목록
- 🖌️ **모던 UI/UX** – Tailwind와 Chart.js를 활용해 미려한 카드 및 차트 컴포넌트 구현

> 현재 API는 모두 **Mock** 데이터로 동작합니다. `.env.local`에 실제 API 키를 넣고 라우트 구현을 수정하면 실서비스와 연동할 수 있습니다.

## 설치 및 실행

1. **저장소 클론/다운로드**

   압축 파일을 풀거나 Git 레포지터리를 클론합니다.

2. **패키지 설치**

   ```bash
   cd keyword-platform-pro
   npm install
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   브라우저에서 `http://localhost:3000`을 열면 대시보드를 확인할 수 있습니다.

4. **환경변수 설정 (선택)**

   실제 네이버/구글 API를 사용하려면 루트에 `.env.local` 파일을 생성하고 아래 값을 채워야 합니다.

   ```ini
   NAVER_CLIENT_ID=your_naver_client_id
   NAVER_CLIENT_SECRET=your_naver_client_secret
   GOOGLE_API_KEY=your_google_api_key
   ```

## 프로젝트 구조

```
keyword-platform-pro/
├─ app/
│  ├─ api/             # API 라우트 (Mock 데이터)
│  │  ├─ demographics/ # 성별/연령 및 트렌드 데이터
│  │  ├─ google/       # 구글 검색량 및 연관 키워드
│  │  ├─ naver/        # 네이버 검색량 및 연관 키워드
│  │  └─ trending/     # 오늘의 키워드 목록과 트렌드
│  ├─ layout.js        # 공통 레이아웃 (NavBar 포함)
│  └─ page.js          # 메인 페이지 (검색/대시보드/상세 분석)
├─ components/
│  ├─ NavBar.js        # 상단 네비게이션 바
│  ├─ TrendingList.js  # 트렌딩 키워드 리스트
│  ├─ TrendingCharts.js# 대시보드 차트 컴포넌트
│  └─ KeywordDetail.js # 키워드 상세 분석 뷰
├─ styles/
│  └─ globals.css      # Tailwind 기본 설정 및 커스텀 스타일
├─ tailwind.config.js  # Tailwind 설정 (프라이머리/액센트 컬러 등)
├─ postcss.config.js   # PostCSS 설정
├─ package.json        # 의존성 및 스크립트
└─ .env.example        # 환경 변수 예시 파일
```

## 개선 방안

이 프로젝트는 데모 목적의 스캐폴딩입니다. 실제 서비스로 발전시키려면 다음과 같은 확장이 가능합니다.

- ✅ **실시간 데이터 연동** – 네이버 검색광고 API, Google Trends API 등을 호출하도록 API 라우트 변경
- ✅ **데이터베이스 도입** – 인기 키워드와 트렌드를 주기적으로 저장하고 캐싱하여 성능 향상
- ✅ **사용자별 저장/메모** – 좋아요/즐겨찾기한 키워드 목록을 관리하는 기능 추가
- ✅ **다국어 지원** – 국제 사용자 확보를 위해 i18n 적용
- ✅ **스케일링** – Vercel이나 AWS 등을 통한 배포 및 오토스케일링

프로젝트를 마음껏 확장하고 자신만의 키워드 분석 SaaS로 발전시켜 보세요!# keyword-platform-pro

// Ranking.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 색상
const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const MAX_WIDTH = 1440;

// 1~20등 목업 데이터
const RankingData = [
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
    title: "알라딘",
    locate: "샤롯데씨어터",
    date: "2024.11.22 ~ 2025.06.22",
    ranking: "1",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014885_p.gif",
    title: "시라노",
    locate: "예술의 전당",
    date: "2024.12.06 ~ 2025.02.23",
    ranking: "2",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
    title: "지킬앤하이드",
    locate: "블루스퀘어 신한카드홀",
    date: "2024.11.29 ~ 2025.05.18",
    ranking: "3",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24016737_p.gif",
    title: "웃는남자",
    locate: "예술의전당 오페라극장",
    date: "2025.01.09 ~ 2025.03.09",
    ranking: "4",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/L0/L0000106_p.gif",
    title: "마타하리",
    locate: "LG아트센터 서울 LG SIGNATURE 홀",
    date: "2024.12.05 ~ 2025.03.02",
    ranking: "5",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24016374_p.gif",
    title: "미아 파밀리아",
    locate: "링크아트센터드림 드림1관",
    date: "2024.12.19 ~ 2025.03.23",
    ranking: "6",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24015073_p.gif",
    title: "테일러",
    locate: "대학로 TOM 1관",
    date: "2024.11.19 ~ 2025.02.09",
    ranking: "7",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
    title: "이프덴",
    locate: "홍익대 대학로 아트센터",
    date: "2024.12.03 ~ 2025.03.02",
    ranking: "8",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014865_p.gif",
    title: "글루미 선데이",
    locate: "링크아트센터 페이코홀",
    date: "2024.11.05 ~ 2025.01.26",
    ranking: "9",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
    title: "베르테르",
    locate: "디큐브 링크아트센터",
    date: "2025.01.17 ~ 2025.03.16",
    ranking: "10",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018180_p.gif",
    title: "라파치니의 정원",
    locate: "플러스씨어터",
    date: "2025.01.30 ~ 2025.04.20",
    ranking: "11",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/25/25000113_p.gif",
    title: "무명호걸",
    locate: "CKL스테이지",
    date: "2025.02.04 ~ 2025.02.19",
    ranking: "12",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018133_p.gif",
    title: "시카고",
    locate: "계명아트센터",
    date: "2025.02.07 ~ 2025.02.09",
    ranking: "13",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018006_p.gif",
    title: "원스",
    locate: "코엑스 신한카드 아티움",
    date: "2025.02.19 ~ 2025.05.31",
    ranking: "14",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014865_p.gif",
    title: "글루미 선데이",
    locate: "링크아트센터 페이코홀",
    date: "2024.11.05 ~ 2025.01.26",
    ranking: "15",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
    title: "베르테르",
    locate: "디큐브 링크아트센터",
    date: "2025.01.17 ~ 2025.03.16",
    ranking: "16",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018180_p.gif",
    title: "라파치니의 정원",
    locate: "플러스씨어터",
    date: "2025.01.30 ~ 2025.04.20",
    ranking: "17",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/25/25000113_p.gif",
    title: "무명호걸",
    locate: "CKL스테이지",
    date: "2025.02.04 ~ 2025.02.19",
    ranking: "18",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018133_p.gif",
    title: "시카고",
    locate: "계명아트센터",
    date: "2025.02.07 ~ 2025.02.09",
    ranking: "19",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018006_p.gif",
    title: "원스",
    locate: "코엑스 신한카드 아티움",
    date: "2025.02.19 ~ 2025.05.31",
    ranking: "20",
  },
];

const Ranking = () => {
  
  //정렬
  const sortedData = [...RankingData].sort(
    (a, b) => parseInt(a.ranking, 10) - parseInt(b.ranking, 10)
  );

  // 상단 5개
  const initialTop5 = sortedData.slice(0, 5);
  // 나머지 6~20
  const initialOthers = sortedData.slice(5, 20);

  // 2) 상태
  const [topFive, setTopFive] = useState(initialTop5);
  const [others] = useState(initialOthers);

  // 현재 선택된 카드 (기본: 1등)
  const [selectedRank, setSelectedRank] = useState("1");

  return (
    <Container>
      <TopSection>
        {/* 좌측 타이틀 */}
        <LeftSection>
          <RankingTitle>RANKING</RankingTitle>
          <SubTitle>랭킹 1~5위</SubTitle>
        </LeftSection>

        {/* 우측 Top5 뮤지컬 카드 */}
        <RightSection>
          {topFive
            .slice()          // 원본 훼손 방지
            .reverse()        // [5등,4등,3등,2등,1등] 순
            .map((musical, index) => {
              // index=0 → 5등, index=4 → 1등
              const offsetX = index * 150; 
              // rank=5 → zIndex=1, rank=1 → zIndex=5
              const zIndex = 6 - parseInt(musical.ranking, 10);
              const isSelected = musical.ranking === selectedRank;

            return (
              <CardWrapper
                key={musical.ranking}
                $offsetX={offsetX}
                $zIndex={zIndex}
                $isSelected={isSelected}
                onClick={() => setSelectedRank(musical.ranking)}
              >
                <CardImage src={musical.poster} alt={musical.title} />
                <CardRank>{musical.ranking}</CardRank>
                {isSelected && (
                  <CardDetail>
                    <DetailTitle>{musical.title}</DetailTitle>
                    <DetailLocate>{musical.locate}</DetailLocate>
                    <DetailDate>{musical.date}</DetailDate>
                  </CardDetail>
                )}
              </CardWrapper>
            );
          })}
        </RightSection>
      </TopSection>

      {/* 하단 뮤지컬 카드(랭킹 6~20) */}
      <BottomTitle>랭킹 순위</BottomTitle>
      <BottomSection>
        <GridWrapper>
          {others.map((musical) => (
            <BottomItem key={musical.ranking}>
              <BottomPoster src={musical.poster} alt={musical.title} />
              <BottomInfo>
                <BottomRank>{musical.ranking}위</BottomRank>
                <BottomTitleText>{musical.title}</BottomTitleText>
                <BottomLocate>{musical.locate}</BottomLocate>
                <BottomDate>{musical.date}</BottomDate>
              </BottomInfo>
            </BottomItem>
          ))}
        </GridWrapper>
      </BottomSection>
    </Container>
  );
};

export default Ranking;

// ---------------- Styled Components ----------------

const Container = styled.div`
  width: ${MAX_WIDTH}px;
  margin: 0 auto;
  position: relative;
  background-color: ${COLOR_WHITE};

  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  width:  ${MAX_WIDTH}px;
  height: 880px;

  display:  flex;
  justify-content:  space-between;
  align-items:  center;
`;

// 상단 좌측 
const LeftSection = styled.div`
  margin-left: 100px; 
`;

const RankingTitle = styled.div`
  font-family: "BelgianoSerif";
  font-size: 60px;
  font-weight: 400;
  color: ${COLOR_MUIT_RED};
  margin-bottom:  28px;
`;

const SubTitle = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color:  ${COLOR_GRAY_MAINTEXT};
`;

// 상단 우측 top 5 뮤지컬 카드 
const RightSection = styled.div` 
  width:  auto;
  height: 100%;
  position: relative;
  margin-right: 10px;
`;

/* TOP5 뮤지컬 카드 한 장을 감싸는 래퍼 */
const CardWrapper = styled.div`
  position: absolute;
  bottom: ${(props) => (props.$isSelected ? "148px" : "160px")};
  right: 0;
  z-index: ${(props) => (props.$isSelected ? 9 : props.$zIndex)};
  transform: translateX(${(props) => `-${props.$offsetX}px`});

  width: ${(props) => (props.$isSelected ? "416px" : "400px")};
  height: ${(props) => (props.$isSelected ? "584px" : "560px")};

  transition: all 0.3s ease-in-out;
  cursor: pointer; 
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardRank = styled.div`
  position: absolute;
  left: 40px;
  bottom: 20px;
  font-family:  "BelgianoSerif";
  font-size: 100px;
  font-weight: 400;
  color: ${COLOR_WHITE};
`;

const CardDetail = styled.div`
  position: absolute;
  left: 0px;
  bottom: -120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Pretendard"
`;

const DetailTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color:  ${COLOR_GRAY_MAINTEXT};
  margin-bottom: 16px;
`;

const DetailLocate = styled.div`
  font-size: 16px;
  font-weight: 500;
  color:  ${COLOR_GRAY_MAINTEXT};
  margin-bottom: 4px;
`;

const DetailDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color:  ${COLOR_GRAY_SUB};
`;


/* 하단 6~20등 */
const BottomTitle = styled.div`
  font-family: "Pretendard";
  font-size: 36px;
  font-weight: 700;
  color:  ${COLOR_GRAY_MAINTEXT};
  margin-left: 100px;
  margin-bottom: 30px;
`;

const BottomSection = styled.div`
  margin-left: 145px;
  margin-bottom: 100px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 80.48px;
  width: 100%;
`;

const BottomItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const BottomPoster = styled.img`
  width: 226.52px;
  height: 320px;
  object-fit: cover;
  margin-bottom: 8px;
  border: 1px solid ${COLOR_GRAY_UNSELECTED};
`;

const BottomInfo = styled.div`
  font-family: "Pretendard";
`;

const BottomRank = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${COLOR_MUIT_RED};
`;

const BottomTitleText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
  margin-bottom:  12px;
`;

const BottomLocate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
  margin-bottom:  4px;
`;

const BottomDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_SUB};
`;
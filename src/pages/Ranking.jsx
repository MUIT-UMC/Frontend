
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from "axios";

// 색상
const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const MAX_WIDTH = 1440;

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token = localStorage.getItem("accessToken"); 

const Ranking = () => {

  const [rankingData, setRankingData] = useState([]);
  useEffect(() => {
    fetchRankingData();
  }, []);
  // 랭킹 API연결
  const fetchRankingData = async () => {
    try {
      const response = await axios.get(`${baseURL}/musicals/rank/all?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const list = response.data.result.content || [];
      const refined = list.map((item, idx) => ({
        musicalId: item.id,
        poster: item.posterUrl,
        title: item.name,
        locate: item.place,
        date: item.duration,
        ranking: (idx + 1).toString() // 1부터 순번 부여
      }));

      setRankingData(refined);
    } catch (error) {
      console.error("Ranking API Error:", error);
      setRankingData([]); 
    }
  };
  
  // 정렬 - 필요하다면? => 쓴면 rankingData 대신 sortedData 사용
  // const sortedData = [...rankingData].sort(
  //   (a, b) => parseInt(a.ranking, 10) - parseInt(b.ranking, 10)
  // );

  // TOP 5개 + 나머지
  const initialTop5 = rankingData.slice(0, 5);
  const initialOthers = rankingData.slice(5, 20);
  // 2) 상태
  const [topFive, setTopFive] = useState(initialTop5);
  const [others, setOthers] = useState(initialOthers);
  // 현재 선택된 카드 (디폴트 : 1등)
  const [selectedRank, setSelectedRank] = useState("1");

  // rankingData가 갱신시 topFive, others도 새롭게 업데이트
  useEffect(() => {
    const updatedTop5 = rankingData.slice(0, 5);
    const updatedOthers = rankingData.slice(5, 20);
    setTopFive(updatedTop5);
    setOthers(updatedOthers)
  }, [rankingData]);

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
                onMouseEnter={() => setSelectedRank(musical.ranking)}
              >
                <CardImage to={musical ? `/detail/${musical.musicalId}` : "#"}>
                  <img style={{ width: '100%', height: '100%' }} src={musical.poster} alt={musical.title} />
                </CardImage>
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
              <BottomPoster to={musical ? `/detail/${musical.musicalId}` : "#"}>
                <img style={{ width: '100%', height: '100%' }} src={musical.poster} alt={musical.title} />
              </BottomPoster>
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

const CardImage = styled(Link)`
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
  margin-right: 145px;
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

const BottomPoster = styled(Link)`
  width: 226.52px;
  height: 320px;
  object-fit: cover;
  margin-bottom: 8px;
  border: 1px solid ${COLOR_GRAY_UNSELECTED};
  img {
    transition: transform 0.2s ease;
  }

  img:hover {
    transform: scale(1.04);
  }
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

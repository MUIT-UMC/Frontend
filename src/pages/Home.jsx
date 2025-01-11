
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ArrowPrevIcon from '../assets/icons/ArrowPrev.svg';
import ArrowNextIcon from '../assets/icons/ArrowNext.svg';

// 색상, 폰트 상수, 레이아웃 (디자인 가이드)
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "000000";
const COLOR_GRAY_SUB = "#919191";  // 비활성 상태의 회색
const COLOR_WHITE = "#FFFFFF";
const COLOR_GRAY_OUTLINE = "#E6E6E6";

const MAX_WIDTH = 1440;
const SIDE_MARGIN = 100; // 좌우 마진
const COLUMN_GAP = 20;   // column 간격

// HOT NOW 목업 데이터(임시) -> 추후 API
const slidesData_HotNow = [
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24016374_p.gif",
    title: "미아 파밀리아",
    locate: "링크아트센터드림 드림1관",
    date: "2024.12.19 ~ 2025.03.23",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24015073_p.gif",
    title: "테일러",
    locate: "대학로 TOM 1관",
    date: "2024.11.19 ~ 2025.02.09",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014885_p.gif",
    title: "시라노",
    locate: "예술의 전당",
    date: "2024.12.06 ~ 2025.02.23",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
    title: "이프덴",
    locate: "홍익대 대학로 아트센터",
    date: "2024.12.03 ~ 2025.03.02",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014865_p.gif",
    title: "글루미 선데이",
    locate: "링크아트센터 페이코홀",
    date: "2024.11.05 ~ 2025.01.26",
  },
];

// TICKET OPEN 목업 데이터(임시) -> 추후 API
const slidesData_TicketOpen = [
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
    title: "베르테르",
    locate: "디큐브 링크아트센터",
    date: "2025.01.17 ~ 2025.03.16",
    Dday: "D-5",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018180_p.gif",
    title: "라파치니의 정원",
    locate: "플러스씨어터",
    date: "2025.01.30 ~ 2025.04.20",
    Dday: "D-18",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/25/25000113_p.gif",
    title: "무명호걸",
    locate: "CKL스테이지",
    date: "2025.02.04 ~ 2025.02.19",
    Dday: "D-25",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018133_p.gif",
    title: "시카고",
    locate: "계명아트센터",
    date: "2025.02.07 ~ 2025.02.09",
    Dday: "D-28",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018006_p.gif",
    title: "원스",
    locate: "코엑스 신한카드 아티움",
    date: "2025.02.19 ~ 2025.05.31",
    Dday: "D-40",
  },
];

// TICKET OPEN 목업 데이터(임시) -> 추후 API
const slidesData_Ranking = [
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
    title: "알라딘",
    locate: "샤롯데씨어터",
    date: "2024.11.22 ~ 2025.06.22",
    Ranking: "1",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014885_p.gif",
    title: "시라노",
    locate: "예술의 전당",
    date: "2024.12.06 ~ 2025.02.23",
    Ranking: "2",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
    title: "지킬앤하이드",
    locate: "블루스퀘어 신한카드홀",
    date: "2024.11.29 ~ 2025.05.18",
    Ranking: "3",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24016737_p.gif",
    title: "웃는남자",
    locate: "예술의전당 오페라극장",
    date: "2025.01.09 ~ 2025.03.09",
    Ranking: "4",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/L0/L0000106_p.gif",
    title: "마타하리",
    locate: "LG아트센터 서울 LG SIGNATURE 홀",
    date: "2024.12.05 ~ 2025.03.02",
    Ranking: "5",
  },
];

function Home() {

  // 왼쪽 옵션 스테이트, default = hotnow
  const [selectedOption, setSelectedOption] = useState("hotNow");

  // 선택된 옵션에 따른 슬라이드 데이터
  const getSlidesData = () => {
    switch (selectedOption) {
      case "hotNow":
        return slidesData_HotNow;
      case "ticketOpen":
        return slidesData_TicketOpen;
      case "ranking":
        return slidesData_Ranking;
      default:
        return slidesData_HotNow;
    }
  };
  const slidesData = getSlidesData();

  // 슬라이드데이터 스테이트
  const [currentSlide, setCurrentSlide] = useState(0);

  //옵션이 바뀔때 초기화
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedOption]);

  // 포스터카드 좌우 버튼 핸들러
  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slidesData.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentSlide((prev) =>
      (prev + 1) % slidesData.length
    );
  };

  // 점 클릭 핸들러 (인디케이터)
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // 현재 카드 정보
  const slide = slidesData[currentSlide];

  return(
    <HomeContainer>
      <GridBox>
        {/* 왼쪽영역 - 옵션 3개 */}
        <LeftArea>

          {/* HOT NOW */}
          <Option
            $isActive={selectedOption === "hotNow"}
            onClick={() => setSelectedOption("hotNow")}
          >
            <OptionTitle $isActive={selectedOption === "hotNow"}>
              HOT NOW
              {selectedOption === "hotNow" && (
                <OptionSubTitle>
                  지금 핫한 뮤지컬
                </OptionSubTitle>
              )}  
            </OptionTitle>
          </Option>

          {/* TICKET OPEN */}
          <Option
            $isActive={selectedOption === "ticketOpen"}
            onClick={() => setSelectedOption("ticketOpen")}
          >
            <OptionTitle $isActive={selectedOption === "ticketOpen"}>
              TICKET OPEN
              {selectedOption === "ticketOpen" && (
                <OptionSubTitle>
                  오픈 예정 뮤지컬
                </OptionSubTitle>
              )}
            </OptionTitle>
          </Option>

          {/* RANKING */}
          <Option
            $isActive={selectedOption === "ranking"}
            onClick={() => setSelectedOption("ranking")}
          >
            <OptionTitle $isActive={selectedOption === "ranking"}>
              RANKING
              {selectedOption === "ranking" && (
                <OptionSubTitle>
                  인기 뮤지컬 순위
                </OptionSubTitle>
              )}
            </OptionTitle>
          </Option>
        </LeftArea>

        {/* 오른쪽영역 - 옵션선택에 따른 포스터카드 */}
        <RightArea>
          <Poster $isRanking={selectedOption === "ranking"}>
            <TextBox>
              {/*티켓오픈 -> Dday표시*/}
              { selectedOption === "ticketOpen" && ( <DdayText>{slide.Dday}</DdayText> )}
              <TitleText>{slide.title}</TitleText>
              <LocateText>{slide.locate}</LocateText>
              <DateText>{slide.date}</DateText>
            </TextBox>
              {selectedOption === "ranking" && (
                <RankingBox>
                  {slide.Ranking}
                </RankingBox>
              )}
            <ArrowButtons>
              <ArrowButton onClick={handlePrev}>
                <ArrowIcon><img src={ArrowPrevIcon} alt="Arrow Icon" /></ArrowIcon>
              </ArrowButton>
              <CardBox>
                <PosterImage src={slide.poster} alt="포스터 이미지" />
                {/* 점(인디케이터) */}
                <DotWrapper>
                  {slidesData.map((_, i) => (
                    <Dot
                      key={i}
                      $active={i === currentSlide}
                      onClick={() => handleDotClick(i)}
                    />
                  ))}
                </DotWrapper>
              </CardBox>
              <ArrowButton onClick={handleNext}>
                <ArrowIcon><img src={ArrowNextIcon} alt="Arrow Icon" /></ArrowIcon>
              </ArrowButton>
            </ArrowButtons>
          </Poster>
        </RightArea>
      </GridBox>
    </HomeContainer>
  )
}


export default Home;

/* ------------------- Styled Components ------------------- */

const HomeContainer = styled.header`
  max-width: ${MAX_WIDTH}px;
  height: 864px;  /* 1024 - 160(상단바) */
  margin: 0 auto;
  position: relative;
  background-color: ${COLOR_WHITE};
`;

const GridBox = styled.div`
  max-width: ${MAX_WIDTH}px;
  height: 864px;  /* 1024 - 160(상단바) */

  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12열 그리드 */
  column-gap: ${COLUMN_GAP}px;  /* Gutter */
  padding: 0 ${SIDE_MARGIN}px; /* 좌우 margin */
`;

const LeftArea = styled.div`
  grid-column: 1 / 6; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly; /*혹은 space-around*/
`;

const Option = styled.div`
  cursor: pointer;
`;

const OptionTitle = styled.div`
  font-family: "BelgianoSerif";
  font-weight: 400;
  font-size: ${({ $isActive }) => ($isActive ? "80px" : "60px")};
  color: ${({ $isActive }) => ($isActive ? COLOR_MUIT_RED : COLOR_GRAY_SUB)};
  transition: all 0.3s ease;

  display:  inline-block;
  position: relative;
`;

const OptionSubTitle = styled.div`
  position: absolute;
  bottom: -28px;
  left: 0;
  width: 100%;
  height: 28px;
  background-color: ${COLOR_MUIT_RED};
  color: ${COLOR_WHITE};
  border-radius: 0; /* 직사각형 */

  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: left;
  padding: 0 8px;
  box-sizing: border-box;
`;

const RightArea = styled.div`
  grid-column: 6 / 13;
  display: flex;
  justify-content: center; 
  align-items: center;
`;

const Poster = styled.div`
  display:  flex;
  justify-content:  flex-end;
  align-items:  flex-end;
  gap:  ${({ $isRanking }) => ($isRanking ? "107px" : "56px")};
  width: 100%;
  position: relative;
`;

const DdayText = styled.div`
  font-family: "Pretendard";
  font-weight: 700;
  font-size:  24px;
  margin: 0 0 4px 0;
  height: 29px;
  color:  ${COLOR_MUIT_RED};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position:  relative;
`;

const TitleText = styled.div`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 24px;
  margin: 0 0 28px 0;
  height: 29px;
  color: ${COLOR_GRAY_MAINTEXT};

  /* 텍스트길어져도 한줄에 표시되게 */
  white-space: nowrap;
  overflow: visible; 
`;

const LocateText = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  margin: 0 0 4px 0;
  height: 25px;
  color: ${COLOR_GRAY_MAINTEXT};

  /* 텍스트길어져도 한줄에 표시되게 */
  white-space: nowrap;
  overflow: visible; 
`;

const DateText = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  margin: 0;
  height: 25px;
  color: ${COLOR_GRAY_SUB};

  /* 텍스트길어져도 한줄에 표시되게 */
  white-space: nowrap;
  overflow: visible; 
`;

const RankingBox = styled.div`
  font-family: "BelgianoSerif";
  font-weight: 400;
  font-size: 263px;
  color:  ${COLOR_MUIT_RED};

  position: absolute;
  right:  420px;
  bottom: -79px;
`;

const ArrowButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

const ArrowButton = styled.button`
  cursor: pointer;
  width: 10px;
  height: 20px;
  background: none;
  border: none;
  padding: 0;
  position: relative;
`;

const ArrowIcon = styled.span`
  width:  10px;
  height: 20px;
  cursor: pointer;
  align-self: center;
  color: ${COLOR_MUIT_RED};
`;

const CardBox = styled.div`
  width: 416px;
  height: 584px;
  background-color: ${COLOR_WHITE}; 
  position: relative;
  /* 실제 이미지는 PosterImage에 표시, 여긴 frame만 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PosterImage = styled.img`
  width: 416px;
  height: 584px;
  object-fit: cover;
`;

const DotWrapper = styled.div`
  position: absolute;
  bottom: -28px;
  width: 136px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: ${({ $active }) => ($active ? COLOR_MUIT_RED : COLOR_GRAY_OUTLINE)};
  cursor: pointer;
`;
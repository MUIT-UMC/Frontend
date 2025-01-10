
import React, { useState } from "react";
import styled from "styled-components";

// 색상, 폰트 상수, 레이아웃 (디자인 가이드)
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "000000";
const COLOR_GRAY_SUB = "#919191";  // 비활성 상태의 회색
const COLOR_WHITE = "#FFFFFF";
const COLOR_GRAY_OUTLINE = "#E6E6E6";

const MAX_WIDTH = 1440;
const SIDE_MARGIN = 100; // 좌우 마진
const COLUMN_GAP = 20;   // column 간격

// 포스터 카드 임시 데이터(배열) (5장)
const slidesData = [
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24016374_p.gif",
    title: "미아 파밀리아",
    locate: "링크아트센터드림 드림1관",
    date: "2024.12.19 ~ 2025.03.23",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018180_p.gif",
    title: "라파치니의 정원",
    locate: "플러스씨어터",
    date: "2025.01.30 ~ 2025.04.20",
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
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018006_p.gif",
    title: "원스",
    locate: "코엑스 신한카드 아티움",
    date: "2025.02.19 ~ 2025.05.31",
  },
];

function Home() {
  // 왼쪽 옵션 스테이트트
  const [selectedOption, setSelectedOption] = useState("hotNow");

  // 오른쪽 포스터카드 스테이트
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <HomeContainer>
      {/* 왼쪽 영역: 3개 타이틀(HOT NOW, TICKET OPEN, RANKING) */}
      <LeftArea>
        {/* HOT NOW */}
        <Option
          //style={{ top: "10%" }} // 시안에 맞춰 조정
          isActive={selectedOption === "hotNow"}
          onClick={() => setSelectedOption("hotNow")}
        >
          <OptionTitle isActive={selectedOption === "hotNow"}>
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
          //style={{ top: "40%" }} // 시안에 맞춰 조정
          isActive={selectedOption === "ticketOpen"}
          onClick={() => setSelectedOption("ticketOpen")}
        >
          <OptionTitle isActive={selectedOption === "ticketOpen"}>
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
          //style={{ top: "70%" }} // 시안에 맞춰 조정
          isActive={selectedOption === "ranking"}
          onClick={() => setSelectedOption("ranking")}
        >
          <OptionTitle isActive={selectedOption === "ranking"}>
            RANKING
            {selectedOption === "ranking" && (
              <OptionSubTitle>
                인기 뮤지컬 순위
              </OptionSubTitle>
            )}
          </OptionTitle>
        </Option>
      </LeftArea>
      
      {/* 오른쪽 영역: 포스터카드 슬라이드 */}
      <RightArea>
        <Poster>
          <TextBox>
            <TitleText>{slide.title}</TitleText>
            <LocateText>{slide.locate}</LocateText>
            <DateText>{slide.date}</DateText>
          </TextBox>
          <ArrowButtons>
            <ArrowButton onClick={handlePrev}>
              <ArrowIcon>{"<"}</ArrowIcon>
            </ArrowButton>
            <CardBox>
              <PosterImage src={slide.poster} alt="포스터 이미지" />
              {/* 점(인디케이터) 8x8, 간격24, 총5개 → 136px */}
              <DotWrapper>
              {slidesData.map((_, i) => (
                <Dot
                  key={i}
                  active={i === currentSlide}
                  onClick={() => handleDotClick(i)}
                />
              ))}
              </DotWrapper>
            </CardBox>
            <ArrowButton onClick={handleNext}>
              <ArrowIcon>{">"}</ArrowIcon>
            </ArrowButton>
          </ArrowButtons>
        </Poster>
      </RightArea>
    </HomeContainer>
  );

}

export default Home;

/* ------------------- Styled Components ------------------- */

const HomeContainer = styled.div`
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12열 그리드 */
  column-gap: ${COLUMN_GAP}px;  /* Gutter */
  padding: 0 ${SIDE_MARGIN}px; /* 좌우 margin *
  height: calc(100vh - 160px); /* 상단바 160px */
  background-color: ${COLOR_WHITE};
  position: relative;
  box-sizing: border-box;
`;

/** 죈쪽 영역: 옵션 타이틀 3개 **/
const LeftArea = styled.div`
  grid-column: 1 / 6; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const Option = styled.div`
  cursor: pointer;
`;

const OptionTitle = styled.div`
  font-family: "BelgianoSerif";
  font-weight: 400;
  font-size: ${({ isActive }) => (isActive ? "80px" : "60px")};
  color: ${({ isActive }) => (isActive ? COLOR_MUIT_RED : COLOR_GRAY_SUB)};

  display: inline-block;
  position: relative; /* SubTitle이 absolute로 붙음 */
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


/** 오른쪽 영역: 카드 + 슬라이드 **/ //flex-direction: column;
const RightArea = styled.div`
  grid-column: 6 / 13;
  display: flex;
  justify-content: center; 
  align-items: center;
`;

const Poster = styled.div`
  display: flex;
  align-items: flex-end; /* 하단 정렬 */
  gap: 54px;
  margin-bottom: 24px; /* 4dp간격 */
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const TitleText = styled.div`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 24px;
  margin: 0 0 28px 0;
  height: 29px;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const LocateText = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  margin: 0 0 4px 0;
  height: 25px;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const DateText = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  margin: 0;
  height: 25px;
  color: ${COLOR_GRAY_SUB};
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

/** 좌우버튼 + 점(인디케이터) */
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
  /* 임시로 텍스트로 표시 */
  font-family:  "Pretendard"
  font-weight:  700;
  font-size: 20px;
  color: ${COLOR_MUIT_RED};
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
  background-color: ${({ active }) => (active ? COLOR_MUIT_RED : COLOR_GRAY_OUTLINE)};
  cursor: pointer;
`;
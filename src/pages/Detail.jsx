import React from "react";
import styled from "styled-components";
import poster from "../assets/images/miafamiglia-poster.png";
import starFull from '../assets/icons/star-full.svg';
import starOutline from '../assets/icons/star-outline.svg';
import PerformanceDetails from "../components/detail/PerformanceDetails";
import EventCalendar from "../components/detail/EventCalendar";
import MainBanner from "../components/detail/MainBanner";

function Detail() {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Container>
      {/*빨간배너 */}
      <MainBanner />
      {/* 본문 */}
      <MainContent>
        <div style={{margin:'60px 100px', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
           {/* 공연 상세 정보, 예매 버튼, 캐스팅 정보 등 구현 예정 */}
        <LeftSection>
        <TitleWrapper>
          <h1>미아 파밀리아</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M11.625 5.25C7.6905 5.25 4.5 8.64 4.5 12.8205C4.5 21.1875 18 30.75 18 30.75C18 30.75 31.5 21.1875 31.5 12.8205C31.5 7.641 28.3095 5.25 24.375 5.25C21.585 5.25 19.17 6.954 18 9.435C16.83 6.954 14.415 5.25 11.625 5.25Z" stroke="#A00000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <button>공동 구매 기능</button>
        </TitleWrapper>
        <RatingWrapper>
          <img src={starFull} alt="Star Full Icon" />
          <img src={starFull} alt="Star Full Icon" />
          <img src={starFull} alt="Star Full Icon" />
          <img src={starFull} alt="Star Full Icon" />
          <img src={starOutline} alt="Star Outline Icon" />
          <Rating>4.0</Rating>
        </RatingWrapper>
        <InfoWrapper>
          <InfoImage>
            <img alt="뮤지컬 포스터" src={poster} />
          </InfoImage>
          <InfoDetail>
            <Item>
              <Label>장소</Label>
              <div>
                <Value>링크아트센터 드림1관</Value>
                <SightLink>시야 확인하기</SightLink>
              </div>
            </Item>
            <Item>
              <Label>공연 기간</Label>
              <Value>2024.12.10 ~ 2025.03.23</Value>
            </Item>
            <Item>
              <Label>공연 시간</Label>
              <Value>110분 (인터미션 없음)</Value>
            </Item>
            <Item>
              <Label>관람 연령</Label>
              <Value>중학생 이상 관람가</Value>
            </Item>
            <Item>
              <Label>출연</Label>
              <Value>김도빈, 황민수, 김찬종, 조풍해, 최호승, 장민수, 박영수, 문경초, 박좌현</Value>
            </Item>
            <Item>
              <Label>가격</Label>
              <div style={{display: 'flex', flexDirection:'column', gap:'10px'}}>
                <Value>공동 구매시 20% 할인</Value>
                <Value>R석 70,000원 - 56,000원</Value>
                <Value>S석 60,000원 - 48,000원</Value>
                <Value>A석 40,000원</Value>
              </div>
            </Item>
          </InfoDetail>
        </InfoWrapper>
        {/*하단 nav bar */}
        <PerformanceDetails/>
        </LeftSection>
        <RightSection>
          <EventCalendar />
          <GroupPurchaseButton>공동 구매하기</GroupPurchaseButton>
        </RightSection>
        </div>
      </MainContent>
    </Container>
    </div>
    
  );
}

export default Detail;

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 0px;
  margin: 0px;
  width: 1440px;
`;


const MainContent = styled.div`
  font-family: Arial, sans-serif;
  
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 20px;

  h1 {
    color: #000;
    /* Headline-md-ko */
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.72px;
    margin: 0px;
  }

  button {
    padding: 8px 16px;
    cursor: pointer;
    background-color: #A00000; /* 사용자 선호 색상 반영 */
    border: none;
    border-radius: 4px;
    color: white;
    color: #FFF;

    /* Body-tiny-md */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px; /* 150% */
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  margin-bottom: 37px;
`;

const InfoImage = styled.div`
  flex: 1;
  img {
    width: 320px;
    height: 450px;
    background-color: #f0f0f0;
  }
`;

const InfoDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0px 40px;
`;

const Item = styled.div`
  display: flex;
`;

const Label = styled.div`
    color: #000;
    width: 120px;
  /* Body-bold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Value = styled.div`
  color: #000;
  /* Body-me */
  width: 340px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 25px; /* 156.25% */
`;

const Rating = styled.div`
color: #000;

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 150% */
margin-left: 4px;
`

const LeftSection = styled.div`
`;

const RightSection = styled.div`
  margin-top: 83px;
`;

const RatingWrapper = styled.div`
  display:flex; 
  flexDirection: row;
  margin-top:8px;
  margin-bottom: 20px;
`;

const GroupPurchaseButton = styled.button`
  width: 300px;
  height: 40px;
  margin-top: 24px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Muit-Red-main, #A00000);
  background: var(--Muit-Red-main, #A00000);
  color: #FFF;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const SightLink = styled.div`
color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-top: 11px;
`
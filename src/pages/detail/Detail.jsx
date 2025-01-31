import React from "react";
import styled from "styled-components";
import posterImg from "../../assets/images/miafamiglia-poster.png";
import starFull from '../../assets/icons/star-full.svg';
import starOutline from '../../assets/icons/star-outline.svg';
import PerformanceDetails from "../../components/detail/PerformanceDetails";
import MainBanner from "../../components/detail/MainBanner";
import HeartLine from "../../assets/icons/heart-line.svg";
import Info from "../../components/detail/Info";
import Price from "../../components/detail/Price";
import Calendar from "../../components/Calendar";
import { RatingStars } from './../../components/detail/RatingStars';
import useFetch from "../../hooks/useFetch";

function Detail() {
  
  const url = `/musicals/2`;
  const { data, error, loading } = useFetch(url);

  if (loading) return <div>Loading...</div>;
  if (error || !data.isSuccess) return <div>데이터를 불러오지 못했습니다.</div>;

  const musical = data.result;
  const name = musical.name;
  const poster = musical.posterUrl || "";
  const details = [
    { label: "장소", value: musical.place },
    { label: "공연 기간", value: `${musical.perFrom} ~ ${musical.perTo}` },
    { label: "공연 시간", value: musical.runTime },
    { label: "관람 연령", value: musical.ageLimit },
    { label: "출연", value: musical.actorPreview.join(", ") },
    { label: "가격", value: <Price prices={musical.priceInfo} /> },
  ];

  return (
    <>
      {/*빨간배너 */}
      <MainBanner data={musical}/>
      {/* 본문 */}
      <MainContent>
        <div style={{margin:'60px 100px', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
           {/* 공연 상세 정보, 예매 버튼, 캐스팅 정보 등 구현 예정 */}
        <LeftSection>

        <TitleWrapper>
          <h1>{name}</h1>
          <img src={HeartLine} />
        </TitleWrapper>
        
        <RatingWrapper>
          <RatingStars rating={4} starSize={36}/>
          <Rating>4.0</Rating>
        </RatingWrapper>
        

        <Info image={poster} alt='포스터 이미지' height='430px' details={details} />

        {/*하단 nav bar */}
        <PerformanceDetails/>
        </LeftSection>

        <RightSection>
          <CalendarWrapper>
            <Calendar variant="compact"/>
            <hr />
            티켓 오픈 컴포넌트
          </CalendarWrapper>
          <GroupPurchaseButton>공동 구매하기</GroupPurchaseButton>
        </RightSection>
        </div>
      </MainContent>
   </>
    
  );
}

export default Detail;

const MainContent = styled.div`
  font-family: Arial, sans-serif;
  
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
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
    width: 120px;
    height: 28px;
    padding: auto;
    cursor: pointer;
    background-color: #A00000; /* 사용자 선호 색상 반영 */
    border: none;
    border-radius: 2px;
    color: white;
    color: #FFF;

    /* Body-tiny-md */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
  }
`;


const Rating = styled.div`
color: #000;

/* Body-tiny-md */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 36px; /* 150% */
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
  margin-bottom: 20px;
  position: relative;
  left: -6px;
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
  font-weight: 300;
  line-height: normal;
`

const CalendarWrapper = styled.div`
  width: 300px;
  border: 1px solid #E6E6E6;

  
  hr {
    border: none;
    border-top: 1px solid #E6E6E6;
    width: 90%;
    margin: 0px 16px;
  }
`

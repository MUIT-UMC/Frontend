import React from "react";
import styled from "styled-components";
import posterImg from "../assets/images/lost-pic.png";
import starFull from '../assets/icons/star-full.svg';
import starOutline from '../assets/icons/star-outline.svg';
import Info from "../components/detail/Info";
import Calendar from "../components/Calendar";
import pic from "../assets/images/lost-pic.png";
import ChevronDown from '../assets/icons/ChevronDown.svg';

function SmallDetail() {
  
  const poster = posterImg;
  const details = [
    { label: "장소", value: "홍익대학교 학생회관 3층 소극장"},
    { label: "공연 기간", value: "2024.10.03 목요일 19시" },
    { label: "공연 시간", value: "60분 (인터미션 없음)" },
    { label: "관람 연령", value: "중학생 이상 관람가" },
    { label: "출연", value: "권혁진, 백승민, 이승재, 이지후, 임유빈, 이서연" },
    { label: "가격", value: <Price>
      <div className="item">
        <div className="type">일반예매</div>
        <div className="price">10,000원</div>
      </div>
      <div className="item">
        <div className="type">지인, 홍대생 할인</div>
        <div className="price">7,000원</div>
      </div>
    </Price> }, // 가격 상세 구현 필요
    { label: "티켓 수", value: "200매 (표가 없을 시 구매 불가)" },
  ];
  
  return (
    <>
      {/*빨간배너 */}
       <BannerContainer>
                <Header>실종</Header>
                <TagWrapper>
                  <Tag>극중극</Tag>
                  <Tag>드라마</Tag>
                  <Tag>구덩이</Tag>
                </TagWrapper>
                <Quote>1998년 가을,</Quote>
                <Description>
                  ‘아무 국가기관'의 업무 보조를 하게 된 학생<br/>
                  모두가 동일한 것을 추구하는 사회에서 학생은 적응하지 못한다
                </Description>   
                <ChevronWrapper>
                  <img src={ChevronDown} style={{ display: 'block', marginTop: '20px' }} />
                </ChevronWrapper>
                
            </BannerContainer>

      {/* 본문 */}
      <MainContent>
        <div style={{margin:'60px 100px', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
           {/* 공연 상세 정보, 예매 버튼, 캐스팅 정보 등 구현 예정 */}
        <LeftSection>

        <TitleWrapper>
          <h1>실종</h1>
        </TitleWrapper>

        <Info image={poster} alt='포스터 이미지' height='430px' details={details} />

        {/*하단 nav bar */}
        </LeftSection>

        <RightSection>
          <PurchaseButton>예매하러 가기</PurchaseButton>
        </RightSection>
        </div>
      </MainContent>
   </>
    
  );
}

export default SmallDetail;
/*빨간배너 */
const BannerContainer = styled.div`
  background: linear-gradient(
      var(--Muit-Red-main, #A00000),
      rgba(160, 0, 0, 0.5)
    ),
   url(${pic}) no-repeat center center / cover;
  width: 1250px;
  height:822px;
  padding: 101px 95px;
  position: relative;
`;

const Header = styled.div`
  color: #FFF;
  /* Headline-lg-ko */
  margin:0;
  padding:0;
  margin-bottom:20px;
  font-family: Pretendard;
  font-size: 80px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.6px;
`

const ChevronWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  img {
    display: block;
  }
`;

const Quote = styled.blockquote`
  color: #FFF;
  font-family: 'KoPub_Batang_Medium', serif;
  margin: 0px;
  margin-bottom: 28px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.div`
  color: #FFF;
  width: 870px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  line-height: 30px; /* 156.25% */
`
const Tag = styled.li`
  display: flex;
  width: 120px;
  height: 28px;
  padding: 1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, rgba(230, 230, 230, 0.7));

  color: #FFF;

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
`


const TagWrapper = styled.ul`
  display:flex; 
  flexDirection:row;
  gap:12px;
  padding:0px;
  margin-bottom: 136px;
          
`
/*메인*/
const MainContent = styled.div`
  font-family: Arial, sans-serif;
  
`;

const Price = styled.div`
  /* body-16-medium */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
  display: flex;
  flex-direction: column; /* 세로 방향 배치 */
  gap: 5px; /* 항목 간 간격 조절 */

  .item {
    display: flex; /* 가로 방향 배치 */
    align-items: center; /* 수직 가운데 정렬 */
  }

  .type {
    color: #919191;
  }

  .price {
    color: black;
    margin-left: 5px; /* 가격과의 간격 조절 */
  }
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


const LeftSection = styled.div`
`;

const RightSection = styled.div`
  margin-top: 63px;
`;

const PurchaseButton = styled.button`
  width: 300px;
  height: 40px;
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


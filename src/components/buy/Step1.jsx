import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import posterImg from "../../assets/images/lost-pic.png";

const Step1 = () => {
    const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동 처리
    const poster = posterImg;
    const data = 
        {
          title: "실종",
          location: "홍익대학교 학생회관 3층 소극장",
          duration: "2024.10.03 ~ 2024.10.05",
          date: "2024.10.03 (목)",
          time: "19:00",
        };
    

    return (
      <Container>
        <LeftSection>
        <Image src={poster} alt="뮤지컬 포스터" />
        </LeftSection>
        <RightSection>
          <Header>{data.title}</Header>
          <Location>{data.location}</Location>
          <Duration>{data.duration}</Duration>
          <Info>
            <TicketDetails>
              <div>뮤지컬 이름: <strong>뮤지컬 공연명</strong></div>
              <div>공연 위치: <strong>홍대</strong></div>
              <div>공연 날짜: <strong>2025-01-25</strong></div>
              <div>공연 시간: <strong>19:00</strong></div>
            </TicketDetails>
          </Info>
          <Button onClick={() => navigate('./step2')}>예약하기</Button>  {/* 페이지 전환 */}
        </RightSection>
      </Container>
    );
  };

  export default Step1;

  // 스타일 컴포넌트
  const Container = styled.div`
  max-width: 1440px;
  height: 864px;
  margin: 0 auto;
  position: relative;
    display: flex; /* 좌우로 섹션 배치 */
      gap: 234px;
`;
const LeftSection = styled.div`
  margin-top: 160px;
  display: flex;
  margin-left: 99px;
`;
const Image = styled.img`
  width: 500px;
  height: 704px;
  object-fit: cover; /* 이미지가 섹션에 맞게 조정됨 */
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-top: 160px;

`;

const Header = styled.div`
color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 25px;
`;
const Location = styled.div`
color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Duration = styled.div`
color: #919191;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Info = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`;

const Button = styled.button`
background-color: #007bff;
color: white;
padding: 10px 20px;
border: none;
cursor: pointer;
border-radius: 5px;
&:hover {
  background-color: #0056b3;
}
`;

const TicketDetails = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left: 20px;
`;


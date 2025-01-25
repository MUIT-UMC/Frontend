import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Step1 = () => {
    const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동 처리
  
    return (
      <Container>
        <StepWrapper>
          <StepHeader>1. 관람일/회차 선택</StepHeader>
          <StepInfo>
            <TicketImage src="https://via.placeholder.com/100" alt="뮤지컬 이미지" />
            <TicketDetails>
              <div>뮤지컬 이름: <strong>뮤지컬 공연명</strong></div>
              <div>공연 위치: <strong>홍대</strong></div>
              <div>공연 날짜: <strong>2025-01-25</strong></div>
              <div>공연 시간: <strong>19:00</strong></div>
            </TicketDetails>
          </StepInfo>
          <Button onClick={() => navigate('/step2')}>예약하기</Button>  {/* 페이지 전환 */}
        </StepWrapper>
      </Container>
    );
  };

  export default Step1;

  // 스타일 컴포넌트
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 20px;
`;

const StepWrapper = styled.div`
display: flex;
flex-direction: column;
width: 60%;
`;

const StepHeader = styled.div`
font-size: 24px;
margin-bottom: 10px;
font-weight: bold;
`;

const StepInfo = styled.div`
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

const TicketImage = styled.img`
width: 100px;
height: 100px;
object-fit: cover;
`;

const TicketDetails = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left: 20px;
`;


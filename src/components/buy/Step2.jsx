import React,{ useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

// Step2 - 할인 선택
const Step2 = () => {
    const [discount, setDiscount] = useState('없음');
    const [ticketCount, setTicketCount] = useState(1);
    const price = 10000; // 티켓 가격 (예시)
    const totalPrice = price * ticketCount;
    const navigate = useNavigate();  // useNavigate 훅 사용
  
    const handleDiscountChange = (discountOption) => {
      setDiscount(discountOption);
    };
  
    return (
      <Container>
        <StepWrapper>
          <StepHeader>2. 할인 선택</StepHeader>
          <StepInfo>
            <div>
              <h4>현재 단계</h4>
              <div>1. 관람일/회차 선택</div>
              <div>2. 할인 선택 (현재 단계)</div>
            </div>
            <div>
              <div>일시: 2025-01-25 19:00</div>
              <div>인원: {ticketCount}</div>
              <div>티켓 금액: {price}원</div>
              <div>할인: {discount}</div>
              <TicketPrice>
                <div>총 결제 금액: {discount === '홍대생 할인' ? totalPrice * 0.9 : totalPrice}원</div>
              </TicketPrice>
            </div>
          </StepInfo>
          <Button onClick={() => navigate('/step1')}>이전</Button>  {/* 이전 페이지로 이동 */}
          <Button onClick={() => navigate('/step3')}>다음</Button>  {/* 다음 페이지로 이동 */}
          <div>
            <h4>할인 선택</h4>
            <Button onClick={() => handleDiscountChange('없음')}>할인 없음</Button>
            <Button onClick={() => handleDiscountChange('홍대생 할인')}>홍대생 할인</Button>
          </div>
        </StepWrapper>
      </Container>
    );
  };
  export default Step2;

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


const TicketPrice = styled.div`
font-size: 18px;
margin-top: 10px;
`;

import React from "react";
import styled from "styled-components";

// Step3 - 배송 선택 및 주문자 확인
const Step3 = () => {
  return (
    <Container>
      <StepWrapper>
        <StepHeader>3. 배송 선택 & 주문자 확인</StepHeader>
        <StepInfo>
          <div>배송 방법: 일반 배송</div>
          <div>주문자 확인: 김홍대</div>
        </StepInfo>
        <Button>결제하기</Button>
      </StepWrapper>
    </Container>
  );
};

export default Step3;

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

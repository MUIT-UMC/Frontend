import React,{ useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

// Step2 - 할인 선택
const Step2 = () => {

    const navigate = useNavigate();  // useNavigate 훅 사용
  

    return (
        <Container>
        <Sidebar>
          <Step >01 관람일/회차 선택</Step>
          <Step active>02 할인 선택</Step>
          <Step>03 배송 선택/주문자 확인</Step>
          <Step>04 결제하기</Step>
        </Sidebar>
        <Content>
            <LeftContent>
          <Title>실종</Title>
          <Subtitle>홍익대학교 학생회관 3층 소극장</Subtitle>
          <DateRange>2024.10.03~2024.10.05</DateRange>
          <DiscountBox>
            <DiscountTitle>할인 선택</DiscountTitle>
            <Options>
              <Option>
                <RadioButton type="radio" name="discount" defaultChecked /> 할인 없음
              </Option>
              <Option>
                <RadioButton type="radio" name="discount" /> 홍대생 할인
              </Option>
              <Option>
                <RadioButton type="radio" name="discount" /> 지인 할인
              </Option>
            </Options>
          </DiscountBox>
          </LeftContent>
          <Summary>
            <Row>
              <Label>일시</Label>
              <Value>2024.10.03 (목) 19:00</Value>
            </Row>
            <Row>
              <Label>인원</Label>
              <Value>1</Value>
            </Row>
            <Row>
              <Label>티켓 금액</Label>
              <Value>10,000원</Value>
            </Row>
            <Row>
              <Label>할인</Label>
              <Value>0원</Value>
            </Row>
            <Row>
              <Label>배송료</Label>
              <Value>-</Value>
            </Row>
            <TotalRow>
            <TotalLabel>총 결제 금액</TotalLabel>
            <TotalValue>10,000원</TotalValue>
          </TotalRow>
          <Button onClick={() => navigate('..')}>이전</Button>  {/* 이전 페이지로 이동 */}
        <Button onClick={() => navigate('../step3')}>다음</Button>  {/* 다음 페이지로 이동 */}
          </Summary>
        </Content>
          </Container>
    );
  };
  export default Step2;


const Container = styled.div`
  max-width: 1440px;
  height: 864px;
  display: flex;
    margin: 0 auto;
  position: relative;
  padding: 40px;
  font-family: "Pretendard", sans-serif;
 gap: 115px;
`;

const Sidebar = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Step = styled.div`
display: flex;
width: 180px;
height: 24px;
align-items: center;
padding: 8px 20px;
gap: 20px;
flex-shrink: 0;
border-radius: 3px;
margin-left: 60px;
  border: 1px solid ${({ active }) => (active ? "#A00000" : "#E6E6E6")};
  background-color: ${({ active }) => (active ? "#A00000" : "#fffff")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#919191")};

  /* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Content = styled.div`
    display: flex;
  flex: 1;
  gap:110px;
`;
const LeftContent = styled.div`
margin-top:-40px;
      flex-direction: column;
        padding-left: 85px;
`;

const Title = styled.h1`
  color: #000;

/* Headline-md-ko */
font-family: Pretendard;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.72px;
  margin-bottom: 10px;
`;

const Subtitle = styled.div`
 color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
  margin-bottom: 3px;
`;

const DateRange = styled.div`
 color: #919191;

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
  margin-bottom: 20px;
`;

const DiscountBox = styled.div`
display: flex;
width: 360px;
height: 184px;
padding: 20px;
flex-direction: column;
align-items: flex-start;
gap: 20px;
flex-shrink: 0;
border-radius: 3px;
border: 1px solid var(--Gray-outline, #E6E6E6);
  margin-bottom: 20px;
`;

const DiscountTitle = styled.div`
  color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #000;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const RadioButton = styled.input`
width: 20px;
height: 20px;
flex-shrink: 0;
fill: var(--gray-white-bg, #FFF);
stroke-width: 5px;
  accent-color: #A00000;
`;

const Summary = styled.div`
  padding: 20px;
  margin-top:90px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Label = styled.div`
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Value = styled.div`
  color: #000;
margin-right:200px;
/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-top: 200px;
`;

const TotalLabel = styled.div``;

const TotalValue = styled.div`
  color: #b71c1c;
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


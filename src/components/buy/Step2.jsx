import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

//import useFetch from "../../hooks/useFetch";
import useCustomFetch from "../../hooks/useCustomFetch";
//const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");
import { useLocation } from "react-router-dom";

// Step2 - 할인 선택
const Step2 = () => {

  const {amateurId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const peopleCount = location.state?.peopleCount || 1;
  const [selectedTicketId, setSelectedTicketId] = useState("1");
    
  const url = `/tickets/${amateurId}/ticketInfo`;
  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;
  if (!data || !data.result) return <div>데이터가 없습니다.</div>;

  const ticketInfo = data.result;


  // 🎯 선택된 티켓 정보 찾기
  const selectedTicket = ticketInfo.tickets.find(ticket => ticket.amateurTicketId === selectedTicketId);
  const ticketPrice = selectedTicket ? selectedTicket.price : 0;

  // 🎯 할인 선택 핸들러
  const handleDiscountChange = (event) => {
    setSelectedTicketId(event.target.value);
  };
  const handleNextStep = () => {
    navigate('../step3', {
      state: {
        peopleCount,
        selectedTicketId,
        ticketInfo,
      },
    });
  };
  

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
          <Title>{ticketInfo.name}</Title>
          <Subtitle>{ticketInfo.place}</Subtitle>
          {/* <DateRange>{ticketInfo.schedule}</DateRange> */}
          <DiscountBox>
            <DiscountTitle>할인 선택</DiscountTitle>
            <Options>
              <Option>
                <RadioButton type="radio" 
                  name="discount" 
                  value="1" 
                  checked={selectedTicketId === "1"} 
                  onChange={handleDiscountChange} /> 할인 없음
              </Option>
              <Option>
                <RadioButton type="radio" 
                  name="discount" 
                  value="2" 
                  checked={selectedTicketId === "2"} 
                  onChange={handleDiscountChange} /> 홍대생 할인
              </Option>
              <Option>
                <RadioButton  type="radio" 
                  name="discount" 
                  value="2" 
                  checked={selectedTicketId === "2"} 
                  onChange={handleDiscountChange} /> 지인 할인
              </Option>
            </Options>
          </DiscountBox>
          </LeftContent>
          <Summary>
            <Row>
              <Label>일시</Label>
              <Value>{ticketInfo.schedule.split(' ')[0]}</Value>
            </Row>
            <Row>
              <Label>인원</Label>
              <Value>{peopleCount}</Value>
            </Row>
            <Row>
              <Label>티켓 금액</Label>
              <Value>{ticketPrice.toLocaleString()}원</Value>
            </Row>
            <Row>
              <Label>배송료</Label>
              <Value>-</Value>
            </Row>
            <TotalRow>
            <TotalLabel>총 결제 금액</TotalLabel>
            <TotalValue>{(ticketPrice * peopleCount).toLocaleString()}원</TotalValue>
          </TotalRow>
          <Button onClick={handleNextStep} active>다음</Button>  {/* 이전 페이지로 이동 */}
        <Button onClick={() => navigate('..')}>이전</Button>  {/* 다음 페이지로 이동 */}
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
 gap: 80px;
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
  gap:80px;
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
  display: flex;;
  margin-bottom: 20px;
  font-size: 16px;
gap:47px;
`;

const Label = styled.div`
  color: #000;
width: 100px;; 
/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Value = styled.div`
  color: ${({ active }) => (active ? "#A00000" : "#000")};
  width: 100%;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const TotalRow = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  margin-top: 140px;
  gap: 40px;
  flex-direction: row;
  margin-bottom: 40px;
`;

const TotalLabel = styled.div`
color: #000;
margin-top: 10px;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;`;

const TotalValue = styled.div`
  color: var(--Muit-Red-main, #A00000);

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Button = styled.button`
border-radius: 3px;
border: 1px solid  ${({ active }) => (active ? "#A00000" : "#E6E6E6")};
background: ${({ active }) => (active ? "#A00000" : "#FFF")};
display: flex;
width: 400px;
height: 40px;
padding: 10px 172px;
justify-content: center;
align-items: center;
gap: 10px;
cursor: pointer;
color: ${({ active }) => (active ? "#FFF" : "#000")};

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom:18px;
`;


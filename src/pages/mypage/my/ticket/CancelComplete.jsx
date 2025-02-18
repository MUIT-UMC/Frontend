import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TicketContainer from "../../../../components/mypage/myticket/TicketContainer";
import posterImg from "../../../../assets/images/miafamiglia-poster.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

const token = localStorage.getItem("accessToken");

function CancelComplete() {

  const {memberTicketId} = useParams();

  const navigate = useNavigate();

  const url = `/tickets/myTickets/${memberTicketId}`;

  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },);

  const { 
    amateurShowName, 
    place,
    posterImgUrl,
    quantity, 
    reservationDate,
    reservationStatus,
    schedule,
 } = data?.result || {};

  return (
    <Wrapper>
      <Content>
      <Title>예매 취소가 정상적으로 접수되었습니다</Title>
      <div>
        <Text mb='12px'>{amateurShowName} {quantity}매 예매 취소가 완료되었습니다.</Text>
        <Text  mb='12px'>취소 내역 확인 버튼을 선택하시면 취소 내역 페이지로 이동합니다. <br />
        취소가 완료되면 취소 완료 SMS가 발송됩니다.</Text>
        <Text  mb='60px'>SMS 미수신 시, 꼭 마이페이지- 내 티켓에서 취소 여부를 확인해주세요. <br />
        감사합니다.</Text>
      </div>
      <Button onClick={() => navigate(`/ticket/${memberTicketId}`)}>취소 내역 확인하기</Button>
      </Content>
      
    </Wrapper>
  );
}

export default CancelComplete;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

`
const Content = styled.div`
width: 480px;
display: flex;
flex-direction: column;
align-items:center;
margin-top: 180px;
`
const Title = styled.div`
  color: #A00000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 40px;
`

const Text = styled.div`
color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: ${(props) => props.fontWeight ? props.fontWeight : '500'};
line-height: 25px; /* 156.25% */
margin-bottom: ${(props) => props.mb ? props.mb : '0px'};
margin-top: ${(props) => props.mt ? props.mt : '0px'};
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items:center;

  margin-top: 60px;
   button {
    
  }
`
const Button = styled.button`
  display: flex;
    width: 400px;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 3px;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: ${(props) => props.color || '#FFF'};

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const CancelButton = styled.button`
  display: flex;
  width: 400px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease;
  
  &:disabled {
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-sub, #919191);
    cursor: not-allowed;
  }
`;


const AgreeText = styled.div`
color: var(--Gray-maintext, #000);

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
display: flex;
  align-items: center; /* 세로 정렬 */
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Muit-Red-main, #A00000);
  margin-right: 10px;

  &:checked {
    background-color: var(--Muit-Red-main, #A00000);
    border-color: var(--Muit-Red-main, #A00000);
  }

  &:focus {
    outline: none;
  }
`;
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TicketContainer from "../../../../components/mypage/myticket/TicketContainer";
import posterImg from "../../../../assets/images/miafamiglia-poster.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../../../hooks/useFetch";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

const token = localStorage.getItem("accessToken");
console.log(token);


function CancelTicket() {

  const {memberTicketId} = useParams();
    console.log(memberTicketId);

  const [isChecked, setIsChecked] = useState(false);

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
 
 const korStatus = {
  RESERVE_AWAIT: "입금 대기중",
  RESERVED: "예매 완료",
  EXPIRED: "사용 완료",
  CANCEL_AWAIT: "취소 대기중",
  CANCELED: "예매 취소",

 }


 console.log(data);

 const handleCancelClick = async () => {
  // 취소 요청 URL
  const cancelUrl = `${serverUrl}/tickets/myTickets/${memberTicketId}/cancel`;

  try {
    // PATCH 요청 보내기
    const response = await fetch(cancelUrl, {
      method: 'PATCH', // PATCH 요청으로 변경
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        'Content-Type': 'application/json',
      },
    });

    // API 응답 확인
    if (response.ok) {
      // 예매 취소후 'complete' 페이지로 이동
      setLastCanceledTicket({
        amateurShowName: amateurShowName,
        quantity: quantity,
        memberTicketId: memberTicketId, // Example ticket ID
      });
  
      navigate(window.location.pathname + '/complete');
    } else {
      // 에러 처리 (예: 실패 시 메시지 표시)
      console.error('취소 실패', response.status);
    }
  } catch (error) {
    // 네트워크 오류 등 예외 처리
    console.error('API 요청 중 오류 발생:', error);
  }
};

  return (
    <Wrapper>
      <Title>예매 취소</Title>
      <Text mb='20px'>{amateurShowName} {quantity}매를 예매 취소하시겠습니까?</Text>
      <TicketContainer details={data?.result} image={posterImg}/>
      <Text fontWeight='700' mt='40px' mb='24px'>예매 취소에 관한 취소 수수료에 대한 내용을 숙지하셨나요?</Text>
      <AgreeText>
      <Checkbox 
          type="checkbox" 
          checked={isChecked} 
          onChange={() => setIsChecked(!isChecked)} 
        /> 숙지하였으며 동의합니다.
      </AgreeText>
      <ButtonWrapper>
        <CancelButton disabled={!isChecked} onClick={handleCancelClick}>예매 취소</CancelButton>
        <Button>취소</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default CancelTicket;

const Wrapper = styled.div`
  margin: 102px 382px;

`
const Title = styled.div`
  color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 16px;
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
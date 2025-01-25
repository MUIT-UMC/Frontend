import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TicketContainer from "../../../../components/mypage/myticket/TicketContainer";
import posterImg from "../../../../assets/images/miafamiglia-poster.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CancelTicket() {
  const poster = posterImg; 
  const details = [ 
    { label: "예매번호", value: "T0000000000" },
    { label: "예매일", value: "2025-01-15" },
    { label: "장소", value: "링크아트센터드림 드림1관" },
    { label: "관람일시", value: "2025-03-21 (금) 14:30 1회" },
    { label: "취소가능일시", value: "2025-03-20 (목) 17:00 까지" },
    { label: "상태", value: "예매완료 (무통장 미입금)" },
  ];
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const handleCancelClick = () => {
    const currentUrl = window.location.pathname; // 현재 URL 가져오기
    navigate(currentUrl + '/complete'); // '/cancel'을 URL 뒤에 추가하여 이동
  };

  return (
    <Wrapper>
      <Title>예매 취소</Title>
      <Text mb='20px'>미아 파밀리아 2매를 예매 취소하시겠습니까?</Text>
      <TicketContainer details={details} image={posterImg}/>
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
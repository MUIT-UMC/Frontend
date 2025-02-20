import React from "react";
import styled from "styled-components";
import ChevronRight from "../../../assets/icons/ChevronRight.svg";
import { useNavigate } from "react-router-dom";
const TicketContainer = ({ alt, details, isDisabled }) => {

  const { 
    amateurShowName, 
    memberTicketId,
    place,
    posterImgUrl,
    quantity, 
    reservationDate,
    reservationStatus,
    schedule,
    cancelDate,
 } = details || {};

 const korStatus = {
  RESERVE_AWAIT: "입금 대기중",
  RESERVED: "예매 완료",
  EXPIRED: "사용 완료",
  CANCEL_AWAIT: "취소 대기중",
  CANCELED: "예매 취소",
 }
  const navigate = useNavigate();
  
  const handleClick = (ticketNumber) => {
    navigate(`/ticket/${ticketNumber}`);
  };

  
 const date = new Date(schedule?.split(' ')[0]);
 const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
 const dayOfWeek = daysOfWeek[date.getDay()];

 console.log(dayOfWeek); // 예: 수

  return (
    <Wrapper reservationStatus={reservationStatus}>
      <InfoImage>
        <img alt={alt} src={posterImgUrl}/>
      </InfoImage>
      <InfoDetail onClick={() => handleClick(memberTicketId)}>
        <div style={{marginBottom:'18px'}}>
          <span>{amateurShowName}</span><span style={{marginLeft: '8px'}}>{quantity}매</span>
        </div>
          <Item>
            <Label>예매일</Label>
            <Value  
            >{reservationDate?.split('T')[0]}</Value>
          </Item>
          <Item>
            <Label>장소</Label>
            <Value  
            >{place}</Value>
          </Item>
          <Item>
            <Label>관람일시</Label>
            <Value  
            >{schedule?.split(' ')[0]} ({dayOfWeek}) {schedule?.split(' ')[1]}</Value>
          </Item>
          <Item>
            <Label>취소가능일시</Label>
            <Value  
            >{cancelDate}</Value>
          </Item>
          <Item>
            <Label>상태</Label>
            <Value color="#A00000"  
            >{korStatus[reservationStatus]}</Value>
          </Item>
      </InfoDetail>
      <ChevronWrapper onClick={() => handleClick(memberTicketId)}>
      <img src={ChevronRight} />
      </ChevronWrapper>
      
    </Wrapper>
  );
};

export default TicketContainer;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  width: 780px;
  padding: 12px 20px;
  padding-right: 4px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  background-color: ${({ reservationStatus }) =>
    reservationStatus === "CANCELED" ? "#F5F5F5" : "transparent"};
`;

const InfoImage = styled.div`
  img {
    width: ${(props) => props.width ? props.width : '140px'};
    height: ${(props) => props.height ? props.height : '200px'};
    background-color: #f0f0f0;
  }
`;

const InfoDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0px 40px;
  
  div > span {
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
  }
`;

const Item = styled.div`
  display: flex;
`;

const Label = styled.div`
width: 120px;
color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`;

const Value = styled.div`
  color: ${(props) => (props.color ? props.color : "#000")};
  width: ${(props) => (props.width ? props.width : "340px")};

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`;

const SightLink = styled.div`
  color: var(--Gray-sub, #919191);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const ChevronWrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  height: 204px;
`
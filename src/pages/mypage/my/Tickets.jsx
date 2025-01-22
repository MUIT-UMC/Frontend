import React from "react";
import BoardMenu from "../../../components/board/BoardMenu";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TicketContainer from "../../../components/mypage/myticket/TicketContainer";
import posterImg from "../../../assets/images/miafamiglia-poster.png";
import TicketDetail from "../../../components/mypage/myticket/TicketDetail";
function Tickets() {
  
  const poster = posterImg;
  const details = [
    { label: "예매번호", value: "T0000000000"},
    { label: "예매일", value: "2025-01-15" },
    { label: "장소", value: "링크아트센터드림 드림1관" },
    { label: "관람일시", value: "2025-03-21 (금) 14:30 1회" },
    { label: "취소가능일시", value: "2025-03-20 (목) 17:00 까지" },
    { label: "상태", value: "예매완료 (무통장 미입금)" },
  ];

  const details2 = [
    { label: "예매번호", value: "T0000000000", },
    { label: "예매일", value: "2025-01-15" },
    { label: "장소", value: "링크아트센터드림 드림1관" },
    { label: "관람일시", value: "2025-03-21 (금) 14:30 1회" },
    { label: "상태", value: "예매완료 (무통장 미입금)" },
    { label: "취소가능일시", value: "2025-03-20 (목) 17:00 까지" ,  
      extra: [
        {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
        {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
        {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
        {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
  ]},
    
  ];
  return (
    <>
      <Wrapper>
        <h2>티켓 컴포넌트</h2>
        <TicketContainer image={posterImg} details={details}/>
        <h2>티켓 상세정보 컴포넌트</h2>
        <TicketDetail image={posterImg} details={details2}/>
      </Wrapper>
      
    </>
  );
}

export default Tickets;

const Wrapper = styled.div`
display: flex;
gap: 16px;
flex-direction: column;
`
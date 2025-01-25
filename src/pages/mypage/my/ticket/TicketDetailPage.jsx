import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TicketDetail from "../../../../components/mypage/myticket/TicketDetail";
import posterImg from "../../../../assets/images/miafamiglia-poster.png";
  const poster = posterImg;
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

function  TicketDetailPage() {
  return (
    <Wrapper>
      <TicketDetail image={posterImg} details={details2}/>
    </Wrapper>
  );
}

export default TicketDetailPage;

const Wrapper = styled.div`
  margin: 80px 100px;
`
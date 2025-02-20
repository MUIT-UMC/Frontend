// components/detail/InfoWrapper.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TicketContainer from "../../../../components/mypage/myticket/TicketContainer";
import useCustomFetch from "../../../../hooks/useCustomFetch";
const token = localStorage.getItem("accessToken");
console.log(token);

const TicketList = ({ status }) => {
  
  const queryString = new URLSearchParams({
    reservationStatus: status
  }).toString();

  const url = status ? `/tickets/myTickets?${queryString}` : `/tickets/myTickets`;

  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },);

  console.log(data);
  return (
<>
  {loading && <div>로딩 중...</div>}
  {error && <div>에러 발생: {error}</div>}
  {!loading && !error && (
    data?.result?.tickets?.length > 0 ? (
      <TicketWrapper>
        {data.result.tickets.map((details, index) => (
          <TicketContainer key={index} details={details} />
        ))}
      </TicketWrapper>
    ) : (
      <div>
        {status === "CANCELED" ? 
          "예매 취소한 티켓이 없습니다." : 
          status === "RESERVED" ? 
          "예매 완료된 티켓이 없습니다." : 
          "예매한 티켓이 없습니다."
        }
      </div>
    )
  )}
</>
  )
};

export default TicketList;

const TicketWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 16px;
`
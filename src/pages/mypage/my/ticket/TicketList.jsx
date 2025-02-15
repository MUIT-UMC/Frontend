// components/detail/InfoWrapper.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TicketContainer from "../../../../components/mypage/myticket/TicketContainer";
import useCustomFetch from "../../../../hooks/useCustomFetch";
const token = localStorage.getItem("token");
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
      <TicketWrapper>
            {data?.result?.tickets?.map((details, index) => (
                <TicketContainer key={index} details={details} />
              ))}
          </TicketWrapper>
    </>
  )
};

export default TicketList;

const TicketWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 16px;
`
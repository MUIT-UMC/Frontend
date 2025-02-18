import React from "react";
import BoardMenu from "../../../components/board/BoardMenu";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import TicketContainer from "../../../components/mypage/myticket/TicketContainer";
import posterImg from "../../../assets/images/miafamiglia-poster.png";
import TicketDetail from "../../../components/mypage/myticket/TicketDetail";
import TicketList from "./ticket/TicketList";
import useFetch from "../../../hooks/useFetch";
// const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");
console.log(token);


function Tickets() {
  const [activeTab, setActiveTab] = useState("전체보기"); // 기본 활성화 탭
  const poster = posterImg;

  const url = `/tickets/myTickets`;

  return (
    <>
      <Wrapper>
      <NavBar>
        <NavItem onClick={() => setActiveTab("전체보기")} active={activeTab === "전체보기"}>전체보기</NavItem>
        <NavItem onClick={() => setActiveTab("예매완료")} active={activeTab === "예매완료"}>예매완료</NavItem>
        <NavItem onClick={() => setActiveTab("예매취소")} active={activeTab === "예매취소"}>예매취소</NavItem>
      </NavBar>

      <ContentWrapper>
        {activeTab === "전체보기" && (
          <TicketList />
        )}

        {activeTab === "예매완료" && (
          <>
            <h2>예매완료</h2>
            <TicketList status="RESERVED"/>
          </>
        )}

        {activeTab === "예매취소" && (
          <>
            <h2>예매취소</h2>
            <p>예매 취소의 경우 티켓컨테이너가 회색으로 보인다.</p>
            <TicketList status="CANCELED"/>
          </>
        )}
      </ContentWrapper>
        {/*<TicketContainer image={posterImg} details={details}/>*/}
        {/*<TicketDetail image={posterImg} details={details2}/>*/}
      </Wrapper>
      
    </>
  );
}

export default Tickets;

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const NavBar = styled.nav`
  display: flex;
  gap: 20px;
  margin-bottom: 60px;
  margin-top: 16px;
`;

const NavItem = styled.div`
  color: ${(props) => (props.active ? "#A00000" : "#919191")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


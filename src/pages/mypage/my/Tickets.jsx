import React from "react";
import BoardMenu from "../../../components/board/BoardMenu";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import TicketContainer from "../../../components/mypage/myticket/TicketContainer";
import posterImg from "../../../assets/images/miafamiglia-poster.png";
import TicketDetail from "../../../components/mypage/myticket/TicketDetail";
function Tickets() {
  const [activeTab, setActiveTab] = useState("전체보기"); // 기본 활성화 탭
  const poster = posterImg;
  const details = [ [
    { label: "예매번호", value: "T0000000000" },
    { label: "예매일", value: "2025-01-15" },
    { label: "장소", value: "링크아트센터드림 드림1관" },
    { label: "관람일시", value: "2025-03-21 (금) 14:30 1회" },
    { label: "취소가능일시", value: "2025-03-20 (목) 17:00 까지" },
    { label: "상태", value: "예매완료 (무통장 미입금)" },
  ],
  [
    { label: "예매번호", value: "T0000000001" },
    { label: "예매일", value: "2025-02-05" },
    { label: "장소", value: "서울시립미술관" },
    { label: "관람일시", value: "2025-04-10 (목) 15:00 1회" },
    { label: "취소가능일시", value: "2025-04-09 (수) 17:00 까지" },
    { label: "상태", value: "예매완료 (무통장 미입금)" },
  ],
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
      <NavBar>
        <NavItem onClick={() => setActiveTab("전체보기")} active={activeTab === "전체보기"}>전체보기</NavItem>
        <NavItem onClick={() => setActiveTab("예매완료")} active={activeTab === "예매완료"}>예매완료</NavItem>
        <NavItem onClick={() => setActiveTab("예매취소")} active={activeTab === "예매취소"}>예매취소</NavItem>
      </NavBar>

      <ContentWrapper>
        {activeTab === "전체보기" && (
          <TicketWrapper>
            {details.map((details, index) => (
                <TicketContainer key={index} image={posterImg} details={details} />
              ))}
          </TicketWrapper>
        )}

        {activeTab === "예매완료" && (
          <>
            <h2>예매완료</h2>
          </>
        )}

        {activeTab === "예매취소" && (
          <>
            <h2>예매취소</h2>
            <p>예매 취소의 경우 티켓컨테이너가 회색으로 보인다.</p>
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

const TicketWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 16px;
`
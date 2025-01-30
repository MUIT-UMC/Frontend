import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import SubMenu from "../../components/board/SubMenu";
import LostBoard from "./item/LostBoard";
import FoundBoard from "./item/FoundBoard";
import BoardMenu from "../../components/board/BoardMenu";
import { useNavigate } from "react-router-dom";
import AllBoard from "./anonymous/AllBoard";
import HotBoard from "./anonymous/HotBoard";
import MusicalBoard from "./review/MusicalBoard";
import SeatsBoard from "./review/SeatsBoard";
import { useState } from "react";
import { useEffect } from "react";

function Board() {
  const { category, type } = useParams();
  const navigate = useNavigate();
  
  const categories = {
    item: {
      name: "분실물",
      navItems: [
        { id: "lost", name: "분실", link: "/board/item/lost" },
        { id: "found", name: "습득", link: "/board/item/found" },
      ],
    },
    anonymous: {
      name: "익명",
      navItems: [
        { id: "all", name: "전체", link: "/board/anonymous/all" },
        { id: "hot", name: "HOT", link: "/board/anonymous/hot" },
      ],
    },
    review: {
      name: "리뷰",
      navItems: [
        { id: "musical", name: "뮤지컬 리뷰", link: "/board/review/musical" },
        { id: "seats", name: "시야 리뷰", link: "/board/review/seats" },
      ],
    },
  };

  const currentCategory = categories[category];

  const menus = [
    {
      id: 'item',
      title: "분실물 게시판",
      color: "#A00000",
      subMenus: [
        { id: 'lost', name: "분실", link: "/board/item/lost", color: "#A00000" },
        { id: 'found', name: "습득", link: "/board/item/found" },
      ],
    },
    {
      id: 'anonymous',
      title: "익명 게시판",
      subMenus: [
        { id: 'all', name: "전체", link: "/board/anonymous/all" },
        { id: 'hot', name: "HOT", link: "/board/anonymous/hot" },
      ],
    },
    {
      id: 'review',
      title: "리뷰 게시판",
      subMenus: [
        { id: 'musical', name: "뮤지컬 리뷰", link: "/board/review/musical" },
        { id: 'seats', name: "시야 리뷰", link: "/board/review/seats" },
      ],
    },
  ];

  const handleWriteClick = () => {
    if (type === "lost" || type === "found") {
      navigate("/board/item/write");
    } else if (type === "all" || type === "hot") {
      navigate("/board/anonymous/write");
    } else if (type === "musical" || type === "seats") {
      navigate("/board/review/write");
    }
  };

  return (
    <BoardContainer>
      <BoardMenuWrapper>
        <BoardMenu
          menus={menus}
          currentCategory={category}
          currentType={type}
        />
      </BoardMenuWrapper>
      <BoardContent>
        <TitleWrapper>
          <Title>{currentCategory?.name} 게시판</Title>
          <Button onClick={handleWriteClick}>글쓰기</Button>
        </TitleWrapper>
        <SubMenu
          navItems={currentCategory?.navItems || []}
          currentType={type}
        />
        <Content>
          {type === "lost" && <LostBoard />}
          {type === "found" && <FoundBoard />}
          {/* ...다른 타입 컴포넌트 */}
          {type === "all" && <AllBoard />}
          {type === "hot" && <HotBoard />}
          {type === "musical" && <MusicalBoard />}
          {type === "seats" && <SeatsBoard />}
        </Content>
      </BoardContent>
    </BoardContainer>
  );
};

export default Board;


const BoardContainer = styled.div`
  margin: 100px 104px;
  display: grid;
  grid-template-columns: auto 1fr; /* 첫 번째 컬럼은 자동 크기, 두 번째 컬럼은 남은 공간을 차지 */
   grid-auto-rows: auto; /* 행 높이는 자동 크기 */
  column-gap: 112px; /* 컬럼 간의 간격 설정 */
`;

const BoardMenuWrapper = styled.div`
  align-self: start; /* 메뉴를 상단에 고정 (높이 늘어나지 않도록) */
`;



const BoardContent = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
`
const Title = styled.div`
  color: #000;

/* Headline-md-ko */
font-family: Pretendard;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.72px;
`

const BoardHeader = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  
  h1 {
    margin: 0;
  }
`;

const Button = styled.button`
 display: flex;
    width: 80px;
    height: 28px;
    padding: 5px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 3px;
    background: ${(props) => props.background ? props.background :'#A00000'};
    border: 1px solid var(--Muit-Red-main, #A00000);
    margin: 0px;
    margin-bottom: ${(props) => props.marginBottom? props.marginBottom : '0px' };

    color: ${(props) => props.color ? props.color : '#FFF' };

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;

`
const Content = styled.div`
`
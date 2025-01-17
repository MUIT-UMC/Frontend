import React, { useState } from "react";
import styled from "styled-components";
import BoardMenu from "../../components/board/BoardMenu";
import LostItemSearchBar from "../../components/board/LostItemSearchBar";
import PostList from "../../components/board/PostList";
import ChevronRight from "../../assets/icons/ChevronRight.svg";
import ChevronLeft from "../../assets/icons/ChevronLeft.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Board() {
  const { category, type } = useParams();
  const navigate = useNavigate();

  let categoryName;
  let navItems;

  const menus = [
    {
      title: "분실물 게시판",
      color: "#A00000",
      subMenus: [
        { name: "분실", link: "/board/item/lost", color: "#A00000" },
        { name: "습득", link: "/board/item/found" },
      ],
    },
    {
      title: "익명 게시판",
      subMenus: [
        { name: "전체", link: "/board/anonymous/all" },
        { name: "HOT", link: "/board/anonymous/hot" },
      ],
    },
    {
      title: "리뷰 게시판",
      subMenus: [
        { name: "뮤지컬 리뷰", link: "/board/review/musical" },
        { name: "시야 리뷰", link: "/board/review/seats" },
      ],
    },
  ];
  
  switch(category) {
    case "item":
      categoryName = "분실물";
      navItems = [
        { id: 'lost', name: '분실' },
        { id: 'found', name: '습득' },
      ];
      break;
    case "anonymous":
      categoryName = "익명";
      navItems = [
        { id: 'all', name: '전체' },
        { id: 'hot', name: 'HOT' },
      ];
      break;
    case "review":
      categoryName = "리뷰";
      navItems = [
        { id: 'musical', name: '뮤지컬 리뷰' },
        { id: 'seats', name: '시야 리뷰' },
      ];
      break;
  }
  
  return (
    <>
      <BoardContainer>
        <BoardMenuWrapper>
        <BoardMenu menus={menus} />
        </BoardMenuWrapper>
        <BoardContent>
          {/* 헤더*/}
          <BoardHeader>
          <h1>{categoryName} 게시판</h1><Button>글쓰기</Button>
          </BoardHeader>
          <SubMenu>
          {navItems.map((item) => (
          <NavItem
            key={item.id}
            isActive={type === item.id}
            onClick={() => {
              navigate(`/board/${category}/${item.id}`);
            }}
            
          >
            {item.name}
          </NavItem>
        ))}
          </SubMenu>

          <Content>
        {type === 'lost' && <>
          <ButtonWrapper>
            <Button background='none' color='#A00000' marginBottom='8px'>검색</Button>
          </ButtonWrapper>
          <LostItemSearchBar />
          <PostList />  
          <PageNavigatorWrapper>
          <Img src={ChevronLeft} />
            <PageNumber>1</PageNumber>
            <PageNumber>2</PageNumber>
            <PageNumber>3</PageNumber>
            <PageNumber color='#A00000'>4</PageNumber>
          <Img src={ChevronRight} visibility="hidden"/>
        </PageNavigatorWrapper>
        </>}
        {type === 'found' && <div>캐스팅 정보 내용</div>}
        {type === 'view-guide' && <div>시야 확인 내용</div>}
        {type === 'reviews' && <div>관람 후기 내용</div>}
      </Content>
         
        </BoardContent>
      {/* 게시판 목록, 글쓰기, 글 상세 보기 등 구현 예정 */}
    </BoardContainer>
    </>
    
  );
}

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  padding: 0;
  `
const SubMenu = styled.div`
display: flex;
flex-direction: row;
gap: 24px;
margin-bottom: 24px;

div {
  color: ${(props) => props.color ? props.color : '#919191'};
  /* Title-md */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
`

const PageNavigatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center;
  margin-top: 40px;
  
`

const Img = styled.img`
visibility: ${(props) => props.visibility ? props.visibility : 'visible'};
`

const PageNumber = styled.div`
  color: ${(props) => props.color ? props.color : '#919191'};
`

const NavItem = styled.div`
  color: ${(isActive) => isActive ? '#A00000' : '#919191'};
  font-weight: ${(isActive) => isActive ? '700' : '300'};
`

const Content = styled.div`
`
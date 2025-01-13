import React from "react";
import styled from "styled-components";
import BoardMenu from "../components/board/BoardMenu";
import LostItemSearchBar from "../components/board/LostItemSearchBar";
import PostList from "../components/board/PostList";
function Board() {
  return (
    <>
      <BoardContainer>
        <BoardMenuWrapper>
        <BoardMenu />
        </BoardMenuWrapper>
        <BoardContent>
          <BoardHeader>
          <h1>분실물 게시판</h1><Button>글쓰기</Button>
          </BoardHeader>
          <SubMenu>
            <div style={{color: '#A00000', fontWeight: '700'}}>분실</div>
            <div>습득</div>
          </SubMenu>
          <ButtonWrapper>
            <Button background='none' color='#A00000' marginBottom='8px'>검색</Button>
          </ButtonWrapper>
          <LostItemSearchBar />
          <PostList />  
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
import React from "react";
import styled from "styled-components";
import PostList from "../../../components/board/PostList";
import SearchContainer from "../../../components/board/SearchContainer";
const SeatsBoard = () => {
  const fieldsForTwo = [
    { label: "뮤지컬명", placeholder: "" },
    { label: "장소", placeholder: "" },
  ];
  const tableHeaders = [
    "제목", "뮤지컬명", "장소"
  ]
  const details = [
    { id:1, name: "아이폰 16 pro 화이트 티타늄", musical: "알라딘", place: "링크아트센터드림 드림1관"},
    { id:2, name: "가방 (샤넬백)", musical: "알라딘", place: "링크아트센터드림 드림1관"},
    { id:3,  name: "남성용 반지갑", musical: "미아 파밀리아", place: "링크아트센터드림 드림1관"},
    { id:4, name: "블랙야크 벙어리장갑", musical: "미아 파밀리아", place: "링크아트센터드림 드림1관"},
    { id:5, name: "아이폰 14프로", musical: "미아 파밀리아", place: "링크아트센터드림 드림1관"},
  ];

  return (
    <>
      <SearchContainer fields={fieldsForTwo} />
      <PostList details={details} headers={tableHeaders} cols={3}/>
    </>
  );
};

export default SeatsBoard;

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

const Content = styled.div``

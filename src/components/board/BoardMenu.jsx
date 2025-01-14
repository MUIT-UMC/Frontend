import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function BoardMenu() {
  return (
  <>
    <MenuContainer>
      <MenuGroup>
          <MainMenu color='#A00000'>분실물 게시판</MainMenu>
          <SubMenu>
            <Li color='#A00000'>분실</Li>
            <Li>습득</Li>
          </SubMenu>
        </MenuGroup>
        <hr />
        <MenuGroup>
          <MainMenu>익명 게시판</MainMenu>
        </MenuGroup>
        <hr />
        <MenuGroup>
          <MainMenu>시야/리뷰 게시판</MainMenu>
        </MenuGroup>
      </MenuContainer>
  </>
  )
}

export default BoardMenu;

const MenuContainer = styled.div`
  display: flex;
  width: 174px;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  background: none;

  hr {
  border: none;
  border-top: 1px solid #E6E6E6; /* 가로선 생성 */
  width: 100%; /* 부모 요소 너비에 맞춤 */
  margin: 0px;
}
`;


const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainMenu = styled.div`
  color: ${(props) => props.color ? props.color : '#919191'};

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
   &:hover {
      font-weight: 900;
    }
  `
  ;

const SubMenu = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 8px;

  li {
    
  }
`;

const Li = styled.li`
  font-family: Pretendard;
    font-size: 16px;
    font-weight: normal;
    color: ${(props) => props.color ? props.color : '#919191'};
    cursor: pointer;
     list-style: none; /* 기본 목록 스타일 제거 */

    /* 대시 추가 */
    &::before {
      content: '-'; /* 대시(-) 추가 */
      margin-right: 8px; /* 텍스트와 대시 간격 조절 */
      color: ${(props) => props.color ? props.color : '#919191'}; /* 대시 색상 */
    }

    &:hover {
      font-weight: 900;
    }
   
`
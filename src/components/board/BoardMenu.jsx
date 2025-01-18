import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

<<<<<<< Updated upstream
function BoardMenu() {

  const navigate = useNavigate();
=======
function BoardMenu({ menus, currentType, currentCategory, defaultColor = "#919191"}) {
  const navigate = useNavigate(); // 추가
>>>>>>> Stashed changes
  return (
  <>
    <MenuContainer>
<<<<<<< Updated upstream
      <MenuGroup>
          <MainMenu color='#A00000'>분실물 게시판</MainMenu>
          <SubMenu>
            <Li color='#A00000' to="/board/item/lost">분실</Li>
            <Li to="/board/item/found">습득</Li>
=======
      {menus.map((menu, index) => (
        <MenuGroup key={index}>
          <MainMenu 
            isActive={currentCategory === menu.id}
            defaultColor={defaultColor}
          >{menu.title}</MainMenu>
          <SubMenu>
            {menu.subMenus.map((subMenu, subIndex) => (
           <Li
           key={subMenu.id}
           to={subMenu.link} // Link 컴포넌트의 to 속성 사용
           isActive={currentType === subMenu.id}
           defaultColor={defaultColor}
         >
                {subMenu.name}
              </Li>
            ))}
>>>>>>> Stashed changes
          </SubMenu>
        </MenuGroup>
        <hr />
        <MenuGroup>
          <MainMenu>익명 게시판</MainMenu>
          <SubMenu>
            <Li to="/board/anonymous/all">전체</Li>
            <Li to="/board/anonymous/hot">HOT</Li>
          </SubMenu>
        </MenuGroup>
        <hr />
        <MenuGroup>
          <MainMenu>리뷰 게시판</MainMenu>
          <SubMenu>
            <Li to="/board/review/musical">뮤지컬 리뷰</Li>
            <Li to="/board/review/seats">시야 리뷰</Li>
          </SubMenu>
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
  border-top: 1px solid #E6E6E6; 
  width: 100%; 
  margin: 0px;
}
`;


const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainMenu = styled.div`
<<<<<<< Updated upstream
  color: ${(props) => props.color ? props.color : '#919191'};

=======
  color: ${(props) => props.isActive? "#A00000" : props.defaultColor};
>>>>>>> Stashed changes
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
   &:hover {
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

<<<<<<< Updated upstream
const Li = styled(Link)`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => (props.color ? props.color : "#919191")};
=======
const Li = styled(Link).attrs((props) => ({
  style: {
    color: props.isActive ? "#A00000" : props.defaultColor,
  },
}))`
>>>>>>> Stashed changes
  cursor: pointer;
  text-decoration: none; 
  display: block; 

  &::before {
<<<<<<< Updated upstream
    content: "-"; 
    margin-right: 8px; 
    color: ${(props) => (props.color ? props.color : "#919191")}; 
    text-decoration: none;
    }
=======
    content: "-";
    margin-right: 8px;
  }
>>>>>>> Stashed changes
`;
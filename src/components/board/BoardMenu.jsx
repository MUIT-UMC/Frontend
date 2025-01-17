import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function BoardMenu({ menus }) {
  return (
    <MenuContainer>
      {menus.map((menu, index) => (
        <MenuGroup key={index}>
          <MainMenu color={menu.color}>{menu.title}</MainMenu>
          <SubMenu>
            {menu.subMenus.map((subMenu, subIndex) => (
              <Li
                key={subIndex}
                to={subMenu.link}
                color={subMenu.color}
              >
                {subMenu.name}
              </Li>
            ))}
          </SubMenu>
          {index < menus.length - 1 && <hr />}
        </MenuGroup>
      ))}
    </MenuContainer>
  );
}

export default BoardMenu;

const MenuContainer = styled.div`
  display: flex;
  width: ${(props) => props.width? props.width : '174px'};
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
  width: 100%;
`;

const MainMenu = styled.div`
  color: ${(props) => props.color ? props.color : '#919191'};

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

const Li = styled(Link)`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => (props.color ? props.color : "#919191")};
  cursor: pointer;
  text-decoration: none; 
  display: block; 

  &::before {
    content: "-"; 
    margin-right: 8px; 
    color: ${(props) => (props.color ? props.color : "#919191")}; 
    text-decoration: none;
    }
`;
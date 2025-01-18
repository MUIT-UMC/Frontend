import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function BoardMenu({ menus, currentType, currentCategory, defaultColor = "#919191"}) {
  return (
    <MenuContainer>
      {menus.map((menu, index) => (
        <MenuGroup key={index}>
          <MainMenu 
            isActive={currentCategory === menu.id}
            defaultColor={defaultColor}
          >{menu.title}</MainMenu>
          <SubMenu>
            {menu.subMenus.map((subMenu, subIndex) => (
              <Li
                key={subIndex}
                to={subMenu.link}
                color={subMenu.color || defaultColor}
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
  width: ${(props) => (props.width ? props.width : "174px")};
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  background: none;

  hr {
    border: none;
    border-top: 1px solid #e6e6e6;
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
  color: ${(props) => props.isActive ? "#A00000" : props.defaultColor};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;

const SubMenu = styled.ul`
  list-style-type: none;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Li = styled(Link)`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.color || "#919191"};
  cursor: pointer;
  text-decoration: none;
  display: block;

  &::before {
    content: "-";
    margin-right: 8px;
    color: ${(props) => props.color || "#919191"};
  }
`;

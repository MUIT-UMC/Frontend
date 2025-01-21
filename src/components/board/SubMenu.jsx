import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SubMenu = ({ navItems, currentType, basePath }) => {
  const navigate = useNavigate();

  return (
    <StyledSubMenu>
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          isActive={currentType === item.id}
          onClick={() => navigate(item.link)}
        >
          {item.name}
        </NavItem>
      ))}
    </StyledSubMenu>
  );
};

export default SubMenu;

const StyledSubMenu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-bottom: 24px;
`;

const NavItem = styled.div`
  color: ${({ isActive }) => (isActive ? "#A00000" : "#919191")};
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  cursor: pointer;

  /* Title-md */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  line-height: normal;
`;

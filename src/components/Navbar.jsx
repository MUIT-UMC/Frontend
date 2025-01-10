
// 임시 상단바 -> Navbar2에서 수정중 수정 완료하면 Navbar2로 대체할 예정정

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

//  색상
const COLOR_MUIT_RED = "#A00000";    // color-muit red-main
const COLOR_BLACK = "#000000";       // color-gray-maintext

const MAX_WIDTH = 1440;
const SIDE_MARGIN = 100; // 좌우 마진
const COLUMN_GAP = 20;   // column 간격

function Navbar() {
  const location = useLocation();

  return (
    <NavContainer>
      {/* 윗줄: 로고 중앙, 오른쪽 아이콘 */}
      <GridRow>
        <LeftArea />
        <CenterArea>
          <LogoLink to="/">MUIT</LogoLink>
        </CenterArea>
        <RightArea>
          <Icon>🔍</Icon>
          <Icon>👤</Icon>
        </RightArea>
      </GridRow>

      {/* 아랫줄: 메뉴 6개 */}
      <GridRow style={{ paddingTop: "16px", paddingBottom: "16px" }}>
        <MenuArea>
          <MenuLink
            to="/"
            $active={location.pathname === "/"}
          >
            뮤지컬 전체 보기
          </MenuLink>
          <MenuLink
            to="/upcoming"
            $active={location.pathname === "/upcoming"}
          >
            오픈예정
          </MenuLink>
          <MenuLink
            to="/vision"
            $active={location.pathname === "/vision"}
          >
            시야확인
          </MenuLink>
          <MenuLink
            to="/group-buy"
            $active={location.pathname === "/group-buy"}
          >
            공동구매
          </MenuLink>
          <MenuLink
            to="/event-check"
            $active={location.pathname === "/event-check"}
          >
            이벤트 확인
          </MenuLink>
          <MenuLink
            to="/board"
            $active={location.pathname === "/board"}
          >
            게시판
          </MenuLink>
        </MenuArea>
      </GridRow>
    </NavContainer>
  );
}

export default Navbar;

/* ---------------- Styled Components ----------------*/

const NavContainer = styled.header`
  max-width: 1440px;
  height: 160px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

/** 12-column grid, 20px gutter, 100px side margins */
const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 20px;
  padding-left: 100px;
  padding-right: 100px;
  align-items: center;
`;

const LeftArea = styled.div`
  grid-column: 1 / 5;
`;
const CenterArea = styled.div`
  grid-column: 5 / 9;
  display: flex;
  justify-content: center;
`;
const RightArea = styled.div`
  grid-column: 9 / 13;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const LogoLink = styled(Link)`
  font-family:  "BelgianoSerif";
  font-size: 48px;
  font-weight: 400;
  text-decoration: none;
  color: ${COLOR_MUIT_RED};

  &:hover {
    color: #800000;
  }
`;

const Icon = styled.span`
  font-weight:  400;
  font-size: 24px;
  cursor: pointer;
`;

/** 두 번째 줄 전체 (columns 1~12) */
const MenuArea = styled.div`
  grid-column: 1 / 13;
  display: flex;
  justify-content: space-between;
`;

const MenuLink = styled(Link)`
  margin-top: 3px;
  text-decoration: none;
  font-family:  "Pretendard"
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active }) => ($active ? COLOR_MUIT_RED : COLOR_BLACK)};

  &:hover {
    color: ${COLOR_MUIT_RED};
    transition: color 0.2s;
  }
`;

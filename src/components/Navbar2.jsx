

// 기존 상단바 변경사항 수정 중 (미완완)

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

//  색상
const COLOR_MUIT_RED = "#A00000";    // color-muit red-main
const COLOR_GRAY_MAINTEXT = "#000000";

const MAX_WIDTH = 1440;
const SIDE_MARGIN = 100; // 좌우 마진
const COLUMN_GAP = 20;   // column 간격

function Navbar2() {
    
    // 현재 페이지 경로 확인
  const location = useLocation();
  // 상세 페이지인지 여부
  const isDetailPage = location.pathname === '/detail';

  return (
    <NavContainer>
      {/* 상단부 */}
      <NavTop>
        <LeftArea>
          {isDetailPage && (
            <HamburgerMenu>
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </HamburgerMenu>
          )}  
        </LeftArea>
        <CenterArea>
          <LogoLink to="/">MUIT</LogoLink>
        </CenterArea>
        <RightArea>
          <Icon>🔍</Icon>
          <Icon>👤</Icon>
        </RightArea>
      </NavTop>

      {/* 하단부 */}

      {!isDetailPage && (
        <NavBottom>
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
        </NavBottom>
      )}
    </NavContainer>
  )

}

export default Navbar2;

/* ---------------- Styled Components ---------------- */

const NavContainer = styled.header`
  display: flex;
  flex-direction: column;
`;

const NavTop = styled.div`
  max-width: ${MAX_WIDTH}px;
  height: 108px;
  margin: 0 auto; /* 화면 가운데 정렬 */

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: ${COLUMN_GAP}px;

  /* 좌우 마진  */
  padding: 0 ${SIDE_MARGIN}px;

  flex-direction: row;
  align-items: center;
  justify-concent:  space-between;
`;

const LeftArea = styled.div`
  justify-concent:  flex-start;
`;

const CenterArea = styled.div`
  justify-concent:  center;
`;

const RightArea = styled.div`
  justify-content:  flex-end;
  gap: 16px;
`;

const HamburgerMenu = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  
  .bar {
    width: 26px;
    height: 2px;
    background-color: ${COLOR_GRAY_MAINTEXT};
    margin: 3px 0;
  }
`;

const LogoLink = styled(Link)`
  font-family:  "BelgianoSerif";
  font-size: 48px;
  font-weight: 400;
  text-decoration: none;
  color: ${COLOR_MUIT_RED};
  cursor:  pointer;

  &:hover {
    color: #800000;
  }
`;

const Icon = styled.span`
  font-weight:  400;
  font-size: 24px;
  cursor: pointer;
`;


const NavBottom = styled.div`
  max-width: ${MAX_WIDTH}px;
  height: 52px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: ${COLUMN_GAP}px;
  padding: 0 ${SIDE_MARGIN}px;

  flex-direction: row;
  align-items: center;
  justify-concent:  space-between;
`;


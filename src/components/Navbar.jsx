
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import hamburgerIcon from '../assets/icons/Hamburger.svg';
import SearchIcon from '../assets/icons/Search.svg';
import ProfileIcon from '../assets/icons/Profile.svg';

//  색상
const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";    // color-muit red-main
const COLOR_GRAY_MAINTEXT = "#000000";

const MAX_WIDTH = 1440;
const SIDE_MARGIN = 100; // 좌우 마진
const COLUMN_GAP = 20;   // column 간격

//메뉴 색 경우의 수수
function getMenuColor($detail, $scrolled) {
  switch (true) {
    // detail 페이지 & 스크롤 내려간 상태
    case $detail && $scrolled:
      return COLOR_GRAY_MAINTEXT; // 검정

    // detail 페이지 & 맨 위
    case $detail && !$scrolled:
      return COLOR_WHITE; // 하양

    // detail 아닌 경우(기본)
    default:
      return COLOR_GRAY_MAINTEXT; // 검정
  }
}

// 로고 색 경우의 수수
function getLogoColor($detail, $scrolled) {
  switch (true) {
    // detail 페이지 & 스크롤 내려간 상태
    case $detail && $scrolled:
      return COLOR_MUIT_RED; // 레드

    // detail 페이지 & 맨 위
    case $detail && !$scrolled:
      return COLOR_WHITE; // 하양

    // detail 아닌 경우(기본)
    default:
      return COLOR_MUIT_RED; // 레드
  }
}

//바탕 색 경우의 수수
function getNavColor($detail, $scrolled) {
  switch (true) {
    // detail 페이지 & 스크롤 내려간 상태
    case $detail && $scrolled:
      return COLOR_WHITE; // 하양

    // detail 페이지 & 맨 위
    case $detail && !$scrolled:
      return COLOR_MUIT_RED; // 레드

    // detail 아닌 경우(기본)
    default:
      return COLOR_WHITE; // 하양
  }
}

function Navbar() {
    
    // 현재 페이지 경로 확인
  const location = useLocation();
  // 상세 페이지인지 여부
  const isDetailPage = location.pathname === '/detail';

  // 스크롤 여부 상태
  const [scrolled, setScrolled] = useState(false);

  // 상세 페이지일 때만, 스크롤 이벤트 리스너 등록
  useEffect(() => {
    if (!isDetailPage) return;

    const handleScroll = () => {
      // 스크롤이 0보다 크면 true, 0이면 false
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDetailPage]);


  return (
    <NavContainer>
      {/* 상단부 */}
      <NavTop $detail={isDetailPage} $scrolled={scrolled}>
        <LeftArea>
          {isDetailPage && (
            <HamburgerMenu>
              <img src={hamburgerIcon} alt="Hamburger Icon" />
            </HamburgerMenu>
          )}  
        </LeftArea>
        <CenterArea>
          <LogoLink to="/" $detail={isDetailPage} $scrolled={scrolled}>MUIT</LogoLink>
        </CenterArea>
        <RightArea>
          <Icon $detail={isDetailPage} $scrolled={scrolled}><img src={SearchIcon} alt="Search Icon" /></Icon>
          <Icon $detail={isDetailPage} $scrolled={scrolled}><img src={ProfileIcon} alt="Profile Icon" /></Icon>
        </RightArea>
      </NavTop>

      {/* 하단부 */}

      {!isDetailPage && (
        <NavBottom>
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
              to="/board/item/lost"
              $active={location.pathname === "/board"}
            >
              게시판
            </MenuLink>
          </MenuArea>
        </NavBottom>
      )}
    </NavContainer>
  )

}

export default Navbar;

/* ---------------- Styled Components ---------------- */

const NavContainer = styled.header`
  display: flex;
  flex-direction: column;
  max-width: ${MAX_WIDTH}px;
  background-color: ${COLOR_WHITE};
  margin: 0 auto;
  position: relative;
`;

const NavTop = styled.div`
  max-width: ${MAX_WIDTH}px;
  height: 108px;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: ${COLUMN_GAP}px;
  padding: 0 ${SIDE_MARGIN}px;
  align-items: center;
  justify-item: center;

  background-color: ${({ $detail, $scrolled }) => getNavColor($detail, $scrolled)};
`;

const LeftArea = styled.div`
  grid-column: 1 / 5;
  display:  flex;
  justify-content:  flex-start;
  align-items:  center;
`;

const CenterArea = styled.div`
  grid-column: 5 / 9;
  display:  flex;
  justify-content:  center;
  align-items:  center;
`;

const RightArea = styled.div`
  grid-column: 9 / 13;
  display:  flex;
  justify-content:  flex-end;
  align-items:  center;
  gap: 20px;
`;

const HamburgerMenu = styled.div`
  width:  36px;
  height: 36px;
  cursor: pointer;
  align-self: center;
  color: ${({ $detail, $scrolled }) => getMenuColor($detail, $scrolled)};
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  font-family:  "BelgianoSerif";
  font-size: 48px;
  font-weight: 400;
  cursor:  pointer;

  color: ${({ $detail, $scrolled }) => getLogoColor($detail, $scrolled)};

  &:hover {
    color: #800000;
  }
`;

const Icon = styled.span`
  width:  36px;
  height: 36px;
  cursor: pointer;
  align-self: center;
  color: ${({ $detail, $scrolled }) => getMenuColor($detail, $scrolled)};
`;


const NavBottom = styled.div`
  max-width: ${MAX_WIDTH}px;
  height: 52px;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: ${COLUMN_GAP}px;
  padding: 0 ${SIDE_MARGIN}px;

  align-content:  center;
  justify-content:  space-evenly;
`;

const MenuArea = styled.div`
  grid-column: 1 / 13;
  display:  flex;
  justify-content:  space-evenly;
  align-items:  center;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  font-family:  "Pretendard"
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active }) => ($active ? COLOR_MUIT_RED : COLOR_GRAY_MAINTEXT)};

  &:hover {
    color: ${COLOR_MUIT_RED};
    transition: color 0.2s;
  }
`;
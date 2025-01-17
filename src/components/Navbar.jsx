
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import HamburgerIcon from '../assets/icons/Hamburger.svg';
import SearchIcon from '../assets/icons/Search.svg';
import ProfileIcon from '../assets/icons/Profile.svg';
import HamburgerIconWhite from '../assets/icons/HamburgerWhite.svg';
import SearchIconWhite from '../assets/icons/SearchWhite.svg';
import ProfileIconWhite from '../assets/icons/ProfileWhite.svg';

//  색상
const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";

const MAX_WIDTH = 1440;
const SIDE_MARGIN = 100; // 좌우 마진
const COLUMN_GAP = 20;   // column 간격



//export default
export default function Navbar() {

  const location = useLocation();

  return (
    <NavBox>
      {/* 기본 상단바 */}
      {["/", "/upcoming", "/vision", "/group-buy", "/event-check", "/board"].includes(location.pathname) && <NavbarDefault/>}
      {/* 상단바 with 사이드바 버튼 */}
      {(
        location.pathname.startsWith("/vision/") ||
        location.pathname.startsWith("/group-buy/") ||
        location.pathname.startsWith("/event-check/") ||
        location.pathname.startsWith("/board/") ||
        location.pathname.startsWith("/search") ||
        location.pathname.startsWith("/mypage")
      ) && <NavbarSidebar/>}
      {/* 상세페이지 상단바 */}
      {location.pathname.startsWith("/detail") && <NavbarDetail/>}
      {/* 관리자페이지 상단바 -> 추후 추가
      {location.pathname.startsWith("/adminpage") && <NavbarAdmin/>} */}
    </NavBox>
  )
  
}

function NavbarDefault() {
  
  return (
    <NavContainer>
      <NavTop>
        <LeftArea></LeftArea>
        <CenterArea>
          <LogoLink to="/">MUIT</LogoLink>
        </CenterArea>
        <RightArea>
          <IconLink to="/search"><img src={SearchIcon} alt="Search Icon" /></IconLink>
          <IconLink to="/mypage"><img src={ProfileIcon} alt="Profile Icon" /></IconLink>
        </RightArea>
      </NavTop>
      <NavBottom>
      <MenuArea>
        <MenuLink to="/" $active={location.pathname === "/"}>
          뮤지컬 전체 보기
        </MenuLink>
        <MenuLink to="/upcoming" $active={location.pathname === "/upcoming"}>
          오픈예정
        </MenuLink>
        <MenuLink to="/vision" $active={location.pathname === "/vision"}>
          시야확인
        </MenuLink>
        <MenuLink to="/group-buy" $active={location.pathname === "/group-buy"}>
          공동구매
        </MenuLink>
        <MenuLink to="/event-check" $active={location.pathname === "/event-check"}>
          이벤트 확인
        </MenuLink>
        <MenuLink to="/board/item/lost" $active={location.pathname === "/board"}> {/* 임시경로로 링크 */}
          게시판
        </MenuLink>
      </MenuArea>
      </NavBottom>
    </NavContainer>
  )
}

function NavbarSidebar() {

  return (
    <NavTop>
      <LeftArea>
        <SidebarButton>
          <img src={HamburgerIcon} alt="Sidebar button" />
            <Sidebar/>
        </SidebarButton>
      </LeftArea>
      <CenterArea>
        <LogoLink to="/">MUIT</LogoLink>
      </CenterArea>
      <RightArea>
        <IconLink to="/search"><img src={SearchIcon} alt="Search Icon" /></IconLink>
        <IconLink to="/mypage"><img src={ProfileIcon} alt="Profile Icon" /></IconLink>
      </RightArea>
    </NavTop>
  )
}

function NavbarDetail() {

  // 스크롤이 1024px을 넘어섰는지 여부
  const [scrolledBeyond, setScrolledBeyond] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (window.scrollY >= 1024) {
        setScrolledBeyond(true);
      } else {
        setScrolledBeyond(false);
      }
    };
    // 이벤트 등록
    window.addEventListener('scroll', handleScroll);
    // 정리(clean-up) 함수에서 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    
    <NavTopDetail $scrolledBeyond={scrolledBeyond}>  {/* 상세페이지용 NavTop */}
      <LeftArea>
        <SidebarButton>
          <img src={scrolledBeyond ? HamburgerIcon : HamburgerIconWhite} alt="Sidebar button" />
            <Sidebar/>
        </SidebarButton>
      </LeftArea>
      <CenterArea>
        <LogoLinkDetail to="/" $scrolledBeyond={scrolledBeyond}>MUIT</LogoLinkDetail>  {/* 상세페이지용 LogoLink */}
      </CenterArea>
      <RightArea>
        <IconLink to="/search"><img src={scrolledBeyond ? SearchIcon : SearchIconWhite} alt="Search Icon" /></IconLink>
        <IconLink to="/mypage"><img src={scrolledBeyond ? ProfileIcon: ProfileIconWhite} alt="Profile Icon" /></IconLink>
      </RightArea>
    </NavTopDetail>
  )
}


function Sidebar() {

}

// function NavbarAdmin() {}


/* ---------------- Styled Components ---------------- */

const NavBox = styled.header``;

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

  background-color: ${COLOR_WHITE};
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

const SidebarButton = styled.div`
  width:  36px;
  height: 36px;
  cursor: pointer;
  align-self: center;
  color:  ${COLOR_GRAY_MAINTEXT};
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  font-family:  "BelgianoSerif";
  font-size: 48px;
  font-weight: 400;
  cursor:  pointer;

  color: ${COLOR_MUIT_RED};

  &:hover {
    color: #800000;
  }
`;

const IconLink = styled(Link)`
  width:  36px;
  height: 36px;
  cursor: pointer;
  align-self: center;
  color:  ${COLOR_GRAY_MAINTEXT};
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


/* 상세페이지 상단바 style */

const NavTopDetail = styled.div`
  position: fixed;
  z-index:  999;
  width:  1240px;

  max-width: ${MAX_WIDTH}px;
  height: 108px;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: ${COLUMN_GAP}px;
  padding: 0 ${SIDE_MARGIN}px;
  align-items: center;
  justify-item: center;

  background-color: ${({ $scrolledBeyond }) => ($scrolledBeyond ? COLOR_WHITE : COLOR_MUIT_RED)};
`;

const LogoLinkDetail = styled(Link)`
  text-decoration: none;
  font-family:  "BelgianoSerif";
  font-size: 48px;
  font-weight: 400;
  cursor:  pointer;

  color: ${({ $scrolledBeyond }) => ($scrolledBeyond ? COLOR_MUIT_RED : COLOR_WHITE)};

  &:hover {
    color: #800000;
  }
`;


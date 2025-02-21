
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import HamburgerIcon from '../assets/icons/Hamburger.svg';
import SearchIcon from '../assets/icons/Search.svg';
import ProfileIcon from '../assets/icons/Profile.svg';
import HamburgerIconWhite from '../assets/icons/HamburgerWhite.svg';
import SearchIconWhite from '../assets/icons/SearchWhite.svg';
import ProfileIconWhite from '../assets/icons/ProfileWhite.svg';
import DivideBarIcon from '../assets/icons/DivideBar.svg'

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
      {["/", "/vision", "/small-theater", "/event-check", "/board/item/lost",
      "/board/item/found", "/board/anonymous/all", "/board/anonymous/hot", "/board/review/musical", "/board/review/seats" 
      ].includes(location.pathname) && <NavbarDefault/>}
      {/* 상단바 with 사이드바 버튼 */}
      {(
        location.pathname.startsWith("/vision/") ||
        location.pathname.startsWith("/upcoming") ||
        location.pathname.startsWith("/ranking") ||
        location.pathname.startsWith("/register-musical") ||
        location.pathname.startsWith("/register-musical/") ||
        location.pathname.startsWith("/small-theater/") ||
        location.pathname.startsWith("/small-detail/buy") ||
        location.pathname.startsWith("/event-check/") ||
        location.pathname.startsWith("/board/item/lost/") ||
        location.pathname.startsWith("/board/item/found/") ||
        location.pathname.startsWith("/board/anonymous/all/") ||
        location.pathname.startsWith("/board/anonymous/hot/") ||
        location.pathname.startsWith("/board/anonymous/write") ||
        location.pathname.startsWith("/board/review/musical/") ||
        location.pathname.startsWith("/board/review/seats/") ||
        location.pathname.startsWith("/ticket/") ||
        location.pathname.startsWith("/board/.../") ||
        location.pathname.startsWith("/board/.../") ||
        location.pathname.startsWith("/search") ||
        location.pathname.startsWith("/mypage")
      ) && <NavbarSidebar/>}
      {/* 상세페이지 상단바 */}
      {location.pathname.startsWith("/detail") && <NavbarDetail/>}
      {(
        location.pathname.startsWith("/small-detail/buy") // 특정 경로에서 제외
    ? null
      :location.pathname.startsWith("/small-detail")
) && <NavbarDetail />}

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
          <IconLink to="/mypage/my/tickets"><img src={ProfileIcon} alt="Profile Icon" /></IconLink>
        </RightArea>
      </NavTop>
      <NavBottom>
      <MenuArea>
        <MenuLink to="/" $active={location.pathname === "/"}>
          뮤지컬 전체 보기
        </MenuLink>
        <MenuLink to="/vision" $active={location.pathname === "/vision"}>
          시야확인
        </MenuLink>
        <MenuLink to="/small-theater" $active={location.pathname === "/small-theater"}>
          소극장 공연
        </MenuLink>
        <MenuLink to="/event-check" $active={location.pathname === "/event-check"}>
          이벤트 확인
        </MenuLink>
        <MenuLink to="/board/item/lost" $active={location.pathname === "/board/item/lost"}> {/* 임시경로로 링크 */}
          게시판
        </MenuLink>
      </MenuArea>
      </NavBottom>
    </NavContainer>
  )
}

function NavbarSidebar() {

  // 사이드바 열림/닫힘 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   // 사이드바 토글
   const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  // 사이드바 닫기
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <NavTop>
      <LeftArea>
        <SidebarButton onClick={toggleSidebar}>
          <img src={HamburgerIcon} alt="Sidebar button" />
        </SidebarButton>
      </LeftArea>
      <CenterArea>
        <LogoLink to="/">MUIT</LogoLink>
      </CenterArea>
      <RightArea>
        <IconLink to="/search"><img src={SearchIcon} alt="Search Icon" /></IconLink>
        <IconLink to="/mypage"><img src={ProfileIcon} alt="Profile Icon" /></IconLink>
      </RightArea>

      {/* isSidebarOpen이 true일 때 사이드바 렌더링 */}
      {isSidebarOpen && (
        <Sidebar onClose={closeSidebar} />
      )}
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

  // 사이드바 열림/닫힘 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   // 사이드바 토글글
   const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  // 사이드바 닫기
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    
    <NavTopDetail $scrolledBeyond={scrolledBeyond}>  {/* 상세페이지용 NavTop */}
      <LeftArea>
        <SidebarButton onClick={toggleSidebar}>
          <img src={scrolledBeyond ? HamburgerIcon : HamburgerIconWhite} alt="Sidebar button" />
        </SidebarButton>
      </LeftArea>
      <CenterArea>
        <LogoLinkDetail to="/" $scrolledBeyond={scrolledBeyond}>MUIT</LogoLinkDetail>  {/* 상세페이지용 LogoLink */}
      </CenterArea>
      <RightArea>
        <IconLink to="/search"><img src={scrolledBeyond ? SearchIcon : SearchIconWhite} alt="Search Icon" /></IconLink>
        <IconLink to="/mypage"><img src={scrolledBeyond ? ProfileIcon: ProfileIconWhite} alt="Profile Icon" /></IconLink>
      </RightArea>

      {/* isSidebarOpen이 true일 때 사이드바 렌더링 */}
      {isSidebarOpen && (
        <Sidebar onClose={closeSidebar} />
      )}
    </NavTopDetail>
  )
}


function Sidebar({onClose}) {

  //사이드바 외부 영역
  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };
  //사이드바 내부 영역
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };
  // 메뉴 링크 클릭
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <SidebarOverlay onClick={handleOverlayClick}>
      <SidebarContainer onClick={handleContainerClick}>
        <SideMenuArea>
          <MenuTop>
            <SideMenuLink to="/">홈</SideMenuLink>
            <SideMenuLink to="/vision">시야 확인</SideMenuLink>
            <SideMenuLink to="/small-theater">소극장 공연</SideMenuLink>
            <SideMenuLink to="/event-check">이벤트 확인</SideMenuLink>
            <SideMenuLink to="/board/item/lost" >게시판</SideMenuLink>
          </MenuTop>
          <Bar><img src={DivideBarIcon} alt="Bar Icon" /></Bar>
          <MenuBottom>
            {!isLoggedIn && (
              <>
                <SideMenuLink to="/login">로그인</SideMenuLink>
                <SideMenuLink to="/signup">회원가입</SideMenuLink>
              </>
            )}
            <SideMenuLink to="/mypage" onClick={handleLinkClick}>마이 페이지</SideMenuLink>
          </MenuBottom>
        </SideMenuArea>
      </SidebarContainer>
    </SidebarOverlay>
  )
}


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


/////////////////////// 상세페이지 상단바 style ///////////////////////

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;     /* 화면 전체 너비 */
  height: 100vh;    /* 화면 전체 높이 */
  background: rgba(0, 0, 0, 0.5);  /* 반투명 배경 */
  z-index: 1000;    /* 다른 요소보다 위에 표시되도록 */

  display: flex;
  /* 사이드바를 우측에서 열고 싶으면 justify-content: flex-end; 로 변경 가능 */
  justify-content: flex-start;
`;

const SidebarContainer = styled.div`
  position: relative;
  width: 200px;       /* 사이드바 너비 */
  height: 100%;       /* 오버레이 높이에 맞춤 */
  background-color: #fff;
  padding: 20px;
`;

const SideMenuArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MenuTop = styled.div`
  display: flex;
  flex-direction: column;
  gap:  24px;
  margin-top: 107px;
`

const MenuBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap:  24px;
`

const SideMenuLink = styled(Link)`
  text-decoration: none;
  font-family:  "Pretendard";
  font-size: 16px;
  font-weight:  500;
  color:  ${COLOR_GRAY_MAINTEXT};
  margin-left:  24px;

  &:hover {
    color: ${COLOR_MUIT_RED};
    transition: color 0.2s;
  }
`

const Bar = styled.div`
  margin-top: 28px;
  margin-bottom:  28px;
`

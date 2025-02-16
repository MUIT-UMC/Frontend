
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import SearchIcon from '../assets/icons/Search.svg';
import ArrowDownIcon from '../assets/icons/ArrowDown.svg'

//  색상
const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";

const MAX_WIDTH = 1440;


const NavbarAdmin = () => {

    const location = useLocation();

    // “소극장 공연 관리” 하위 메뉴 펼침 상태
    const [isSmallTheaterOpen, setIsSmallTheaterOpen] = useState(false);
  
    // 펼침 토글 함수
    const handleSmallTheaterToggle = () => {
      setIsSmallTheaterOpen((prev) => !prev);
    };
  
    useEffect(() => {
      // “small-teather” 경로가 URL에 없으면 메뉴를 접기
      if (!location.pathname.startsWith("/adminpage/small-theater")) {
        setIsSmallTheaterOpen(false);
      }
    }, [location]);
  
    return (
      <AdminContainer>
        <AdminNav>
          <LeftAreaAdmin>
            <LogoLink to="/">MUIT</LogoLink>
          </LeftAreaAdmin>
          <RightAreaAdmin>
            <IconLink to="/search"><img src={SearchIcon} alt="Search Icon" /></IconLink>
          </RightAreaAdmin>
        </AdminNav>
        <AdminSide>
          <SideMenuBox $active={location.pathname === "/adminpage/dashboard"}>
            <SideMenuLinkAdmin to="/adminpage/dashboard" $active={location.pathname === "/adminpage/dashboard"}>대쉬보드</SideMenuLinkAdmin>
          </SideMenuBox>
          <SideMenuBox $active={location.pathname.startsWith("/adminpage/user")}>
            <SideMenuLinkAdmin to="/adminpage/user" $active={location.pathname === "/adminpage/user"}>사용자 관리</SideMenuLinkAdmin>
          </SideMenuBox>
          <SideMenuBox $active={location.pathname.startsWith("/adminpage/musical")}>
            <SideMenuLinkAdmin to="/adminpage/musical" $active={location.pathname === "/adminpage/musical"}>뮤지컬 관리</SideMenuLinkAdmin>
          </SideMenuBox>
          <SideMenuBox $active={location.pathname.startsWith("/adminpage/event")}> 
            <SideMenuLinkAdmin to="/adminpage/event" $active={location.pathname === "/adminpage/event"}>이벤트 관리</SideMenuLinkAdmin>
          </SideMenuBox>
  
          <SideMenuWithSub>
            <SideMenuBoxWitSub $active={location.pathname === "/adminpage/small-theater" || location.pathname.startsWith("/adminpage/small-theater/detail")}>
              <SideMenuLinkAdmin to="/adminpage/small-theater" $active={location.pathname === "/adminpage/small-theater"}>소극장 공연 관리</SideMenuLinkAdmin>
            </SideMenuBoxWitSub>
            <ArrowDownButton $open={isSmallTheaterOpen} onClick={handleSmallTheaterToggle}>
              <img src={ArrowDownIcon} alt="Arrow Icon" /></ArrowDownButton>
          </SideMenuWithSub>
          {isSmallTheaterOpen && (
            <SideMenuSub>
            <SubMenuBox $active={location.pathname.startsWith("/adminpage/small-theater/ticket")}>
              <SubMenuLink to="/adminpage/small-theater/ticket">소극장 티켓 관리</SubMenuLink>
            </SubMenuBox>
            <SubMenuBox $active={location.pathname.startsWith("/adminpage/small-theater/reserve")}>
              <SubMenuLink to="/adminpage/small-theater/reserve">예약 내역 관리</SubMenuLink>
            </SubMenuBox>
            {/* <SubMenuBox $active={location.pathname.startsWith("/adminpage/small-theater/refund")}>
              <SubMenuLink to="/adminpage/small-theater/refund">환불 내역 관리</SubMenuLink>
            </SubMenuBox> */}  {/* 데모데이 이후 구현 */}
          </SideMenuSub>
          )}
  
          <SideMenuBox $active={location.pathname.startsWith("/adminpage/vision")}>
            <SideMenuLinkAdmin to="/adminpage/vision" $active={location.pathname === "/adminpage/vision"}>시야 관리</SideMenuLinkAdmin>
          </SideMenuBox>
          <SideMenuBox $active={location.pathname.startsWith("/adminpage/query")}>
            <SideMenuLinkAdmin to="/adminpage/query" $active={location.pathname === "/adminpage/ask"}>문의</SideMenuLinkAdmin>
          </SideMenuBox>
          <SideMenuBox $active={location.pathname.startsWith("/adminpage/mypage")}>
            <SideMenuLinkAdmin to="/adminpage/mypage" $active={location.pathname === "/adminpage/mypage"}>마이페이지</SideMenuLinkAdmin>
          </SideMenuBox>
        </AdminSide>
      </AdminContainer>
    )
  }

  export default NavbarAdmin;

  /////////////////////// 관리자페이지 상단바 style ///////////////////////


const AdminContainer = styled.div`
  display:  flex;
  flex-direction: column;
`;

const AdminNav = styled.div`
  position:  fixed;
  width:  1440px;
  max-width: ${MAX_WIDTH}px;
  height: 108px;
  background-color: ${COLOR_WHITE};
  display: flex;
  justify-content: space-between;
  align-items:  center;
`; 

const LeftAreaAdmin = styled.div`
  margin-left:  100px;
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

const RightAreaAdmin = styled.div`
  margin-right:  100px;
`;

const IconLink = styled(Link)`
  width:  36px;
  height: 36px;
  cursor: pointer;
  align-self: center;
  color:  ${COLOR_GRAY_MAINTEXT};
`;


const AdminSide = styled.div`
  position:  fixed;
  top:  108px;
  display:  flex;
  flex-direction: column;
  width:  290px;
  height: 916px;
  justify-content:  flex-start;
  align-items:  flex-start;
  background-color: #8F8E94;
`;

const SideMenuBox = styled.div`
  width:  160px;
  height: 36px;
  margin-left:  112px;
  margin-top:  27px;
  padding-left: 10px;
  padding-top:  4px;

  box-sizing: border-box;
  border: 1px solid ${({ $active }) => ($active ? "#828185" : "#8F8E94")};
  border-radius: 4px;
  background: ${({ $active }) => ($active ? "#828185" : "#8F8E94")};
`;

const SideMenuLinkAdmin = styled(Link)`
  text-decoration: none;
  font-family:  "Pretendard";
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active }) => ($active ? "#FFF6F6" : COLOR_WHITE)};
`;

const SideMenuWithSub = styled.div`
  height: 36px;
  margin-top:  27px;
  display:  flex;
  justify-content:  flex-start;
  align-items:  center;
`;

const SideMenuBoxWitSub = styled.div`
  width:  160px;
  height: 36px;
  margin-left:  112px;
  padding-left: 10px;
  padding-top:  4px;

  box-sizing: border-box;
  border: 1px solid ${({ $active }) => ($active ? "#828185" : "#8F8E94")};
  border-radius: 4px;
  background: ${({ $active }) => ($active ? "#828185" : "#8F8E94")};
`;

const ArrowDownButton = styled.div`
  margin-left:  -30px;
  cursor: pointer;

  img {
      transition: transform 0.2s ease;
      transform: ${({ $open }) => ($open ? "rotate(0deg)" : "rotate(180deg)")};
    }
`;

const SideMenuSub = styled.div`
  display:  flex;
  flex-direction:  column;
  justify-content:  flex-start;
  align-items:  flex-start;
`;

const SubMenuBox = styled.div`
  width:  156px;
  height: 33px;
  margin-left:  112px;
  margin-top:  0px;
  padding-left: 20px;
  padding-top:  4px;

  box-sizing: border-box;
  border: 1px solid ${({ $active }) => ($active ? "#828185" : "#8F8E94")};
  border-radius: 4px;
  background: ${({ $active }) => ($active ? "#828185" : "#8F8E94")};
`;

const SubMenuLink = styled(Link)`
  text-decoration: none;
  font-family:  "Pretendard";
  font-size: 16px;
  font-weight:  500;
  color: #D9D9D9;
`;


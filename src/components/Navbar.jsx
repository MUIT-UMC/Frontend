import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <NavContainer>
      {/* ───── 윗줄 영역 ───── */}
      <TopRow>
        {/* 왼쪽은 비워두고(1fr), 중앙(로고), 오른쪽(아이콘들) 구조 */}
        <LeftSpace />
        <CenterLogo>
          <LogoLink to="/">MUIT</LogoLink>
        </CenterLogo>
        <RightIcons>
          <Icon>🔍</Icon>
          <Icon>👤</Icon>
        </RightIcons>
      </TopRow>

      {/* ───── 아랫줄 영역 ───── */}
      <BottomRow>
        <NavMenu>
          <MenuLink to="/">뮤지컬 전체보기</MenuLink>
          <MenuLink to="/upcoming">오픈 예정</MenuLink>
          <MenuLink to="/vision">시야 확인</MenuLink>
          <MenuLink to="/seat-check">남는 좌석 확인</MenuLink>
          <MenuLink to="/group-buy">공동 구매</MenuLink>
          <MenuLink to="/board">게시판</MenuLink>
        </NavMenu>
      </BottomRow>
    </NavContainer>
  );
}

export default Navbar;

/* ───────────────────── Styled Components ───────────────────── */

const NavContainer = styled.header`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

/* ─── 윗줄: 로고 중앙, 아이콘은 오른쪽 ─── */
const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr; 
  /* 1fr(왼쪽 비움) | auto(로고) | 1fr(오른쪽 아이콘) */
  align-items: center;
  padding: 10px 20px;
  /* border-bottom: 1px solid #eee;  // 아랫줄과 경계선 주고 싶으면 추가 */
`;

const LeftSpace = styled.div`
  /* 왼쪽 비워둔 영역 (grid 첫 컬럼) */
`;

const CenterLogo = styled.div`
  /* 가운데 로고 (grid 두 번째 컬럼) */
  display: flex;
  justify-content: center;
`;

const RightIcons = styled.div`
  /* 오른쪽 아이콘 (grid 세 번째 컬럼) */
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const LogoLink = styled(Link)`
  font-size: 28px;
  font-weight: bold;
  color: #a30000;
  text-decoration: none;
  &:hover {
    color: #800000;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  cursor: pointer;
`;

/* ─── 아랫줄: 메뉴 항목을 좌→우 균등 간격으로 배치 ─── */
const BottomRow = styled.div`
  display: flex;
  justify-content: center; /* NavMenu를 가운데에 배치 */
  padding: 10px 0;
`;

const NavMenu = styled.nav`
  /* 예: 화면 폭에 따라 조정 가능 */
  width: 70%;
  display: flex;
  justify-content: space-between; 
  /* 항목들을 왼→오른쪽 끝까지 균등 분배 */
`;

const MenuLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    color: #a30000;
    transition: color 0.2s;
  }
`;

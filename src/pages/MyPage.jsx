import React from "react";
import BoardMenu from "../components/board/BoardMenu";
import styled from "styled-components";

function MyPage() {

  const menus = [
    {
      title: "My",
      subMenus: [
        { name: "내 티켓", link: "/mypage/my/tickets" },
        { name: "내가 쓴 글", link: "/mypage/my/posts" },
        { name: "좋아요한 뮤지컬", link: "/mypage/my/liked-musicals" },
      ],
    },
    {
      title: "계정 관리",
      subMenus: [
        { name: "회원정보 수정", link: "/mypage/account/edit" },
        { name: "비밀번호 변경", link: "/mypage/account/change-password" },
        { name: "계정 연결 설정", link: "/mypage/account/link-settings" },
        { name: "배송지 관리", link: "/mypage/account/address" },
        { name: "로그인 관리", link: "/mypage/account/login-management" },
      ],
    },
    {
      title: "기타",
      subMenus: [
        { name: "1:1 문의", link: "/mypage/support/contact" },
      ],
    },
  ];
  return (
    <MyPageWrapper>
      <h1>마이페이지</h1>
      <BoardMenu menus={menus} />
      {/* 공동 구매 기능 구현 */}
    </MyPageWrapper>
  );
}

export default MyPage;

const MyPageWrapper = styled.div`
  margin: 80px 100px;
`
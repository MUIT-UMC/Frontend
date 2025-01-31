import React from "react";
import BoardMenu from "../../components/board/BoardMenu";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Tickets from "./my/Tickets";
import MyPosts from "./my/MyPosts";
import LikedMusical from "./my/LikedMusical";
import EditAccount from "./account/EditAccount";
import EditField from "./account/Edit/EditField";
import ChangePassword from "./account/ChangePassword";
import LinkSettings from "./account/LinkSettings";
import AddressManagement from "./account/AddressManagement";
import AddAddress from "./account/Edit/AddAddress";
import LoginManagement from "./account/LoginManagement";
import SupportContact from "./support/SupportContact";
import AllBoard from './../board/anonymous/HotBoard';
function MyPage() {
  const { category, type, field } = useParams();

  const menus = [
    {
      id: "my",
      title: "My",
      subMenus: [
        { id: 'tickets', name: "내 티켓", link: "/mypage/my/tickets" },
        { id: 'posts', name: "내가 쓴 글", link: "/mypage/my/posts" },
        { id: 'liked-musicals', name: "좋아요한 뮤지컬", link: "/mypage/my/liked-musicals" },
      ],
    },
    {
      id: "account",
      title: "계정 관리",
      subMenus: [
        { id: 'edit', name: "회원정보 수정", link: "/mypage/account/edit"||"/mypage/account/edit/:field" },
        { id: 'change-password', name: "비밀번호 변경", link: "/mypage/account/change-password" },
        { id: 'link-settings', name: "계정 연결 설정", link: "/mypage/account/link-settings" },
        { id: 'address', name: "배송지 관리", link: "/mypage/account/address" || "/mypage/account/address/add-address" },
        { id: 'login-management', name: "로그인 관리", link: "/mypage/account/login-management" },
      ],
    },
    {
      id: "support",
      title: "기타",
      subMenus: [
        { id: 'contact', name: "1:1 문의", link: "/mypage/support/contact" },
      ],
    },
  ];
  
  const titles = {
    tickets: "내 티켓",
    posts: "내가 쓴 글",
    "liked-musicals": "좋아요한 뮤지컬",
    edit: "회원정보 수정",
    "change-password": "비밀번호 변경",
    "link-settings": "계정 연결 설정",
    address: "배송지 관리",
    "login-management": "로그인 관리",
    contact: "1:1 문의",
  };


  return (
    <MyPageWrapper>
      <Aside>
        <div>
          <User>최윤경님</User>
          <Id>rose06166</Id>
          <BoardMenu 
            menus={menus} 
            defaultColor="#000" 
            currentCategory={category}
            currentType={type}
          />
        </div>
        <AsideBottom>
          <TextButton>로그아웃</TextButton>
          <TextButton color="#FF1E00">회원탈퇴</TextButton>
        </AsideBottom>
      </Aside>
      <Main>
        <PageTitle>{titles[type]}</PageTitle>
        <Content>
          {type === "tickets" && <Tickets />}
          {type === "posts" && <MyPosts />}
          {type === "liked-musicals" && <LikedMusical />}
          {type === "edit" && (field ? <EditField field={field} /> : <EditAccount />)}
          {type === "change-password" && <ChangePassword />}
          {type === "link-settings" && <LinkSettings />}
          {type === "address" && (field === 'add-address' ? <AddAddress/> :<AddressManagement />) }
          {type === "login-management" && <LoginManagement />}
          {type === "contact" && <SupportContact />}
        </Content>
      </Main>
      {/* 공동 구매 기능 구현 */}
    </MyPageWrapper>
  );
}

export default MyPage;

const MyPageWrapper = styled.div`
  margin: 80px 100px;
  display: flex;
  flex-direction: row;
  gap: 115px;
`

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh; /* 창 높이를 기준으로 설정 */
`

const Main = styled.div`
`

const User = styled.div`  
color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 8px;
`

const Id = styled.div`
color: var(--Gray-sub, #919191);

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */

margin-bottom: 28px;
`
const PageTitle = styled.div`
color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const Content = styled.div`
width: 924px;
`

const TextButton = styled.button`
width: 50px;
  padding: 0px;
  margin: 0px;
  border: none;
  background: none;
  color: ${(props) => props.color? props.color : '#000'};

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`

const AsideBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`


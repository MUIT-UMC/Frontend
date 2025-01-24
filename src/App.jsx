
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; 

import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Detail from "./pages/detail/Detail";
import Vision from "./pages/Vision";
import EventCheck from "./pages/EventCheck";
import EventDetail from "./pages/EventDetail";
import SmallTheater from "./pages/SmallTheater";
import RegisterMusical from "./pages/RegisterMusical";
import SmallDetail from "./pages/SmallDetail";
import Board from "./pages/board/Board";
import VisionDetail from "./pages/VisionDetail";
import ItemPost from "./pages/board/ItemPost";
import AnonymousPost from "./pages/board/AnonymousPost";
import ReviewPost from "./pages/board/ReviewPost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Terms from "./pages/signup/Terms"
import Info from "./pages/signup/Info";
import MyPage from "./pages/mypage/MyPage";

//import Search from "./pages/Search";
import WriteAnonymousPost from "./pages/board/WriteAnonymousPost";
import WriteItemPost from "./pages/board/WriteItemPost";
import WriteReviewPost from "./pages/board/WriteReviewPost";

import Search from "./pages/Search";

import './styles/font.css';
import styled from "styled-components";
import TicketDetailPage from "./pages/mypage/my/ticket/TicketDetailPage";
import CancelTicket from "./pages/mypage/my/ticket/CancelTicket";
import CancelComplete from "./pages/mypage/my/ticket/CancelComplete";



function App() {
  return (
    
      <div style={{display: 'flex', justifyContent: 'center'}}>
      
      <Container>
      <Router>
      {/* 공통 상단바 */}
      <Navbar />
      <Routes>
        {/* 1) 뮤지컬 전체보기 → "/" → 홈 */}
        <Route path="/" element={<Home />} />
        {/* 2) 오픈 예정 */}
        <Route path="/upcoming" element={<Upcoming />} />
        {/* 3) 시야 확인 */}
        <Route path="/vision" element={<Vision />} />
        {/* 3-1) 시야확인 상세 */}
        <Route path="/vision/1" element={<VisionDetail />} />
        {/* 4) 소규모 공연 */}
        <Route path="/small-theater" element={<SmallTheater />} />
        {/* 4-1) 뮤지컬 등록 페이지 */}
        <Route path="/register-musical" element={<RegisterMusical />} />
        {/* 4-2) 뮤지컬 등록 페이지 */}
        <Route path="/small-detail" element={< SmallDetail/>} />
        {/* 5) 이벤트 확인 */}
        <Route path="/event-check" element={<EventCheck />} />

        {/* 6) 게시판/게시글 */}
        <Route path="/board/:category/:type" element={<Board />} />
        <Route path="/board/item/lost/1" element={<ItemPost />} />
        <Route path="/board/anonymous/all/1" element={<AnonymousPost />} />
        <Route path="/board/review/musical/1" element={<ReviewPost />} />

        <Route path="/board/item/write" element={<WriteItemPost />} />
        <Route path="/board/anonymous/write" element={<WriteAnonymousPost />} />
        <Route path="/board/review/write" element={<WriteReviewPost />} />
        
        <Route path="/event-check/:musicalId" element={<EventDetail/>}/>

      
        {/* 7) 상세 페이지 */}
        <Route path="/detail" element={<Detail />} />
        
        {/* 9) 로그인/회원가입 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/terms" element={<Terms/>}/>
        <Route path="/signup/info" element={<Info/>}/>

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/:category/:type" element={<MyPage />} />

        {/* 티켓 상세페이지 */}
        <Route path="ticket/:number" element={<TicketDetailPage />} />
        <Route path="ticket/:number/cancel" element={<CancelTicket />} />
        <Route path="ticket/:number/cancel/complete" element={<CancelComplete />}  />
        {/* 검색 */}

        {/*<Route path="/search" element={<Search />} />*/}

        <Route path="/search" element={<Search />} />


      </Routes>
      </Router>
      </Container>
      </div>
     
 
  );
}

export default App;

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 0px;
  margin: 0px;
  min-width: 1440px;
  max-width: 1440px;
`;
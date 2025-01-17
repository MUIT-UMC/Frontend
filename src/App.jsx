
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; 

import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Detail from "./pages/Detail";
import Vision from "./pages/Vision";
import EventCheck from "./pages/EventCheck";
import EventDetail from "./pages/EventDetail";
import GroupBuy from "./pages/GroupBuy";
import Board from "./pages/Board";
import VisionDetail from "./pages/VisionDetail";
import LostItemPost from "./pages/LostItemPost";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import './styles/font.css';
import styled from "styled-components";



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
        {/* 4) 공동 구매 */}
        <Route path="/group-buy" element={<GroupBuy />} />
        {/* 5) 이벤트 확인 */}
        <Route path="/event-check" element={<EventCheck />} />
        <Route path="/event-check/:musicalId" element={<EventDetail/>}/>
        {/* 6) 게시판 */}

        <Route path="/board" element={<Board />} />
        <Route path="/post/1" element={<LostItemPost />} />
        {/* 7) 상세 페이지 */}
        <Route path="/detail" element={<Detail />} />
        {/* 9) 로그인/회원가입 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

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
  width: 1440px;
`;
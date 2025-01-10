
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; 

import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Detail from "./pages/Detail";
import Vision from "./pages/Vision";
import EventCheck from "./pages/EventCheck";
import GroupBuy from "./pages/GroupBuy";
import Board from "./pages/Board";

function App() {
  return (
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
        {/* 4) 공동 구매 */}
        <Route path="/group-buy" element={<GroupBuy />} />
        {/* 5) 이벤트트 확인 */}
        <Route path="/event-check" element={<EventCheck />} />
        {/* 6) 게시판 */}
        <Route path="/board" element={<Board />} />
        {/* 7) 상세 페이지 */}
        <Route path="/detail" element={<Detail />} />
        {/* 추후 더 많은 라우트 필요 시 추가 */}
      </Routes>
    </Router>
  );
}

export default App;

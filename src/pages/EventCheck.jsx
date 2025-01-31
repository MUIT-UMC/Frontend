import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

import EventSearchBar from "../components/eventcheck/EventSearchBar";
import MusicalEvent from "../components/eventcheck/MusicalEvent";
import EventContent from "../components/eventcheck/EventContent";

import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

const COLOR_MUIT_RED = "#A00000";

function EventCheck() {
  const [page, setPage] = useState(0); 

  const { data: events, error, isLoading } = useFetch(`/events?page=${page}`);
  console.log("현재 페이지:", page);

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <h2 className="Title-B-500">뮤지컬의 <span className="color-txt">이벤트 일정</span>을 확인해보세요!</h2>
      <EventSearchBar/>

      <NowShowing>
        <h1 className="B-Title-B-500">현재 진행중인 뮤지컬 이벤트</h1>

        <div className="select-area">
          <Select name="arrange">
            <option value="DailyLank">일간 랭킹 순</option>
            <option value="Latest">최신순</option>
            <option value="NearDeadline">마감일순</option>
          </Select>

          <Select name="location">
            <option value="all">지역 전체</option>
            <option value="SeoulKyeonggi">수도권</option>
            <option value="PKTK">경상권</option>
          </Select>
        </div>

        {isLoading ? (
          <p>이벤트를 불러오는 중...</p>
        ) : (
          <EventListArea>
            {events?.result?.content.map((musical) => (
              <MusicalEvent
                key={musical.musicalId}
                id={musical.musicalId}
                title={musical.musicalName}
                theater={musical.theatreName}
                begin={musical.perFrom}
                end={musical.perTo}
                event={musical.eventResultListDTO}
              />
            ))}
          </EventListArea>
        )}
        <Pagination>
          <button onClick={handlePrevPage} disabled={page === 0}>
            이전
          </button>
          <span>{page+1}</span>
          <button onClick={handleNextPage}>
            다음
          </button>
        </Pagination>
      </NowShowing>
    </Container>
  );
}

const Container = styled.div`
  font-family: Pretendard;
  padding: 100px;

  display: flex;
  align-items: center;
  flex-direction: column;

  h2{
    margin-bottom: 140px;
  }
  .Title-B-500{
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: #000;
  }
  .color-txt{
    color: ${COLOR_MUIT_RED}
  }
`
const NowShowing = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;

  margin-top: 120px;

  h1{
    margin: 0px;
  }
  .B-Title-B-500{
    color: #000;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;

    margin-bottom: 32px;
  }
  .select-area{
    display: flex;
    gap: 20px;
  }
`
const EventListArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 60px;
  gap: 100px;
`
const Select = styled.select`
  font-family: Pretendard;
  display: inline-flex;
  padding: 4px 12px;
  align-items: center;
  gap: 4px;
  border-radius: 3px;
  border: 1px solid #C1C1C1;

  color: #919191;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;

  button {
    padding: 8px 16px;
    border-radius: 3px;
    background: #a00000;
    color: #fff;
    border: none;
    cursor: pointer;
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
  
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;
export default EventCheck;

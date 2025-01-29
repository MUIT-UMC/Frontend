import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

import EventSearchBar from "../components/eventcheck/EventSearchBar";
import MusicalEvent from "../components/eventcheck/MusicalEvent";
import EventContent from "../components/eventcheck/EventContent";

import useCustomFetch from "../hooks/useCustomFetch";
import useFetch from "../hooks/useFetch";

const COLOR_MUIT_RED = "#A00000";

//mockdata
const mockMusicalEvent = [
  {
    id:1,
    img: 'https://ticketimage.interpark.com/Play/image/large/24/24016374_p.gif',
    title: '미아 파밀리아',
    theater: '링크아트센터드림 드림1관',
    begin: '2024.12.19',
    end: '2025.03.23',
    saved: false,
    event: [
      {
        order:1,
        startAt: '1/5(화)',
        finishAt: '1/30(토)',
        content: '티켓오픈'
      },
      {
        order:2,
        startAt: '1/16(토)',
        finishAt: '1/17(일)',
        content: '커튼콜 이벤트'
      },
      {
        order:3,
        startAt: '1/17(일)',
        finishAt: '1/19(화)',
        content: '포토부스 이벤트'
      },
    ]
  },
  {
    id:2,
    img: 'https://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif',
    title: '알라딘',
    theater: '링크아트센터드림 드림1관',
    begin: '2024.12.19',
    end: '2025.03.23',
    saved: false,
    event: [
      {
        order:1,
        startAt: '1/5(화)',
        finishAt: '1/30(토)',
        content: '티켓오픈'
      },
      {
        order:2,
        startAt: '1/16(토)',
        finishAt: '1/17(일)',
        content: '커튼콜 이벤트'
      },
      {
        order:3,
        startAt: '1/17(일)',
        finishAt: '1/19(화)',
        content: '포토부스 이벤트'
      },
    ]
  },
  {
    id:3,
    img: 'https://ticketimage.interpark.com/Play/image/large/23/23002291_p.gif',
    title: '데스노트',
    theater: '링크아트센터드림 드림1관',
    begin: '2024.12.19',
    end: '2025.03.23',
    saved: false,
    event: [
      {
        order:1,
        startAt: '1/5(화)',
        finishAt: '1/30(토)',
        content: '티켓오픈'
      },
      {
        order:2,
        startAt: '1/16(토)',
        finishAt: '1/17(일)',
        content: '커튼콜 이벤트'
      },
      {
        order:3,
        startAt: '1/17(일)',
        finishAt: '1/19(화)',
        content: '포토부스 이벤트'
      },
    ]
  },
  {
    id:4,
    img: 'https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif',
    title: '종의 기원',
    theater: '링크아트센터드림 드림1관',
    begin: '2024.12.19',
    end: '2025.03.23',
    saved: false,
    event: [
      {
        order:1,
        startAt: '1/5(화)',
        finishAt: '1/30(토)',
        content: '티켓오픈'
      },
      {
        order:2,
        startAt: '1/16(토)',
        finishAt: '1/17(일)',
        content: '커튼콜 이벤트'
      },
      {
        order:3,
        startAt: '1/17(일)',
        finishAt: '1/19(화)',
        content: '포토부스 이벤트'
      },
    ]
  },
  {
    id:5,
    img: 'https://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif',
    title: '베르테르',
    theater: '링크아트센터드림 드림1관',
    begin: '2024.12.19',
    end: '2025.03.23',
    saved: false,
    event: [
      {
        order:1,
        startAt: '1/5(화)',
        finishAt: '1/30(토)',
        content: '티켓오픈'
      },
      {
        order:2,
        startAt: '1/16(토)',
        finishAt: '1/17(일)',
        content: '커튼콜 이벤트'
      },
      {
        order:3,
        startAt: '1/17(일)',
        finishAt: '1/19(화)',
        content: '포토부스 이벤트'
      },
    ]
  },
  {
    id:6,
    img:'https://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif',
    title: '여신님이 보고 계셔',
    theater: '링크아트센터드림 드림1관',
    begin: '2024.12.19',
    end: '2025.03.23',
    saved: false,
    event: [
      {
        order:1,
        startAt: '1/5(화)',
        finishAt: '1/30(토)',
        content: '티켓오픈'
      },
      {
        order:2,
        startAt: '1/16(토)',
        finishAt: '1/17(일)',
        content: '커튼콜 이벤트'
      },
      {
        order:3,
        startAt: '1/17(일)',
        finishAt: '1/19(화)',
        content: '포토부스 이벤트'
      },
    ]
  },
]

function EventCheck() {
  {/*const {data : events, isLoading, isError} = useCustomFetch(`events/`);*/}

  const {data: events, error, isLoading} = useFetch(`http://13.209.69.125:8080/events/`);

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

        <EventListArea>
          {events?.result?.eventResultListDTOList.map((musical) => (
            <MusicalEvent
            key={musical.musicalId}
            id={musical.musicalId}
            title={musical.musicalName}
            //img={musical.img}
            theater={musical.theaterName}
            begin={musical.perFrom}
            end={musical.perTo}
            event={musical.eventResultListDTO}
            />
          ))}
        </EventListArea>
      </NowShowing>
    </Container>
  );
}

const Container = styled.div`
  font-family: Pretendard;
  padding: 100px 100px 0px 100px;

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
export default EventCheck;

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EventContent from "../components/eventcheck/EventContent";
import Calendar from "../components/Calendar";
import { GoChevronRight } from "react-icons/go";
import ChevronRight from '../assets/icons/ChevronRight.svg'

import useFetch from "../hooks/useFetch";

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

function EventDetail() {
    const { musicalId } = useParams();

    const {data: musicalEvents, error, loading} = useFetch(`/events/${musicalId}`);
    console.log(musicalEvents?.result);

    const {data: musicals, error2, loading2} = useFetch(`/musicals/${musicalId}`);
    console.log(musicals?.result?.posterUrl);


    return(
      <Container>
        <MusicalInfo>
          <div className="Title">
            <h3 className="title-B-600">{musicalEvents?.result?.musicalName}</h3>
            <img src={ChevronRight} className="ChevronRight"/>
          </div>
          <p className="body-M-600">{musicalEvents?.result?.theatreName}</p>
          <p className="body-M-500">{musicalEvents?.result?.perFrom}~{musicalEvents?.result?.perTo}</p>
          <img src={musicals?.result?.posterUrl} className="Poster"/>
        </MusicalInfo>
        <EventInfo>
          {musicalEvents?.result?.eventResultListDTO.map((musical) => (
            <EventContent
              key={musical.id}
              content={musical.name}
              startAt={musical.evFrom}
              finishAt={musical.evTo}
            />
          ))}
        </EventInfo>
        <CalendarArea>
          <Calendar />
        </CalendarArea>


      </Container>
    )
}

const Container = styled.div`
    font-family: Pretendard;
    padding: 80px 100px 0 100px;
    display: flex;
    gap: 40px;
`
const MusicalInfo = styled.div`
    h3{margin:0px;}
    p{margin:0px;}
    .Title{
        display: flex;
        align-items: center;
        margin-bottom: 26px;
    }
    .title-B-600{
        color: #000;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
    }
    .body-M-600{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: #000;       
    }
    .body-M-500{
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        color: #919191;       
    }
    .Poster{
        margin-top: 12px;
        height: 320px;
    }
    .ChevronRight{
      width: 24px;   
    }
`
const EventInfo = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const CalendarArea = styled.div`
    width: 70%;
    height: 600px;
`

export default EventDetail;
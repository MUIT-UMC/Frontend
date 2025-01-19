import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EventContent from "../components/eventcheck/EventContent";

import Calendar from "../components/Calendar";

import { GoChevronRight } from "react-icons/go";

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
    const [musicalEvent, setMusicalEvent] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        const fetchMusicalEvent = async () => {
            try {
                setMusicalEvent(mockMusicalEvent);
            }
            catch (error) {
                console.error("Error", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMusicalEvent();
    }, []);
    if (loading) {
        return <div>Loading...</div>
    }
    console.log(musicalEvent[0]?.event);

    return(
      <Container>
        <MusicalInfo>
          <div className="Title">
            <h3 className="title-B-600">{musicalEvent[0].title}</h3>
            <GoChevronRight size={24} color="#919191" />
          </div>
          <p className="body-M-600">{musicalEvent[0].theater}</p>
          <p className="body-M-500">{musicalEvent[0].begin}~{musicalEvent[0].end}</p>
          <img src={musicalEvent[0].img} />
        </MusicalInfo>
        <EventInfo>
          {musicalEvent[0]?.event.map((musical) => (
            <EventContent
              key={musical.order}
              content={musical.content}
              startAt={musical.startAt}
              finishAt={musical.finishAt}
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
    img{
        margin-top: 12px;

        height: 320px;
    }
`
const EventInfo = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;

`
const CalendarArea = styled.div`
    width: 100%;
    height: 600px;
`

export default EventDetail;
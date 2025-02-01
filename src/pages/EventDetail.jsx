import styled from "styled-components";
import { useParams } from 'react-router-dom';
import EventContent from "../components/eventcheck/EventContent";
import Calendar from "../components/Calendar";
import ChevronRight from '../assets/icons/ChevronRight.svg'

import useFetch from "../hooks/useFetch";
import formatDate from "../utils/formatDate";

function EventDetail() {
    const { musicalId } = useParams();

    const {data: musicalEvents, error, loading} = useFetch(`/events/${musicalId}`);

    const {data: musicals, error2, loading2} = useFetch(`/musicals/${musicalId}`);



    return(
      <Container>
        <MusicalInfo>
          <div className="Title">
            <h3 className="title-B-600">{musicalEvents?.result?.musicalName}</h3>
            <img src={ChevronRight} className="ChevronRight"/>
          </div>
          <p className="body-M-600">{musicalEvents?.result?.theatreName}</p>
          <p className="body-M-500">{formatDate(musicalEvents?.result?.perFrom)}~{formatDate(musicalEvents?.result?.perTo)}</p>
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
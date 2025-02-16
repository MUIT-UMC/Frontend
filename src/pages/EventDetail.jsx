import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import EventContent from "../components/eventcheck/EventContent";
import Calendar from "../components/Calendar2";
import ChevronRight from '../assets/icons/ChevronRight.svg';
import useCustomFetch from "../hooks/fetchWithAxios";
import formatDate from "../utils/formatDate";

function EventDetail() {
  const { musicalId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: musicalEvents } = useCustomFetch(`/events/${musicalId}`);
  const { data: musicals } = useCustomFetch(`/musicals/${musicalId}`);

  const handleDateSelect = (date) => {
      setSelectedDate(date);
  };

  const navigate = useNavigate();
  const toMusicalDetail = () => {
    navigate(`/detail/${musicalId}`, {
        replace: false,
    })
  }

  return (
      <Container>
          <MusicalInfo>
              <div className="Title" onClick={toMusicalDetail}>
                  <h3 className="title-B-600">{musicalEvents?.result?.musicalName}</h3>
                  <img src={ChevronRight} className="ChevronRight" />
              </div>
              <p className="body-M-600">{musicalEvents?.result?.theatreName}</p>
              <p className="body-M-500">{formatDate(musicalEvents?.result?.perFrom)} ~ {formatDate(musicalEvents?.result?.perTo)}</p>
              <img src={musicals?.result?.posterUrl} className="Poster" />
          </MusicalInfo>
          
          <EventInfo>
              {musicalEvents?.result?.eventResultListDTO.map((musical, index) => {
                  const isSelected = selectedDate && musical.evFrom <= selectedDate && (!musical.evTo || musical.evTo >= selectedDate);
                  console.log(musical.length);
                  return (
                      <EventContent
                          key={musical.id}
                          content={musical.name}
                          startAt={musical.evFrom}
                          finishAt={musical.evTo}
                          isSelected={isSelected}
                      />
                  );
              })}
          </EventInfo>
          <CalendarArea>

              <Calendar onDateSelect={handleDateSelect} />
          </CalendarArea>
      </Container>
  );
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
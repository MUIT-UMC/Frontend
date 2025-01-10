import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function EventCalendar() {
  return (
    <CalendarBox>
            달력
          </CalendarBox>
  )
}

export default EventCalendar;


const CalendarBox = styled.div`
  width: 300px;
  height: 504px;
  flex-shrink: 0;
  border: 1px solid #E6E6E6;
background: #FFF;
`
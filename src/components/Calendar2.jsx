import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NextMonth from "../assets/icons/NextMonth.svg";
import PrevMonth from "../assets/icons/PrevMonth.svg";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const Calendar = ({ variant = "default" }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);

    const { musicalId } = useParams();
    const { data, error, loading } = useFetch(`/events/${musicalId}`);

    useEffect(() => {
        if (data?.isSuccess) {
            setEvents(data?.result?.eventResultListDTO || []);
        }
    }, [data]);

    console.log(events);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day) => {
        if (day) {
            setSelectedDate(new Date(year, month, day));
        }
    };

    const getEventsForDate = (day) => {
        if (!day) return [];
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return events.filter(event => event.evFrom <= dateStr && event.evTo >= dateStr);
    };

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) daysArray.push(null);
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

    return (
        <CalendarWrapper>
            <Header>
                <NavButton onClick={handlePrevMonth}>
                    <img src={PrevMonth} alt="Previous Month" />
                </NavButton>
                <MonthYear>{`${year}.${String(month + 1).padStart(2, "0")}`}</MonthYear>
                <NavButton onClick={handleNextMonth}>
                    <img src={NextMonth} alt="Next Month" />
                </NavButton>
            </Header>

            <DaysGrid>
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                    <DayName key={day}>{day}</DayName>
                ))}
            </DaysGrid>

            <DaysGrid>
                {daysArray.map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const isSelected = selectedDate?.getDate() === day;
                    return (
                        <Day key={index} onClick={() => handleDateClick(day)} isSelected={isSelected}>
                            <DayNumber>{day || ""}</DayNumber>
                            {dayEvents.map((event, idx) => (
                                <EventLabel key={idx} isSelected={isSelected}>
                                    {event.name.length > 5 ? `${event.name.slice(0, 5)}...` : event.name}
                                </EventLabel>
                            ))}
                        </Day>
                    );
                })}
            </DaysGrid>
        </CalendarWrapper>
    );
};

const CalendarWrapper = styled.div`
  width: 600px;
  height: 600px;
  font-family: Pretendard;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  padding: 20px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const MonthYear = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 10px;
  row-gap: 60px;
`;

const DayName = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 500;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  color: #000;
  position: relative;
  border: ${({ isSelected }) => (isSelected ? "2px solid #A00000" : "none")};
  
`;

const DayNumber = styled.div`
  font-size: 24px;
`;

const EventLabel = styled.div`
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;

    background: ${({ isSelected }) => (isSelected ? "#A00000" : "#C1C1C1")};

    height: 20px;
    padding: 1px 8px
    border-radius: 2px;
    margin-top: 4px;
`;

export default Calendar;

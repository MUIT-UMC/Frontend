import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NextMonth from "../assets/icons/NextMonth.svg";
import PrevMonth from "../assets/icons/PrevMonth.svg";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const Calendar = ({ variant = "default", onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);

    const { musicalId } = useParams();
    const { data } = useFetch(`/events/${musicalId}`);

    useEffect(() => {
        if (data?.isSuccess) {
            setEvents(data?.result?.eventResultListDTO || []);
        }
    }, [data]);

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
            const newSelectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            setSelectedDate(newSelectedDate);
            onDateSelect(newSelectedDate); // 🔥 부모 컴포넌트에 전달
        }
    };

    const getEventsForDate = (day) => {
        if (!day) return [];
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return events.filter(event => 
            event.evFrom <= dateStr && (!event.evTo || event.evTo >= dateStr)
        );
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
                    const isSelected = selectedDate === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    return (
                        <Day key={index} onClick={() => handleDateClick(day)} isSelected={isSelected}>
                            <DayNumber isSelected={isSelected}>{day || ""}</DayNumber>
                            {dayEvents.map((event, idx) => (
                                <EventLabel key={idx} isSelected={isSelected}>
                                    {event.name}
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
  justify-content: start;

  cursor: pointer;
  color: #000;
  position: relative;
`;

const DayNumber = styled.div`
    width: 24px;
    height: 24px;
    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;
    border: ${({ isSelected }) => (isSelected ? "2px solid #A00000" : "none")};

    color: #000;
    text-align: center;
    font-size: 24px;
    font-weight: 500;
`;

const EventLabel = styled.div`
    color: #FFF;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    background: ${({ isSelected }) => (isSelected ? "#A00000" : "#C1C1C1")};

    height: 20px;
    width: 80%;
    padding: 1px 8px;
    border-radius: 2px;
    margin-top: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;
export default Calendar;

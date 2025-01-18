import React, { useState } from "react";
import styled from "styled-components";
import NextMonth from "../assets/icons/NextMonth.svg";
import PrevMonth from "../assets/icons/PrevMonth.svg";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the first day of the current month
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Create a grid of days
  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Handle previous and next month navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Handle date selection
  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(new Date(year, month, day));
    }
  };

  return (
      <CalendarWrapper>
          <Header>
              <NavButton onClick={handlePrevMonth}><img src={PrevMonth}/></NavButton>
              <MonthYear>
                  {currentDate.toLocaleString("default", { month: "long" })} {year}
              </MonthYear>
              <NavButton onClick={handleNextMonth}><img src={NextMonth}/></NavButton>
          </Header>

          <DaysGrid>
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <DayName key={day}>{day}</DayName>
              ))}
          </DaysGrid>
          <DaysGrid>
                  {daysArray.map((day, index) => (
                      <Day
                          key={index}
                          isSelected={selectedDate?.getDate() === day && selectedDate?.getMonth() === month}
                          onClick={() => handleDateClick(day)}
                      >
                          {day || ""}
                      </Day>
                  ))}
          </DaysGrid>
      </CalendarWrapper>
  );
};

// Styled components
const CalendarWrapper = styled.div`
  //border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  font-family: Pretendard;
  
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  
  color: #000;
  padding: 20px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const MonthYear = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

const DaysGrid = styled.div`
  display: grid;
  font-size: 24px;
  grid-template-columns: repeat(7, 1fr);
  gap: 15px;
  padding: 10px;
`;

const DayName = styled.div`
  text-align: center;

  margin-bottom: 32px;

  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;

const Day = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  width: 30px;
  height: 30px;

  margin-bottom: 32px;

  background: ${({ isSelected }) => (isSelected ? "#A00000" : "white")};
  color: ${({ isSelected }) => (isSelected ? "#FFF" : "#000")};

  cursor: pointer;

  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;

export default Calendar;

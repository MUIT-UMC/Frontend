import React, { useState } from "react";
import styled from "styled-components";
import NextMonth from "../assets/icons/NextMonth.svg";
import PrevMonth from "../assets/icons/PrevMonth.svg";

const Calendar = ({ variant = "default" }) => {
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
    <CalendarWrapper variant={variant}>
      <Header variant={variant}>
        <NavButton onClick={handlePrevMonth}>
          <img src={PrevMonth} alt="Previous Month" />
        </NavButton>
        <MonthYear variant={variant}>
        {variant === "compact"
          ? `${year}.${String(month + 1).padStart(2, "0")}` 
          : currentDate.toLocaleString("default", { month: "long" }) + ` ${year}`} 
        </MonthYear>
        <NavButton onClick={handleNextMonth}>
          <img src={NextMonth} alt="Next Month" />
        </NavButton>
      </Header>

      <DaysGrid variant={variant}>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <DayName key={day} variant={variant}>
            {day}
          </DayName>
        ))}
      </DaysGrid>
      <DaysGrid variant={variant}>
        {daysArray.map((day, index) => (
          <Day
            key={index}
            isSelected={
              selectedDate?.getDate() === day && selectedDate?.getMonth() === month
            }
            onClick={() => handleDateClick(day)}
            variant={variant}
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
  border-radius: 8px;
  overflow: hidden;
  font-family: Pretendard;

  width: ${({ variant }) => (variant === "compact" ? "300px" : "100%")};
`;

const Header = styled.div`
  display: flex;
  justify-content: ${({ variant }) => (variant === "compact" ? "flex-start" : "center")};
  align-items: center;
  color: #000;
  padding: 20px;
  padding-left:  ${({ variant }) => (variant === "compact" ? "10px" : "20px")};
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
  font-size: ${({ variant }) => (variant === "compact" ? "20px" : "26px")};
  font-weight: bold;
`;

const DaysGrid = styled.div`
  display: grid;
  font-size: ${({ variant }) => (variant === "compact" ? "16px" : "24px")};
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ variant }) => (variant === "compact" ? "10px" : "15px")};
  padding: 10px;
  padding-top: ${({ variant }) => (variant === "compact" ? "0px" : "10px")};
`;

const DayName = styled.div`
  text-align: center;
  margin-bottom: ${({ variant }) => (variant === "compact" ? "3px" : "32px")};
  color: ${({ variant }) => (variant === "compact" ? "#919191" : "#000")};
  font-size: ${({ variant }) => (variant === "compact" ? "14px" : "24px")};
  font-weight: 500;
`;

const Day = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  width: ${({ variant }) => (variant === "compact" ? "24px" : "30px")};
  height: ${({ variant }) => (variant === "compact" ? "24px" : "30px")};
  margin-bottom: ${({ variant }) => (variant === "compact" ? "3px" : "32px")};

  //background: ${({ isSelected }) => (isSelected ? "#A00000" : "white")};
  color:#000;
  border: ${({ isSelected }) => (isSelected ? "2px solid #A00000" : "#000")};

  cursor: pointer;
  font-size: ${({ variant }) => (variant === "compact" ? "14px" : "24px")};
`;

export default Calendar;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CalendarIcon from "../../../assets/icons/Calendar.svg";
import AddButton from "../../../assets/icons/AddButton.svg";
import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import EventSample from "./eventlist-sample.svg";

import SearchBar from '../components/SearchBar';
import Calendar from "../components/Calendar";

import { eventData } from "./AdminEvent";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_SUB = "#919191";

function AdminEventDetail() {
  const { musicalName } = useParams();
  const navigate = useNavigate();

  const eventInfo = eventData.find(item => item.musical === musicalName);

  const [eventList, setEventList] = useState([
    { dateRange: "2025.01.05~01.30", eventName: "티켓 오픈" },
    { dateRange: "2025.01.16~01.17", eventName: "커튼콜 이벤트" },
    { dateRange: "2025.01.17~01.19", eventName: "포토부스 이벤트" }
  ]);

  const [newEvent, setNewEvent] = useState({ dateRange: "", eventName: "" });
  const [showEventInput, setShowEventInput] = useState(false);

  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [calendarMode, setCalendarMode] = useState(null); // "first" 또는 "second"
  const [showCalendar, setShowCalendar] = useState(false);

  // 인풋에 포커스 잡기 위한 ref
  const inputRef = useRef(null);
  // EventTable 요소의 위치를 측정하기 위한 ref
  const eventTableRef = useRef(null);
  // CalendarContainer 위치를 저장할 state
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  };

  const formatMonthDay = (date) => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${mm}.${dd}`;
  };

  useEffect(() => {
    if (firstDate) {
      if (secondDate) {
        if (firstDate.getTime() === secondDate.getTime()) {
          setNewEvent(prev => ({ ...prev, dateRange: formatDate(firstDate) }));
        } else {
          setNewEvent(prev => ({ ...prev, dateRange: `${formatDate(firstDate)}~${formatMonthDay(secondDate)}` }));
        }
      } else {
        setNewEvent(prev => ({ ...prev, dateRange: formatDate(firstDate) }));
      }
    } else {
      setNewEvent(prev => ({ ...prev, dateRange: "" }));
    }
  }, [firstDate, secondDate]);

  useEffect(() => {
    if (showEventInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showEventInput]);

  const handlePlusClick = () => {
    setShowEventInput(true);
  };

  const handleEventNameChange = (e) => {
    setNewEvent(prev => ({ ...prev, eventName: e.target.value }));
  };

  const handleApply = () => {
    if (newEvent.dateRange && newEvent.eventName) {
      setEventList(prev => [...prev, newEvent]);
      setNewEvent({ dateRange: "", eventName: "" });
      setFirstDate(null);
      setSecondDate(null);
      setShowEventInput(false);
    } else {
      alert("새 이벤트의 날짜와 이름을 모두 입력해주세요.");
    }
  };

  const handleDateSelect = (date) => {
    if (calendarMode === "first") {
      setFirstDate(date);
    } else if (calendarMode === "second") {
      setSecondDate(date);
    }
    setCalendarMode(null);
    setShowCalendar(false);
  };

  // openCalendar 함수: EventTable의 하단 위치를 기준으로 캘린더 위치 설정
  const openCalendar = (mode) => {
    setCalendarMode(mode);
    if (eventTableRef.current) {
      const rect = eventTableRef.current.getBoundingClientRect();
      // EventTable의 하단에 맞추기 위해 rect.bottom 사용, 좌측은 rect.left
      setCalendarPos({ top: rect.bottom, left: rect.left });
    }
    setShowCalendar(true);
  };

  return (
    <Container>
      <Tilte>이벤트 관리</Tilte>

      <SearchSection>
        <SearchBar />
        <CheckBoxes>
          {["이벤트 날짜", "이벤트명"].map((label) => (
            <CheckBoxWrapper key={label}>
              <CheckBox onClick={() => { /* 토글 로직 추가 가능 */ }}>
                <img src={CheckBoxIcon} alt="CheckBox Icon" />
              </CheckBox>
              <CheckText>{label}</CheckText>
            </CheckBoxWrapper>
          ))}
          <CheckSearchIcon>
            <img src={SearchIconBlack} alt="Search Icon" />
          </CheckSearchIcon>
        </CheckBoxes>
      </SearchSection>

      <Subtitle>&lt; {musicalName} / {eventInfo ? eventInfo.place : "장소 미정"}</Subtitle>

      <MainSection>
        <LeftArea>
          <EventTable ref={eventTableRef}>
            <thead>
              <Tr>
                <Th>이벤트 날짜</Th>
                <Th>이벤트명</Th>
              </Tr>
            </thead>
            <tbody>
              {eventList.map((ev, index) => (
                <Tr key={index}>
                  <Td>{ev.dateRange}</Td>
                  <Td>{ev.eventName}</Td>
                </Tr>
              ))}
              <Tr>
                <Td>
                  {firstDate ? (
                    <DateDisplay>
                      {newEvent.dateRange}
                      {!secondDate && (
                        <SmallIconButton onClick={() => openCalendar("second")}>
                          <img src={CalendarIcon} alt="Calendar Icon" />
                        </SmallIconButton>
                      )}
                    </DateDisplay>
                  ) : (
                    <IconButton onClick={() => openCalendar("first")}>
                      <img src={CalendarIcon} alt="Calendar Icon" />
                    </IconButton>
                  )}
                </Td>
                <Td>
                  {showEventInput ? (
                    <EventInput
                      type="text"
                      value={newEvent.eventName}
                      onChange={handleEventNameChange}
                      onBlur={() => setShowEventInput(false)}
                      placeholder="이벤트명 입력"
                      ref={inputRef}
                    />
                  ) : (
                    <IconButton onClick={handlePlusClick}>
                      <img src={AddButton} alt="Add Button" />
                    </IconButton>
                  )}
                </Td>
              </Tr>
            </tbody>
          </EventTable>
        </LeftArea>
        <RightArea>
          <Calendar variant="compact" />
          <hr />
          <Sampleimg><img src={EventSample} alt="Sample" /></Sampleimg>
        </RightArea>
      </MainSection>

      <GrayButton onClick={handleApply}>적용하기</GrayButton>

      {showCalendar && (
        <CalendarOverlay onClick={() => setShowCalendar(false)}>
          <CalendarContainer
            style={{ position: 'absolute', top: calendarPos.top-108, left: calendarPos.left-395 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar variant="compact" onDateSelect={handleDateSelect} />
          </CalendarContainer>
        </CalendarOverlay>
      )}
    </Container>
  );
}

export default AdminEventDetail;

/* ────────── Styled Components ────────── */

const Container = styled.div`
  position: relative;
  width: 1150px;
  height: 916px;
  background-color: ${COLOR_WHITE};
  padding-left: 71px;
  padding-right: 131px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Tilte = styled.div`
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_MUIT_RED};
  margin-top: 4px;
`;

const SearchSection = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxes = styled.div`
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
`;

const CheckBox = styled.button`
  border: none;
  cursor: pointer;
  width: 19px;
  height: 19px;
  background-color: transparent;
`;

const CheckText = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const CheckSearchIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Subtitle = styled.div`
  font-family: "Pretendard";
  font-size: 20px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
  margin-top: 90px;
  margin-left: 0;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
`;

const LeftArea = styled.div`
  width: 441px;
`;

const RightArea = styled.div`
  width: 300px;
  height: 516px;
  max-height: 516px;
  border: 1px solid #E6E6E6;
  margin-right: 70px;
  
  hr {
    border: none;
    border-top: 1px solid #E6E6E6;
    width: 90%;
    margin: 0 16px;
  }
`;

const Sampleimg = styled.div`
  margin-left: 16px;
  margin-top: 20px;
`;

const GrayButton = styled.button`
  align-self: flex-end;
  margin-top: 70px;
  width: 156px;
  height: 38px;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_WHITE};
  border: 1px solid #555555;
  border-radius: 8px;
  background-color: #555555;
  cursor: pointer;
`;

const EventTable = styled.table`
  width: 100%;
  margin-top: 33px;
  border-collapse: collapse;
`;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const Td = styled.td`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const IconButton = styled.div`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
`;

const EventInput = styled.input`
  width: 100%;
  font-size: 14px;
  font-family: "Pretendard";
  border: none;
  outline: none;
  background-color: transparent;
  text-align: left;
`;

const CalendarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarContainer = styled.div`
  background-color: ${COLOR_WHITE};
  padding: 10px;
  border: 1px solid ${COLOR_GRAY_MAINTEXT};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SmallIconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

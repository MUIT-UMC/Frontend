
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import CalendarIcon from "../../../assets/icons/Calendar.svg";
import AddButton from "../../../assets/icons/AddButton.svg";
import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../assets/icons/AdminCheckboxRed.svg";
import EventContent from "../components/EventContent";

import SearchBar from '../components/SearchBar';
import Calendar from "../components/Calendar";


const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = import.meta.env.VITE_APP_ACCESS_TOKEN_ADMIN;
const colLabels = ["이벤트 날짜", "이벤트명"];

function AdminEventDetail() {

  // 1. 체크박스 //////////////////////////////////////////////////////////////////
  const [checkboxes, setCheckboxes] = useState([false, false]);
  const toggleCheck = (index) => {
    setCheckboxes((prev) => {
      if (prev[index]) { 
        return [false, false];
      }                 
      const newState = [false, false];
      newState[index] = true;
      return newState;
    });
  };
  const isAnyChecked = checkboxes.some((checked) => checked === true);

  const { musicalId } = useParams();  // URL 파라미터 (/adminpage/event/detail/:musicalId)
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false); 
  const [musicalInfo, setmusicalInfo] = useState(null);
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    if (musicalId) {
      fetchEventDetail(musicalId);
    }
  }, [musicalId]);
  // 뮤지컬-이벤트 상세 조회 API
  const fetchEventDetail = async (musicalId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/events/${musicalId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const data = res.data.result || {};
      const refined = {
        musicalId: data.musicalId,
        musicalName: data.musicalName,
        place: data.place,
      };
      const evList = data.events?.map(ev => ({
        evFrom: ev.evFrom,
        evTo: ev.evTo,
        eventDuration: `${ev.evFrom} ~ ${ev.evTo}`,
        eventName: ev.eventName
      })) || [];
      setmusicalInfo(refined);
      setEventList(evList);
    } catch (err) {
      console.error("이벤트 정보 조회 실패:", err);
      alert("해당 이벤트를 조회할 수 없습니다.");
      navigate("/adminpage/event"); 
    }
  };

  const [newEvent, setNewEvent] = useState({ eventDuration: "", eventName: "" });
  const [showEventInput, setShowEventInput] = useState(false);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [calendarMode, setCalendarMode] = useState(null); // "first" 또는 "second"
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  // 캘랜더 외부클릭
  useEffect(() => {
    function handleClickOutside(e) {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // 캘랜더 날짜
  useEffect(() => {
    if (firstDate && secondDate) {
      const date1 = firstDate.toISOString().split("T")[0]; 
      const date2 = secondDate.toISOString().split("T")[0];
      setNewEvent(prev => ({ ...prev, eventDuration: `${date1} ~ ${date2}` }));
    }
    else if (firstDate && !secondDate) {
      const date1 = firstDate.toISOString().split("T")[0];
      setNewEvent(prev => ({ ...prev, eventDuration: date1 }));
    }
    else {
      setNewEvent(prev => ({ ...prev, eventDuration: "" }));
    }
  }, [firstDate, secondDate]);

  // 인풋 포커스
  const inputRef = useRef(null);
  useEffect(() => {
    if (showEventInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showEventInput]);

  const handleEdit = () => {
    setEditMode(true);
  };
  const handlePlusClick = () => {
    setShowEventInput(true);
  };
  const handleEventNameChange = (e) => {
    setNewEvent(prev => ({ ...prev, eventName: e.target.value }));
  };
  // 이벤트 추가 API
  const handleApply = async () => {
    if (newEvent.eventDuration && newEvent.eventName) {
      const [date1, date2] = newEvent.eventDuration.split(" ~ ");
      if (!date1) {
        alert("날짜가 올바르지 않습니다.");
        return;
      }
      const body = {
        evFrom: date1,
        evTo: date2 || date1, 
        eventName: newEvent.eventName
      };
      try {
        await axios.post(`${baseURL}/admin/events/${musicalId}`, body, {
          headers: { Authorization: `Bearer ${token_admin}` },
        });
        await fetchEventDetail(musicalId);
      } catch (error) {
        console.error("이벤트 생성 실패:", error);
        alert("이벤트 생성에 실패했습니다.");
      }
      setNewEvent({ eventDuration: "", eventName: "" });
      setFirstDate(null);
      setSecondDate(null);
      setShowEventInput(false);
      setEditMode(false);
    } else {
      alert("새 이벤트의 날짜와 이름을 모두 입력해주세요.");
    }
  };

  const handleDateSelect = (date) => {
    if (calendarMode === "first") {
      setFirstDate(date);
    } else if (calendarMode === "second") {
      if (!firstDate) {
        return;
      }
      if (date < firstDate) {
        const date1 = firstDate.toISOString().split("T")[0];
        alert(`${date1} 이전 날짜는 선택 불가능 합니다.`);
        return; 
      }
      setSecondDate(date);
    }
    setCalendarMode(null);
    setShowCalendar(false);
  };

  const openCalendar = (mode) => {
    setCalendarMode(mode);
    setShowCalendar(true);
  };

  return (
    <Container>
      <Tilte>이벤트 관리</Tilte>

      <SearchSection>
        <SearchBar />
        <CheckBoxes>
          {colLabels.map((label, idx) => (
            <CheckBoxWrapper key={label}>
              <CheckBox onClick={() => toggleCheck(idx)}>
                <img
                  src={checkboxes[idx] ? CheckBoxIconRed : CheckBoxIcon}
                  alt="CheckBox Icon"
                />
              </CheckBox>
              <CheckText>{label}</CheckText>
            </CheckBoxWrapper>
          ))}
          <CheckSearchIcon>
            <img src={isAnyChecked ? SearchIconRed : SearchIconBlack} alt="Search Icon" />
          </CheckSearchIcon>
        </CheckBoxes>
      </SearchSection>

      <Subtitle>
        <BackButton onClick={() => navigate(-1)}>
          &lt;
        </BackButton>
        &nbsp; {musicalInfo?.musicalName} / {musicalInfo?.place}
      </Subtitle>

      <MainSection>
        <LeftArea>
          <EventTable>
            <thead>
              <Tr>
                <Th>이벤트 날짜</Th>
                <Th>이벤트명</Th>
              </Tr>
            </thead>
            <tbody>
              {eventList.map((ev, index) => (
                <Tr key={index}>
                  <Td>{ev.eventDuration}</Td>
                  <Td>{ev.eventName}</Td>
                </Tr>
              ))}
              {editMode && (
                <Tr>
                  <Td>
                    {firstDate ? (
                      <DateDisplay>
                        {newEvent.eventDuration}
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
              )}  
            </tbody>
          </EventTable>

          {showCalendar && (
            <CalendarWrapper ref={calendarRef}>
              <Calendar
                variant="compact"
                onDateSelect={handleDateSelect}
              />
            </CalendarWrapper>
          )}

        </LeftArea>
        <RightArea>
          <EventCalendar>
            <Calendar variant="compact" />
            <hr />
            <EventsContainer>
              {eventList.map((ev, index) => (
                <EventContent
                  key={index}
                  content={ev.eventName}
                  startAt={ev.evFrom}
                  finishAt={ev.evTo}
                />
              ))}
            </EventsContainer>
          </EventCalendar>
          {!editMode ? (
            <RedButton onClick={handleEdit}>추가하기</RedButton> 
          ) : (
            <GrayButton onClick={handleApply}>적용하기</GrayButton>
          )}
        </RightArea>
      </MainSection>

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

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 33px;
`;

const LeftArea = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
`;

const RightArea = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 70px;
`;

const EventCalendar = styled.div`
  width: 100%;
  border: 1px solid #E6E6E6;
  
  hr {
    border: none;
    border-top: 1px solid #E6E6E6;
    width: 90%;
    margin: 0 16px;
  }
`;

const EventsContainer = styled.div`
  width: 100%;
  max-height: 225px; /* 테이블 높이가 길어질 경우 스크롤되게 */
  overflow-y: auto;
`;

const RedButton = styled.button`
  align-self: flex-end;
  margin-top: 40px;
  width: 156px;
  height: 38px;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 8px;
  background-color: ${COLOR_MUIT_RED};
  cursor: pointer;
`;

const GrayButton = styled.button`
  align-self: flex-end;
  margin-top: 40px;
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
  width: 240px;
  text-align: left;
  padding: 8px;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: #8F8E94;
`;

const Td = styled.td`
  width: 240px;
  text-align: left;
  padding: 8px;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const IconButton = styled.div`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  width: 20px;
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

const CalendarWrapper = styled.div`
  width: 300px;
  margin-top: 10px; 
  border: 1px solid ${COLOR_GRAY_MAINTEXT};
  padding: 10px;
`;
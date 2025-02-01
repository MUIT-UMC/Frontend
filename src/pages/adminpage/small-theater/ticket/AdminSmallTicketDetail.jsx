
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SearchIconBlack from "../../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../../assets/icons/AdminCheckboxRed.svg";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

import SearchBar from '../../components/SearchBar';
import {smallTicketData, colKeys, colLabels} from "./AdminSmallTicket";

export default function AdminSmallTicketDetail() {

  // 1. 체크박스 기능 ////////////////////////////////////////////////
  const [checkboxes, setCheckboxes] = useState([false, false, false]);
  const toggleCheck = (index) => {
    setCheckboxes((prev) => {
      if (prev[index]) { // 만약 이미 체크되어 있다면 => 전부 해제
        return [false, false, false];
      }                 // 아니라면 => 해당 index만 true, 나머지는 false
      const newState = [false, false, false];
      newState[index] = true;
      return newState;
    });
  };
  const isAnyChecked = checkboxes.some((checked) => checked === true);


  const { smallTitle } = useParams();  // URL 파라미터 (/adminpage/small-theater/ticket/detail/:smallTitle)
  const navigate = useNavigate();
  const [smallTicketInfo, setSmallTicketInfo] = useState(null);

  useEffect(() => {
    const found = smallTicketData.find((item) => item.title === smallTitle);
    if (found) {
      setSmallTicketInfo(found);
    } else {
      alert("해당 소공연을 찾지 못했습니다.");
      navigate("/adminpage/small-theater/ticket");
    }
  }, [smallTitle, navigate]);

  // 2) 수정 관련 상태 ////////////////////////////////////////////
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    dateTime: "",
    reserveStatus: ""
  });
  useEffect(() => {
    if (smallTicketInfo) {
      setEditForm({
        title: smallTicketInfo.title,
        dateTime: smallTicketInfo.dateTime,
        reserveStatus: smallTicketInfo.reserveStatus,
      });
    }
  }, [smallTicketInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // 2) 수정 모드 ////////////////////////////////////////////
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleApply = () => {
    // 임시로 console.log
    console.log("수정 완료:", editForm);

    // API적용시 서버에 PATCH 요청 등으로 저장 후:
    // fetch(`/api/users/${userId}`, { method:"PATCH", body: JSON.stringify(editForm) })
    //   .then(...)
    //   .catch(...)

    // 수정 적용 
    setSmallTicketInfo(editForm);
    setEditMode(false);
  };
  if (!smallTicketInfo) return null; // 아직 로딩 or 없는경우

  return (
    <Container>
      <Tilte>소극장 공연 관리</Tilte>
      <PageMenu>
        <MenuLink $active={location.pathname.startsWith("/adminpage/small-theater/ticket")}
        to="/adminpage/small-theater/ticket">
            소극장 티켓 관리</MenuLink>
        <MenuLink $active={location.pathname.startsWith("/adminpage/small-theater/reserve")}
        to="/adminpage/small-theater/reserve">
            예약 내역 관리</MenuLink>
        <MenuLink $active={location.pathname.startsWith("/adminpage/small-theater/refund")}
        to="/adminpage/small-theater/refund">
            환불 내역 관리</MenuLink>
      </PageMenu>
      <SearchSection>
        <SearchBar/>
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
          <CheckSearchIcon><img src={isAnyChecked ? SearchIconRed : SearchIconBlack} alt="Search Icon" /></CheckSearchIcon>
        </CheckBoxes>
      </SearchSection>
      
      <Subtitle>&lt; {smallTitle}</Subtitle>

      {!editMode ? (
        // --- 정보표시만 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>소극장 공연 이름</Th>
              <Td>{smallTicketInfo.title}</Td>
            </Tr>
            <Tr>
              <Th>날짜</Th>
              <Td>{smallTicketInfo.dateTime}</Td>
            </Tr>
            <Tr>
              <Th>예약 현황</Th>
              <Td>{smallTicketInfo.reserveStatus}</Td>
            </Tr>
          </tbody>
        </InfoTable>
      ) : (
        // --- 수정모드 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>소극장 공연 이름</Th>
              <Td>
                <Input
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>날짜</Th>
              <Td>
                <Input
                  name="dateTime"
                  value={editForm.dateTime}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>예약 현황</Th>
              <Td>
                <Input
                  name="reserveStatus"
                  value={editForm.reserveStatus}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
          </tbody>
        </InfoTable>
      )}
      {/* 하단 버튼 */}
      {!editMode ? (
        <RedButton onClick={handleEdit}>수정하기</RedButton>
      ) : (
        <GrayButton onClick={handleApply}>적용하기</GrayButton>
      )}
    </Container>
  );

}


/* ---------------- styled components ---------------- */


const Container = styled.div`
  position: relative;
  width:  1150px;
  height: 916px;
  background-color: ${COLOR_WHITE};
  padding-left: 71px;
  padding-right:  131px;
  box-sizing: border-box;

  display:  flex;
  flex-direction:  column;
`;

const Tilte = styled.div`
  margin-top: 4px;
  font-family:  "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color:  ${COLOR_MUIT_RED};
`;

const PageMenu = styled.div`
  margin-top: 12px;
  display:  flex;
  justify-content:  flex-start;
  align-content:  center;
  gap:  12px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  font-family:  "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color:  ${({ $active }) => ($active ? COLOR_GRAY_MAINTEXT : COLOR_GRAY_UNSELECTED)};

  &:hover {
    color: ${COLOR_GRAY_MAINTEXT};
  }
`;

const SearchSection = styled.div`
  margin-top:  30px;
  display:  flex;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBoxes = styled.div`
  display:  flex;
  gap:  18px;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBoxWrapper = styled.div`
  display:  flex;
  gap:  15px;
  justify-content:  space-between;
  align-items:  center;
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
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.div`
  margin-top: 94px;
  margin-left: 145px;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const InfoTable = styled.table`
  width:  609px;
  margin-top: 26px;
  margin-left: 145px;
  border-collapse: collapse;
`;

const Tr = styled.tr``;

const Th = styled.th`
  width: 150px;
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;
const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const Input = styled.input`
  width: 300px;
`;

const RedButton = styled.button`
  margin-left: 607px;
  margin-top: 270px;
  width: 156px;
  height: 38px;

  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_WHITE};

  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 8px;
  background-color: ${COLOR_MUIT_RED};
`;

const GrayButton = styled.button`
  margin-left: 607px;
  margin-top: 270px;
  width: 156px;
  height: 38px;
  
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_WHITE};

  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #555555;
  border-radius: 8px;
  background-color: #555555;
`;

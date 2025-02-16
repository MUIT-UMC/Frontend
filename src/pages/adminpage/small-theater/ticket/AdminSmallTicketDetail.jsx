
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'; 

import SearchIconBlack from "../../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../../assets/icons/AdminCheckboxRed.svg";

import SearchBar_Mock from '../../components/SearchBar_Mock';

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = localStorage.getItem("adminToken");
const colLabels = ["소극장 공연 이름", "날짜/시간", "예약현황"];

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


  const { smallMusicalId } = useParams();  // URL 파라미터 (/adminpage/small-theater/ticket/detail/:smallMusicalId)
  const navigate = useNavigate();
  const [smallTicketInfo, setSmallTicketInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    musicalName: "",
    schedule: "",
    reserveStatus: "",
  });
  useEffect(() => {
    if (smallMusicalId) {
      fetchUserDetail(smallMusicalId);
    }
  }, [smallMusicalId]);
  // 소극장 공연 상세 조회 API
  const fetchUserDetail = async (smallMusicalId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/amateur-tickets/${smallMusicalId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const data = res.data.result || {};
      const refined = {
        smallMusicalId: data.amateurShowId,
        musicalName: data.name,
        schedule: data.schedule,
        reserveStatus: `${data.soldTicket}/${data.totalTicket}`,
      };
      setSmallTicketInfo(refined);
      setEditForm({ 
        musicalName: refined.musicalName,
        schedule: refined.schedule,
        reserveStatus: refined.reserveStatus
      });
    } catch (err) {
      console.error("소공연 정보 조회 실패:", err);
      alert("해당 소공연을 조회할 수 없습니다.");
      navigate("/adminpage/small-theater/ticket"); 
    }
  };


  // 수정을 위해 입력값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  // 수정하기 -> editMode = true
  const handleEdit = () => {
    setEditMode(true);
  };
  // 수정 적용 -> PATCH
  const handleApply = async () => {
    try {
      // reserveStatus "25/50"  → "25", "50" 분리
      let soldNum = 0;
      let totalNum = 0;
      if (editForm.reserveStatus.includes("/")) {
        const parts = editForm.reserveStatus.split("/");
        if (parts.length === 2) {
          soldNum = parseInt(parts[0], 10) || 0;
          totalNum = parseInt(parts[1], 10) || 0;
        }
      }
      const patchBody = {
        name: editForm.musicalName,
        schedule: editForm.schedule,
        soldTicket: soldNum,
        totalTicket: totalNum
      };
      await axios.patch(
        `${baseURL}/admin/amateur-tickets/${smallMusicalId}/update`,
        patchBody,
        {
          headers: {
            Authorization: `Bearer ${token_admin}`,
          },
        }
      );
      const updated = {
        smallMusicalId: smallTicketInfo.smallMusicalId,
        musicalName: editForm.musicalName,
        schedule: editForm.schedule,
        reserveStatus: editForm.reserveStatus
      };
      setSmallTicketInfo(updated);
      setEditMode(false);
      alert("수정이 완료되었습니다.");

    } catch (err) {
      console.error("소공연 티켓 수정 실패:", err);
      alert("티켓 수정 중 오류가 발생했습니다.");
    }
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
        {/* <MenuLink $active={location.pathname.startsWith("/adminpage/small-theater/refund")}
        to="/adminpage/small-theater/refund">
            환불 내역 관리</MenuLink> */} {/* 데모데이 이후 구현 */}
      </PageMenu>
      <SearchSection>
        <SearchBar_Mock/>
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
      
      <Subtitle>
        <BackButton onClick={() => navigate(-1)}>
          &lt;
        </BackButton>
        &nbsp; {smallTicketInfo.musicalName}
      </Subtitle>

      {!editMode ? (
        // --- 정보표시만 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>소극장 공연 이름</Th>
              <Td>{smallTicketInfo.musicalName}</Td>
            </Tr>
            <Tr>
              <Th>날짜/시간</Th>
              <Td>{smallTicketInfo.schedule}</Td>
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
                  name="musicalName"
                  value={editForm.musicalName}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>날짜/시간</Th>
              <Td>
                <Input
                  name="schedule"
                  value={editForm.schedule}
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

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const InfoTable = styled.table`
  width:  610px;
  margin-top: 26px;
  margin-left: 145px;
  border-collapse: collapse;
`;

const Tr = styled.tr``;

const Th = styled.th`
  width: 146px;
  text-align: center;
  padding: 8px;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  border-right: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: #8F8E94;
`;
const Td = styled.td`
  width: 463px;
  padding: 6px 20px 6px 20px;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
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

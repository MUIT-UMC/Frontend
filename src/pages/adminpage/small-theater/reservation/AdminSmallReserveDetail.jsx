
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'; 

import SearchIconBlack from "../../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../../assets/icons/AdminCheckboxRed.svg";

import SearchBar from '../../components/SearchBar';

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = import.meta.env.VITE_APP_ACCESS_TOKEN_ADMIN;
const checkBoxLabels = ["소극장 공연 이름", "날짜/시간", "상태"];

function mapStatusToKorean(reservationStatus) {
  switch (reservationStatus) {
    case "RESERVE_AWAIT":
      return "예약 중";
    case "RESERVED":
      return "예약 완료";
    case "EXPIRED":
      return "사용 완료";
    case "CANCEL_AWAIT":
      return "취소 중";
    case "CANCELED":
      return "취소 완료";
    default:
      return reservationStatus || ""; 
  }
}
function mapKoreanToStatus(koreanString) {
  switch (koreanString) {
    case "예약 중":
      return "RESERVE_AWAIT";
    case "예약 완료":
      return "RESERVED";
    case "사용 완료":
      return "EXPIRED";
    case "취소 중":
      return "CANCEL_AWAIT";
    case "취소 완료":
      return "CANCELED";
    default:
      return ""; 
  }
}

export default function AdminSmallReserveDetail() {

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


  const { ticketId } = useParams();  // URL 파라미터 (/adminpage/small-theater/reserve/detail/:ticketId)
  const navigate = useNavigate();
  const [smallReserveInfo, setSmallReserveInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  useEffect(() => {
    if (ticketId) {
      fetchReserveDetail(ticketId);
    }
  }, [ticketId]);
  // 소극장 공연 예약 상세조회 API
  const fetchReserveDetail = async (ticketId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/member-tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const detail = res.data.result || {};
      const statusInKorean = mapStatusToKorean(detail.reservationStatus);
      const refined = {
        ticketId: detail.memberTicketId,
        name: detail.memberName,
        title: detail.amateurShowName,
        schedule: detail.schedule,
        place: detail.place,
        num: detail.quantity + "매",
        status: statusInKorean,
      };
      setSmallReserveInfo(refined);
      setEditStatus(statusInKorean);
    } catch (error) {
      console.error("예약 상세 조회 실패:", error);
      alert("해당 예약 내역을 조회할 수 없습니다.");
      navigate("/adminpage/small-theater/reserve");
    }
  };

  // 예약 상태 수정기능
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleApply = async () => {
    try {
      const serverStatus = mapKoreanToStatus(editStatus);
      if (!serverStatus) {
        alert("유효하지 않은 상태입니다.");
        return;
      }
      await axios.patch(
        `${baseURL}/admin/member-tickets/${ticketId}/update?reservationStatus=${serverStatus}`,
        {},
        {
          headers: { Authorization: `Bearer ${token_admin}` },
        }
      );
      setSmallReserveInfo((prev) => ({ ...prev, status: editStatus }));
      setEditMode(false);
      alert("상태가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("예약 상태 수정 실패:", error);
      alert("상태 수정 중 오류가 발생했습니다.");
    }
  };
  if (!smallReserveInfo) return null; // 아직 로딩 or 없는경우

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
          {checkBoxLabels.map((label, idx) => (
            <CheckBoxWrapper key={label}>
              <CheckBox onClick={() => toggleCheck(idx)}>
                <img src={checkboxes[idx] ? CheckBoxIconRed : CheckBoxIcon} alt="CheckBox Icon" />
              </CheckBox>
              <CheckText>{label}</CheckText>
            </CheckBoxWrapper>
          ))}
          <CheckSearchIcon>
            <img src={isAnyChecked ? SearchIconRed : SearchIconBlack} alt="Search Icon" />
          </CheckSearchIcon>
        </CheckBoxes>
      </SearchSection>
      
      {!editMode ? (
        // --- 정보표시만 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>예약자명</Th>
              <Td>{smallReserveInfo.name}</Td>
            </Tr>
            <Tr>
              <Th>소극장 공연 이름</Th>
              <Td>{smallReserveInfo.title}</Td>
            </Tr>
            <Tr>
              <Th>날짜/시간</Th>
              <Td>{smallReserveInfo.schedule}</Td>
            </Tr>
            <Tr>
              <Th>공연 장소</Th>
              <Td>{smallReserveInfo.place}</Td>
            </Tr>
            <Tr>
              <Th>매수</Th>
              <Td>{smallReserveInfo.num}</Td>
            </Tr>
            <Tr>
              <Th>상태</Th>
              <Td style={{ color: 
                (smallReserveInfo.status === "예약 중") || 
                (smallReserveInfo.status === "취소 중") ? COLOR_MUIT_RED : COLOR_GRAY_MAINTEXT }}>
                {smallReserveInfo.status}</Td>
            </Tr>
          </tbody>
        </InfoTable>
      ) : (
        // --- 수정모드 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>예약자명</Th>
              <Td>{smallReserveInfo.name}</Td> 
            </Tr>
            <Tr>
              <Th>소극장 공연 이름</Th>
              <Td>{smallReserveInfo.title}</Td>
            </Tr>
            <Tr>
              <Th>날짜/시간</Th>
              <Td>{smallReserveInfo.schedule}</Td>
            </Tr>
            <Tr>
              <Th>공연 장소</Th>
              <Td>{smallReserveInfo.place}</Td>
            </Tr>
            <Tr>
              <Th>매수</Th>
              <Td>{smallReserveInfo.num}</Td>
            </Tr>
            <Tr>
              <Th>상태</Th>
              <Td>
                <Select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{
                    color:
                      (editStatus === "예약 중") || (editStatus === "취소 중")
                        ? COLOR_MUIT_RED
                        : COLOR_GRAY_MAINTEXT,
                  }}
                >
                  <option value="예약 중">예약 중</option>
                  <option value="예약 완료">예약 완료</option>
                  <option value="사용 완료">사용 완료</option>
                  <option value="취소 중">취소 중</option>
                  <option value="취소 완료">취소 완료</option>
                </Select>
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

const InfoTable = styled.table`
  width:  610px;
  margin-top: 149px;
  margin-left: 145px;
  border-collapse: collapse;
`;

const Tr = styled.tr``;

const Th = styled.th`
  width: 130px;
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
  width: 479px;
  padding: 6px 20px 6px 20px;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const RedButton = styled.button`
  margin-left: 607px;
  margin-top: 120px;
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
  margin-top: 120px;
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

const Select = styled.select`
  width: 120px;
  height: 36px;
  font-family: "Pretendard";
  font-size: 14px;
  border: 1px solid ${COLOR_GRAY_UNSELECTED};
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  padding-left: 8px;
`;
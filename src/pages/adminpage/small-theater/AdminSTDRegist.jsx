
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../assets/icons/AdminCheckboxRed.svg";
import CheckWhite from "../../../assets/icons/CheckWhite.svg";
import CheckRed from "../../../assets/icons/CheckRed.svg";

import SearchBar_Mock from '../components/SearchBar_Mock';

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = localStorage.getItem("adminToken");
const colLabels = ["소극장 공연 이름", "날짜/시간", "등록자명", "상태"];

function mapStatusToKorean(amateurStatus) {
  switch (amateurStatus) {
    case "YET":
      return "확인 전";
    case "APPROVED":
      return "등록";
    case "AGAIN":
      return "반려";
    default:
      return amateurStatus || ""; 
  }
}
function mapKoreanToStatus(koreanString) {
  switch (koreanString) {
    case "확인 전":
      return "YET";
    case "등록":
      return "APPROVED";
    case "반려":
      return "AGAIN";
    default:
      return ""; 
  }
}

export default function AdminSTDRegist() {

  // 1. 체크박스 //////////////////////////////////////////////////////////////////
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
  const toggleCheck = (index) => {
    setCheckboxes((prev) => {
      if (prev[index]) { // 만약 이미 체크되어 있다면 => 전부 해제
        return [false, false, false, false];
      }                 // 아니라면 => 해당 index만 true, 나머지는 false
      const newState = [false, false, false, false];
      newState[index] = true;
      return newState;
    });
  };
  const isAnyChecked = checkboxes.some((checked) => checked === true);

  // 소공연 정보
  const { smallMusicalId } = useParams();
  const navigate = useNavigate();
  // 심사 정보 API
  const [decisionInfo, setDecisionInfo] = useState({
    title: "",
    registerName: "",
    username: "",
    status: "YET",   // 기본값
    rejectReason: ""
  });
  useEffect(() => {
    if (smallMusicalId) {
      fetchDecisionStatus(smallMusicalId);
    }
  }, [smallMusicalId]);
  const fetchDecisionStatus = async (smallMusicalId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/amateur-shows/${smallMusicalId}/decision`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        }
      });
      const data = res.data.result || {};
      setDecisionInfo({
        title: data.amateurShowName,
        registerName: data.memberName,
        username: data.username,
        status: mapStatusToKorean(data.amateurStatus),
        rejectReason: data.rejectReason || ""
      });
    } catch (err) {
      console.error("심사 상태 조회 실패:", err);
      alert("등록/반려 상태를 가져오지 못했습니다.");
      navigate(`/adminpage/small-theater/detail/${smallMusicalId}`);
    }
  };
  // 선택된 심사 상태
  const [selectedStatus, setSelectedStatus] = useState();
  // 심사 상태
  const handleChangeStatus = (newStatus) => {
    setSelectedStatus(newStatus);
    setDecisionInfo((prev) => ({
      ...prev,
      status: newStatus
    }));
  };
  const handleRejectReasonChange = (e) => {
    const { value } = e.target;
    setDecisionInfo((prev) => ({
      ...prev,
      rejectReason: value
    }));
  };
  // 심사 상태 적용
  const handleApply = async () => {
    const serverStatus = mapKoreanToStatus(decisionInfo.status);
    if (!serverStatus) {
      alert("유효하지 않은 상태입니다.");
      return;
    }
    try {
      const patchBody = {
        rejectReason: decisionInfo.rejectReason,
      };
      const url = `${baseURL}/admin/amateur-shows/${smallMusicalId}/decision?amateurStatus=${serverStatus}`;
      await axios.put(url, patchBody, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
          "Content-Type": "application/json"
        }
      });
      alert("심사 결과가 반영되었습니다.");
      navigate(`/adminpage/small-theater`);
    } catch (err) {
      console.error("소공연 등록/반려 실패:", err);
      alert("등록/반려 처리 중 오류 발생");
    }
  };
  
  return (
        <Container>
          <Tilte>소극장 공연 관리</Tilte>
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
            <BackButton onClick={() => navigate(`/adminpage/small-theater/detail/${smallMusicalId}`)}>
              &lt;
            </BackButton>
            &nbsp; {decisionInfo.title}
          </Subtitle>
    
          <InfoTable>
            <tbody>
              <Tr>
                <Th>등록자명</Th>
                <Td>{decisionInfo.registerName}</Td>
              </Tr>
              <Tr>
                <Th>아이디</Th>
                <Td>{decisionInfo.username}</Td>
              </Tr>
              <Tr>
                <Th>심사결과</Th>
                <Td>
                  {/* “확인” / “반려” 버튼 */}
                  <CheckOptions>
                    <CheckBoxWrapper>
                      <CheckBox onClick={() => handleChangeStatus("등록")}                      >
                        <img src={selectedStatus === "등록" ? CheckRed : CheckWhite} alt="Check"/>
                      </CheckBox>
                      <CheckText>확인</CheckText>
                    </CheckBoxWrapper>
                    <CheckBoxWrapper>
                      <CheckBox onClick={() => handleChangeStatus("반려")}>
                        <img src={selectedStatus === "반려" ? CheckRed : CheckWhite} alt="Check"/>
                      </CheckBox>
                      <CheckText>반려</CheckText>
                    </CheckBoxWrapper>
                  </CheckOptions>
                </Td>
              </Tr>
              {/* 반려인 경우 */}
              {selectedStatus === "반려" && (
                <Tr>
                  <Th>반려 사유</Th>
                  <Td>
                    <textarea
                      value={decisionInfo.rejectReason}
                      onChange={handleRejectReasonChange}
                      placeholder="반려 사유를 입력하세요."
                      style={{ width: "420px", height: "250px", padding: "8px" }}
                    />
                  </Td>
                </Tr>
              )}
            </tbody>
          </InfoTable>

          <ApplyButton onClick={handleApply}>적용하기</ApplyButton>
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

const SearchSection = styled.div`
  margin-top:  15px;
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
  margin-top: 96px;
  margin-left: 165px;
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
  margin-left: 154px;
  border-collapse: collapse;
`;

const Tr = styled.tr``;

const Th = styled.th`
  width: 94px;
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
  padding: 6px 20px 6px 20px;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const CheckOptions = styled.div`
  display:  flex;
  gap:  18px;
  justify-content: flex-start;
  align-items:  center;
`;

const ApplyButton = styled.button`
  width: 156px;
  height: 38px;
  margin-top: 55px;
  margin-left: 611px;

  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background-color: #555;
  border: 1px solid #555;
  border-radius: 8px;
  cursor: pointer;
`;
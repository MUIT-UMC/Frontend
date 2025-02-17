
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../assets/icons/AdminCheckboxRed.svg";

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

export default function AdminSmallTheaterDetail() {

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


  const { smallMusicalId } = useParams();
  const navigate = useNavigate();
  const [smallTheaterInfo, setSmallTheaterInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    schedule: "",
    hashtag: "",
    content: "",
    account: "",
    contact: "",
    status: "",
  });
  useEffect(() => {
    if (smallMusicalId) {
      fetchSmallTheaterDetail(smallMusicalId);
    }
  }, [smallMusicalId]);
  // 소극장 공연 상세조회 API
  const fetchSmallTheaterDetail = async (smallMusicalId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/amateur-shows/${smallMusicalId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const data = res.data.result || {};
      const statusInKorean = mapStatusToKorean(data.amateurStatus);
      const refined = {
        smallMusicalId: data.amateurShowId,
        title: data.amateurShowName,
        registerName: data.memberName,
        username: data.username,
        schedule: data.schedule,
        hashtag: data.hashtag,
        content: data.content,
        account: data.account,
        contact: data.contact,
        status: statusInKorean
      };
      setSmallTheaterInfo(refined);
      setEditForm({
        schedule: refined.schedule,
        hashtag: refined.hashtag,
        content: refined.content,
        account: refined.account,
        contact: refined.contact,
        status: refined.status
      });
    } catch (err) {
      console.error("소공연 정보 조회 실패:", err);
      alert("해당 소공연을 조회할 수 없습니다.");
      navigate("/adminpage/small-theater"); 
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
  // 수정 적용
  const handleApply = async () => {
    try {
      const serverStatus = mapKoreanToStatus(editForm.status);
      if (!serverStatus) {
        alert("유효하지 않은 상태입니다.");
        return;
      }
      const patchBody = {
        schedule: editForm.schedule,
        hashtag: editForm.hashtag,
        content: editForm.content,
        account: editForm.account,
        contact: editForm.contact,
        amateurStatus: serverStatus,
      };
      await axios.patch(`${baseURL}/admin/amateur-shows/${smallMusicalId}/update`, patchBody, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      setSmallTheaterInfo((prevInfo) => ({
        ...prevInfo,
        schedule: editForm.schedule,
        hashtag: editForm.hashtag,
        content: editForm.content,
        account: editForm.account,
        contact: editForm.contact,
        status: editForm.status,
      }));
      setEditMode(false);
      alert("수정 완료");
    } catch (err) {
      console.error("소공연 상세정보 수정 실패:", err);
      alert("수정 실패!");
    }
  };
  // 아직 로딩 or 없는경우
  if (!smallTheaterInfo) return null;

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
          <BackButton onClick={() => navigate(-1)}>
            &lt;
          </BackButton>
          &nbsp; {smallTheaterInfo.title}
        </Subtitle>
  
        {!editMode ? (
          // --- 정보표시만 ---
          <InfoTable>
            <tbody>
              <Tr>
                <Th>등록자명</Th>
                <Td>{smallTheaterInfo.registerName}</Td>
              </Tr>
              <Tr>
                <Th>아이디</Th>
                <Td>{smallTheaterInfo.username}</Td>
              </Tr>
              <Tr>
                <Th>날짜</Th>
                <Td>{smallTheaterInfo.schedule}</Td>
              </Tr>
              <Tr>
                <Th>해시태그</Th>
                <Td>{smallTheaterInfo.hashtag}</Td>
              </Tr>
              <Tr>
                <Th>줄거리</Th>
                <Td>
                  <ContentBox>{smallTheaterInfo.content}</ContentBox>
                </Td>
              </Tr>
              <Tr>
                <Th>계좌번호</Th>
                <Td>{smallTheaterInfo.account}</Td>
              </Tr>
              <Tr>
                <Th>연락처</Th>
                <Td>{smallTheaterInfo.contact}</Td>
              </Tr>
              <Tr>
                <Th>상태</Th>
                <Td style={{ color: smallTheaterInfo.status === "확인 전" ? COLOR_MUIT_RED : COLOR_GRAY_MAINTEXT }}>
                  {smallTheaterInfo.status}</Td>
              </Tr>
            </tbody>
          </InfoTable>
        ) : (
          // --- 수정모드 ---
          <InfoTable>
            <tbody>
              <Tr>
                <Th>등록자명</Th>
                <Td>{smallTheaterInfo.registerName}</Td>
              </Tr>
              <Tr>
                <Th>아이디</Th>
                <Td>{smallTheaterInfo.username}</Td>
              </Tr>
              <Tr>
                <Th>날짜</Th>
                <Td>
                  <Input
                    name="schedule"
                    value={editForm.schedule}
                    onChange={handleChange}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th>해시태그</Th>
                <Td>
                  <Input
                    name="hashtag"
                    value={editForm.hashtag}
                    onChange={handleChange}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th>줄거리</Th>
                <Td>
                  <textarea
                    name="content"
                    value={editForm.content}
                    onChange={handleChange}
                    style={{ width: '420px', height: '128px', padding: '10px' }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th>계좌번호</Th>
                <Td>
                  <Input
                    name="account"
                    value={editForm.account}
                    onChange={handleChange}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th>연락처</Th>
                <Td>
                  <Input
                    name="contact"
                    value={editForm.contact}
                    onChange={handleChange}
                  />
                </Td>
              </Tr>
              <Tr>
                <Th>상태</Th>
                <Td>
                <Select
                  name="status"
                  value={editForm.status}
                  onChange={handleChange}
                  style={{ color: editForm.status === "확인 전" ? COLOR_MUIT_RED : COLOR_GRAY_MAINTEXT }}
                >
                  <option value="확인 전" style={{color: COLOR_MUIT_RED}}>확인 전</option>
                  <option value="등록" style={{color: COLOR_GRAY_MAINTEXT}}>등록</option>
                  <option value="반려" style={{color: COLOR_GRAY_MAINTEXT}}>반려</option>
                </Select>
              </Td>
              </Tr>
            </tbody>
          </InfoTable>
        )}
        {/* 하단 버튼 */}
        {!editMode ? (
          <Buttons>
            <RedButton onClick={handleEdit}>수정하기</RedButton>
            <WhiteButton to={`/adminpage/small-theater/detail/${smallMusicalId}/regist`}>최종 등록/반려하기</WhiteButton>
          </Buttons>
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
  margin-top: 81px;
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
  width:  515px;
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
  height: 24px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 55px;
  margin-left: 435px;
`

const RedButton = styled.button`
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

const WhiteButton = styled(Link)`
  width: 156px;
  height: 38px;
  text-decoration: none;
  text-align: center;
  padding: 6px;

  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_MUIT_RED};
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 8px;
  background-color: ${COLOR_WHITE};
`;

const GrayButton = styled.button`
  margin-top: 55px;
  margin-left: 611px;
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

const ContentBox = styled.div`
  max-height: 128px;
  width: 420px;
  overflow-y: auto;
  line-height: 1.5;
  white-space: pre-wrap;
  padding-right: 60px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
  background-color: ${COLOR_WHITE};
  border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
  }
`;
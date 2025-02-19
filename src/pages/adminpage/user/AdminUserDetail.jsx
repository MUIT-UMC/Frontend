
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
const colLabels = ["아이디", "이름", "E-mail", "번호", "성별"];

export default function AdminUserDetail() {

  // 1. 체크박스 //////////////////////////////////////////////////////////////////
  const [checkboxes, setCheckboxes] = useState([false, false, false, false, false]);
  const toggleCheck = (index) => {
    setCheckboxes((prev) => {
      if (prev[index]) { // 만약 이미 체크되어 있다면 => 전부 해제
        return [false, false, false, false, false];
      }                 // 아니라면 => 해당 index만 true, 나머지는 false
      const newState = [false, false, false, false, false];
      newState[index] = true;
      return newState;
    });
  };
  const isAnyChecked = checkboxes.some((checked) => checked === true);


  const { userId } = useParams();  // URL 파라미터 (/adminpage/user/detail/:userId)
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
    //birthDate: "", // 생년월일 삭제
    gender: "",
    address: "",
  });
  useEffect(() => {
    if (userId) {
      fetchUserDetail(userId);
    }
  }, [userId]);

  // 사용자 상세 조회 API
  const fetchUserDetail = async (userId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/members/${userId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const data = res.data.result || {};
      const refined = {
        userId: data.memberId,
        username: data.username,
        name: data.name,
        phone: data.phone,
        email: data.email,
        //birthDate: data.birthDate || "",    //삭제
        gender: data.gender === "MALE" ? "남" : "여",
        address: data.address || "",
      };
      setUserInfo(refined);
      setEditForm({ ...refined });
    } catch (err) {
      console.error("사용자 정보 조회 실패:", err);
      alert("해당 사용자를 조회할 수 없습니다.");
      navigate("/adminpage/user"); 
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
  // 수정 적용 -> PATCH /admin/members/{userId}/update
  const handleApply = async () => {
    try {
      const gValue = editForm.gender === "남" ? "MALE" : "FEMALE";
      const patchBody = {
        username: editForm.username,
        name: editForm.name,
        phone: editForm.phone,
        email: editForm.email,
        //birthDate: editForm.birthDate,  //삭제
        gender: gValue,
        address: editForm.address,
      };
      await axios.patch(`${baseURL}/admin/members/${userId}/update`, patchBody, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      // 성공 시 userInfo 업데이트, editMode 해제
      setUserInfo({ ...editForm });
      setEditMode(false);
      alert("수정 완료");
    } catch (err) {
      console.error("사용자 수정 실패:", err);
      alert("수정 실패!");
    }
  };
  // 아직 로딩 or 없는경우
  if (!userInfo) return null;

  return (
    <Container>
      <Tilte>사용자 관리</Tilte>
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
        &nbsp; 기본 정보
      </Subtitle>

      {!editMode ? (
        // --- 정보표시만 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>아이디</Th>
              <Td>{userInfo.username}</Td>
            </Tr>
            <Tr>
              <Th>이름</Th>
              <Td>{userInfo.name}</Td>
            </Tr>
            <Tr>
              <Th>번호</Th>
              <Td>{userInfo.phone}</Td>
            </Tr>
            <Tr>
              <Th>E-mail</Th>
              <Td>{userInfo.email}</Td>
            </Tr>
            {/* <Tr>
              <Th>생년월일</Th>
              <Td>{userInfo.birthDate}</Td>
            </Tr> */}
            <Tr>
              <Th>성별</Th>
              <Td>{userInfo.gender}</Td>
            </Tr>
            <Tr>
              <Th>주소</Th>
              <Td>{userInfo.address}</Td>
            </Tr>
          </tbody>
        </InfoTable>
      ) : (
        // --- 수정모드 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>아이디</Th>
              <Td>
                <Input
                  name="username"
                  value={editForm.username}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>이름</Th>
              <Td>
                <Input
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>번호</Th>
              <Td>
                <Input
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>E-mail</Th>
              <Td>
                <Input
                  name="email"
                  value={editForm.email}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            {/* <Tr>
              <Th>생년월일</Th>
              <Td>
                <Input
                  name="birthDate"
                  value={editForm.birthDate}
                  onChange={handleChange}
                />
              </Td>
            </Tr> */}
            <Tr>
              <Th>성별</Th>
              <Td>
                <Input
                  name="gender"
                  value={editForm.gender}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>주소</Th>
              <Td>
                <Input
                  name="address"
                  value={editForm.address}
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
  margin-top: 118px;
  margin-left: 154px;
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
`;

const RedButton = styled.button`
  margin-left: 607px;
  margin-top: 60px;
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
  margin-top: 60px;
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

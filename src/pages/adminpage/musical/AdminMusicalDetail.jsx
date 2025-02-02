
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../assets/icons/AdminCheckboxRed.svg";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

import SearchBar from '../components/SearchBar';
import {musicalData, colKeys, colLabels} from "./AdminMusical";

export default function AdminMusicalDetail() {

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


  const { musicalName } = useParams();  // URL 파라미터 (/adminpage/musical/detail/:musicalName)
  const navigate = useNavigate();
  const [musicalInfo, setMusicalInfo] = useState(null);

  useEffect(() => {
    // userData 중 해당 userId를 가진 객체 찾기
    const found = musicalData.find((item) => item.musical === musicalName);
    if (found) {
      setMusicalInfo(found);
    } else {
      // 해당 user를 찾지 못한 경우 → 목록으로 리다이렉트 or 에러 처리
      alert("해당 사용자를 찾지 못했습니다.");
      navigate("/adminpage/musical");
    }
  }, [musicalName, navigate]);

  // 2) 수정 관련 상태 ////////////////////////////////////////////
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    musical: "",
    date_time: "",
    price: ""
  });
  useEffect(() => {
    if (musicalInfo) {
      setEditForm({
        musical: musicalInfo.musical,
        date_time: musicalInfo.date_time,
        price: musicalInfo.price,
      });
    }
  }, [musicalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // 2) 수정 모드 ////////////////////////////////////////////
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleApply = () => {
    // 여기서는 musicalData 배열을 직접 수정하는 대신 임시로 console.log
    console.log("수정 완료:", editForm);

    // API적용시 서버에 PATCH 요청 등으로 저장 후:
    // fetch(`/api/users/${userId}`, { method:"PATCH", body: JSON.stringify(editForm) })
    //   .then(...)
    //   .catch(...)

    // 수정 적용 후 editMode 해제, musicalInfo 업데이트
    setMusicalInfo(editForm);
    setEditMode(false);
  };
  if (!musicalInfo) return null; // 아직 로딩 or 없는경우

  return (
    <Container>
      <Tilte>뮤지컬 관리</Tilte>
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
      

      {!editMode ? (
        // --- 정보표시만 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>뮤지컬</Th>
              <Td>{musicalInfo.musical}</Td>
            </Tr>
            <Tr>
              <Th>날짜/시간</Th>
              <Td>{musicalInfo.date_time}</Td>
            </Tr>
            <Tr>
              <Th>가격</Th>
              <Td>{musicalInfo.price}</Td>
            </Tr>
            {/* 추후 추가 필드... */}
          </tbody>
        </InfoTable>
      ) : (
        // --- 수정모드 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>뮤지컬</Th>
              <Td>
                <Input
                  name="musical"
                  value={editForm.musical}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>날짜/시간</Th>
              <Td>
                <Input
                  name="date_time"
                  value={editForm.date_time}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>가격</Th>
              <Td>
                <Input
                  name="price"
                  value={editForm.price}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            {/* 추후 추가 필드... */}
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

const InfoTable = styled.table`
  width:  609px;
  margin-top: 149px;
  margin-left: 154px;
  border-collapse: collapse;
`;

const Tr = styled.tr``;

const Th = styled.th`
  width: 100px;
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

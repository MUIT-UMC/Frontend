
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
const colLabels = ["뮤지컬", "기간", "가격"];

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


  const { musicalId } = useParams();  // URL 파라미터 (/adminpage/musical/detail/:musicalId)
  const navigate = useNavigate();
  const [musicalInfo, setMusicalInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    musicalName: "",
    duration: "",
    place: "",
    price: "",
    castInfo: "",
    timeInfo: "",
    moreInfo: "",
    eventList: ""
  });
  useEffect(() => {
    if (musicalId) {
      fetchMusicalDetail(musicalId);
    }
  }, [musicalId]);

  // 뮤지컬 상세조회 API
  const fetchMusicalDetail = async (userId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/musicals/${musicalId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const data = res.data.result || {};
      const refined = {
        musicalId: data.Id,
        musicalName: data.name,
        duration: `${data.perFrom} ~ ${data.perTo}`,
        place: data.place,
        price: data.priceInfo,
        castInfo: data.actorPreview,
        timeInfo: data.perPattern,
        moreInfo: `상영시간 : ${data.runtime} / 연령제한 : ${data.ageLimit}`,
        eventList: data.eventList?.eventResultListDTO
        ? data.eventList.eventResultListDTO
            .map(ev => `${ev.name} - ${ev.duration}`)
            .join("\n")
        : ""
      };
      setMusicalInfo(refined);
      setEditForm({ ...refined });
    } catch (err) {
      console.error("뮤지컬 정보 조회 실패:", err);
      alert("해당 뮤지컬를 조회할 수 없습니다.");
      navigate("/adminpage/musical"); 
    }
  };

  // 수정
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleApply = () => {
    // 뮤지컬 수정 PATCH API없음 -> 임시로 console.log
    console.log("수정 완료:", editForm);
    setMusicalInfo(editForm);
    setEditMode(false);
  };
  if (!musicalInfo) return null; // 아직 로딩 or 없는경우

  return (
    <Container>
      <Tilte>뮤지컬 관리</Tilte>
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
      

      {!editMode ? (
        // --- 정보표시만 ---
        <InfoTable>
          <tbody>
            <Tr>
              <Th>뮤지컬</Th>
              <Td>{musicalInfo.musicalName}</Td>
            </Tr>
            <Tr>
              <Th>기간</Th>
              <Td>{musicalInfo.duration}</Td>
            </Tr>
            <Tr>
              <Th>장소</Th>
              <Td>{musicalInfo.place}</Td>
            </Tr>
            <Tr>
              <Th>가격</Th>
              <Td>{musicalInfo.price}</Td>
            </Tr>
            <Tr>
              <Th>캐스팅</Th>
              <Td>{musicalInfo.castInfo}</Td>
            </Tr>
            <Tr>
              <Th>공연정보</Th>
              <Td>{musicalInfo.timeInfo}</Td>
            </Tr>
            <Tr>
              <Th>기타정보</Th>
              <Td>{musicalInfo.moreInfo}</Td>
            </Tr>
            <Tr>
              <Th>이벤트</Th>
              <Td style={{ whiteSpace: "pre-line" }}>{musicalInfo.eventList}</Td>
            </Tr>
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
                  name="musicalName"
                  value={editForm.musicalName}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>기간</Th>
              <Td>
                <Input
                  name="duration"
                  value={editForm.duration}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>장소</Th>
              <Td>
                <Input
                  name="place"
                  value={editForm.place}
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
            <Tr>
              <Th>캐스팅</Th>
              <Td>
                <Input
                  name="castInfo"
                  value={editForm.castInfo}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>공연정보</Th>
              <Td>
                <Input
                  name="timeInfo"
                  value={editForm.timeInfo}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>기타정보</Th>
              <Td>
                <Input
                  name="moreInfo"
                  value={editForm.moreInfo}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>이벤트</Th>
              <Td>
                <Input
                  name="eventList"
                  value={editForm.eventList}
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

const InfoTable = styled.table`
  width:  610px;
  margin-top: 149px;
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


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import PlusButton from "../../../assets/icons/AddButton.svg";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = localStorage.getItem("adminToken");

export default function AdminVisionUpdate() {

  const { placeId } = useParams();
  const [sectionData, setSectionData] = useState([]);
  const [theaterName, setTheaterName] = useState("");
  useEffect(() => {
    if (placeId) {
      fetchSections(placeId);
    }
  }, [placeId]);
  const fetchSections = async (placeId) => {
    try {
      const response = await axios.get(`${baseURL}/admin/views/${placeId}/edit`, {
          headers: { Authorization: `Bearer ${token_admin}` },
        }
      );
      const sections = response.data.result.theatreSections || [];
      const name = response.data.result.theatreName;
      setSectionData(sections);
      setTheaterName(name);
    } catch (err) {
      console.error("섹션 정보 조회 실패:", err);
      alert("섹션 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };
  console.log(theaterName + 1);

  return (
    <Container>
      <Tilte>시야 관리</Tilte>

      <SubTitleLine>
        <SubTitle>시야 등록</SubTitle>
        <ApplyButton>등록하기</ApplyButton>
        <hr/>
      </SubTitleLine>

      <Place>
        <PlaceTitle>장소</PlaceTitle>
        <PlaceText>{theaterName}</PlaceText>
        <hr/>
      </Place>

      <TableContainer>
        <TabHeader>
          <HeaderCol1>공연장 전체 사진</HeaderCol1>
          <HeaderCol2>검색 페이지 검색 결과로 사용됩니다.</HeaderCol2>
          <HeaderCol3>
            <UpdateButton>수정</UpdateButton>
          </HeaderCol3>
        </TabHeader>

        <ScrollWrapper>
          <StyledTable>
            <thead>
              <tr style={{height: "45px"}}>
                <th style={{width: "80px", borderLeft: "none"}}>칸</th>
                <th style={{width: "75px"}}>층</th>
                <th style={{width: "250px"}}>좌석</th>
                <th>특징</th>
                <th style={{width: "70px", borderRight: "none"}}>사진</th>
              </tr>
            </thead>
            <tbody>
              {sectionData.map((section, idx) => (
                <tr key={idx} style={{height: "45px"}}>
                  <td style={{borderLeft: "none"}}>{section.sectionType}</td>
                  <td>{section.floor}</td>
                  <td>{section.seatRange}</td>
                  <td >{section.viewDetail}</td>
                  <td style={{borderRight: "none"}}>
                    {section.isViewPic ? (
                      <UpdateButton>수정</UpdateButton>
                    ) : (
                      <UploadButton>미등록</UploadButton>
                    )}
                  </td>
                </tr>
              ))}
              {/* 마지막 행 */}
              <tr>
                <td colSpan="5" style={{ textAlign: "center", 
                  borderLeft: "none", borderRight: "none" }}>
                  <AddButton>
                    <img src={PlusButton} alt="Plus" />
                  </AddButton>
                </td>
              </tr>
            </tbody>
          </StyledTable>
        </ScrollWrapper>
      </TableContainer>
      
    </Container>
  ); 
}


/* ---------------- styled components ---------------- */


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

const SubTitleLine = styled.div`
  margin-top: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  hr {
    position: absolute;
    top: 48px;
    left: 2px;
    border: none;
    border-top: 1px solid #E6E6E6;
    width: 99%;
  }
`;

const SubTitle = styled.div`
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const ApplyButton = styled.button`
  width: 72px;
  height: 28px;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 2px;
  background-color: ${COLOR_MUIT_RED};
  cursor: pointer;
`;

const Place = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  position: relative;

  hr {
    position: absolute;
    top: 24px;
    left: 100px;
    border: none;
    border-top: 1px solid #E6E6E6;
    width: 607px;
  }
`;

const PlaceTitle = styled.div`
  width: 80px;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
  
`;

const PlaceText = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

////// Table ///////

const TableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  font-family: "Pretendard";
`;

const TabHeader = styled.div`
  margin-top: 28px;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  height: 45px;
`;

const HeaderCol1 = styled.div`
  color: #8F8E94;
  box-sizing: border-box;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  padding-top: 11px;
  padding-left: 16px;
  width: 140px;
`;

const HeaderCol2 = styled.div`
  color: #424242;
  box-sizing: border-box;
  border: 1px solid #8F8E94;
  padding-top: 11px;
  padding-left: 20px;
  width: 744px;
`;

const HeaderCol3 = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #8F8E94;
  border-bottom: 1px solid #8F8E94;
  padding-top: 11px;
  padding-left: 20px;
  width: 69px;
`;

const UpdateButton = styled.button`
  background-color: #D9D9D9;
  border: 1px solid #D9D9D9;
  cursor: pointer;
  width: 40px;
  height: 20px;
  font-size: 10px;
  font-weight: 500;
  color: #555555;

  &:hover {
  border-color: #A00000;
  color: #A00000;
}
`;

const ScrollWrapper = styled.div`
  margin-top: 24px;
  max-height: 400px;
  overflow-y: auto;   // 스크롤
  width: 958px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background-color: ${COLOR_WHITE};
    border-left: 1px solid #FFFFFF;
    border-right: 1px solid #FFFFFF;
  }
  th,
  td {
    border: 1px solid #8F8E94;
    padding: 8px;
    text-align: center;
    font-size: 16px;
    color: #424242;
  }
`;

const UploadButton = styled.button`
  background-color: ${COLOR_MUIT_RED};
  border: 1px solid ${COLOR_MUIT_RED};
  cursor: pointer;
  width: 40px;
  height: 20px;
  font-size: 10px;
  font-weight: 500;
  color: ${COLOR_WHITE};

  &:hover {
  border-color: ${COLOR_WHITE};
  color: ${COLOR_MUIT_RED};
}
`;

const AddButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import DoubleLeftIcon from "../../../assets/icons/DoubleLeft.svg";
import SingleLeftIcon from "../../../assets/icons/SingleLeft.svg";
import SingleRightIcon from "../../../assets/icons/SingleRight.svg";
import DoubleRightIcon from "../../../assets/icons/DoubleRight.svg";

import SearchBar from "../components/SearchBar";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

// // 시야 Mock data
// const visionData = [
//   {place: "에미레이츠 스타디움움"},
//   {place: "올드 트래포트"},
//   {place: "스탬포드 브릿지"},
//   {place: "안필드"},
//   {place: "에티하드 스타디움"},
//   {place: "세인트 제임스 파크"},
//   {place: "셀허스트 파크"},
// ]

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = localStorage.getItem("adminToken");

export default function AdminVision() {

  // 문의 데이터 API
  const [visionData, setvisionData] = useState([]);
  useEffect(() => {
    fetchVisions();
  }, []);
  const fetchVisions = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/views`, {
        headers: {
          Authorization: `Bearer ${token_admin}`
        }
      });
      const contentArr = response.data.result.content || [];
      const refined = contentArr.map(item => ({
        placeId: item.id,
        place: item.name,
        musicalName: item.musicalName
      }));
      setvisionData(refined);
    } catch (err) {
      console.error("시야데이터 조회 실패:", err);
      alert("시야데이터 목록을 불러오는 중 오류가 발생했습니다.");
      setvisionData([]); 
    }
  };

  // 1. SearchBar 검색 기능 ////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (inputValue) => {
    // 검색버튼 누르면 SearchBar에서 넘어온 값
    setSearchTerm(inputValue);
    setCurrentPage(1); // 검색 시 1페이지로
  };

  // 2. 검색 로직 ///////////////////////////////////////////////////////
  const filteredData = visionData.filter((item) => {
    if (!searchTerm) return true;
    return item.place.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // 3. 페이지네이션 기능 ////////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // 5페이지 단위로 그룹핑
  const groupIndex = Math.floor((currentPage - 1) / 5);
  const groupStart = groupIndex * 5 + 1;
  const groupEnd = Math.min(groupStart + 4, totalPages);
  // 현재그룹에서 표시할 페이지 번호들
  const displayedPages = [];
  for (let p = groupStart; p <= groupEnd; p++) {
    displayedPages.push(p);
  }
  // 현재 페이지에서 보여줄 데이터
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = filteredData.slice(startIdx, endIdx);
  // 페이지 이동 함수
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  // “<<” 버튼: 이전 그룹의 마지막 페이지로 이동
  const handleDoubleLeft = () => {
    if (groupIndex > 0) {
      const prevGroupLast = (groupIndex - 1) * 5 + 5;
      goToPage(prevGroupLast);
    }
  };
  // “>>” 버튼: 다음 그룹의 첫 페이지로 이동
  const handleDoubleRight = () => {
    if (groupEnd < totalPages) {
      goToPage(groupEnd + 1);
    }
  };

  return (
    <Container>
      <Tilte>시야 관리</Tilte>
      <SearchSection>
        <SearchBar onSearch={handleSearch}/>
      </SearchSection>

      <AddMusical>
        <AddButton>추가하기</AddButton>
      </AddMusical>

      {/* 테이블 */}
      <Data>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>장소</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.place}</td>
                  <td>
                    {/* 상세 페이지 버튼 */}
                    <DetailButton to={`/adminpage/vision/detail/${item.placeId}`}>상세</DetailButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </Data>

      <Pagination>
        <PageArrow
          disabled={groupIndex === 0}
          onClick={handleDoubleLeft}
        >
          <img src={DoubleLeftIcon} alt="Double Left" />
        </PageArrow>
        <PageArrow
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <img src={SingleLeftIcon} alt="Single Left" />
        </PageArrow>

        {displayedPages.map((page) => (
          <PageNumber
            key={page}
            $active={page === currentPage}
            onClick={() => goToPage(page)}
          >
            {page}
          </PageNumber>
        ))}

        <PageArrow
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <img src={SingleRightIcon} alt="Single Right" />
        </PageArrow>
        <PageArrow
          disabled={groupEnd >= totalPages}
          onClick={handleDoubleRight}
        >
          <img src={DoubleRightIcon} alt="Double Right" />
        </PageArrow>
      </Pagination>
    </Container>
  );  
}


/* --------- Styled Components --------- */

const Container = styled.div`
  position: relative;
  width:  1150px;
  height: 916px;
  background-color: #fff;
  padding-left: 71px;
  padding-right:  131px;
  box-sizing: border-box;

  display:  flex;
  flex-direction: column;
  justify-content:  flex-start;
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
  justify-content:  flex-start;
  align-items:  center;
`;

const Data = styled.div`
  margin-top: 18px;
  width:  100%;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: 691px; 
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;  /* 겹치지 않게 */

  th, td {
    line-height: 30px;
    border: 1px solid ${COLOR_GRAY_MAINTEXT};
    text-align: center;
    font-size: 14px;
    font-family: "Pretendard";
    font-weight: 500;
  }
  th {
    background-color: #eee;
    font-weight: 500;
  }
`;

const DetailButton = styled(Link)`
  text-decoration: none;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color:  #555555;
  border: 1px solid #D9D9D9;
  background-color: #D9D9D9;
  cursor: pointer;

  &:hover {
    border-color: ${COLOR_MUIT_RED};
    color: ${COLOR_MUIT_RED};
  }
`;

const Pagination = styled.div`
  width:  948px;;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const PageArrow = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  img {
    width: 100%;
    height: auto;
  }
`;

const PageNumber = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  font-size: ${({ $active }) => ($active ? "16px" : "14px")};
  font-weight: 500;
  color: ${({ $active }) => ($active ? COLOR_GRAY_MAINTEXT : COLOR_GRAY_SUB)};

  &:hover {
    color: ${COLOR_GRAY_MAINTEXT};
  }
`;

const AddMusical = styled.div`
  margin-top:  -16px;
  display:  flex;
  justify-content:  flex-end;
  align-items:  center;
`;

const AddButton = styled.button`
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_WHITE};
  cursor: pointer;
  box-sizing:  border-box;
  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 3px;
  background-color: ${COLOR_MUIT_RED};
  padding:  5px 14px 5px 14px;
`
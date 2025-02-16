import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../assets/icons/AdminCheckboxRed.svg";
import DoubleLeftIcon from "../../../assets/icons/DoubleLeft.svg";
import SingleLeftIcon from "../../../assets/icons/SingleLeft.svg";
import SingleRightIcon from "../../../assets/icons/SingleRight.svg";
import DoubleRightIcon from "../../../assets/icons/DoubleRight.svg";

import SearchBar from "../components/SearchBar";

// 색상 상수
const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

// 소극장 공연 관리 Mock 데이터
export const smallTheaterData = [
  { title: "아스날", dateTime: "1899-01-09 / 14:50", registrant: "사카", status: "확인 전" },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "확인 전" },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "확인 전" },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "등록" },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "등록" },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "등록" },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "등록" },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
  { title: "실종", dateTime: "2025-01-09 / 14:50", registrant: "홍길동", status: "반려", },
];

export const colKeys = ["title", "dateTime", "registrant", "status"];
export const colLabels = ["소극장 공연 이름", "날짜/시간", "등록자명", "상태"];

export default function AdminSmallTheater() {
  // 1) 체크박스 상태: 4개 열 (title, dateTime, registrant, status)
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
  
  // 하나만 체크하도록 (사용자 관리 페이지 방식과 동일) 
  // 혹은 여러 개 체크 가능하도록 원하는 로직으로 변경 가능
  const toggleCheck = (index) => {
    setCheckboxes((prev) => {
      if (prev[index]) {
        // 이미 체크된 항목을 다시 클릭 => 전체 해제
        return [false, false, false, false];
      } else {
        // 해당 index만 true
        const newState = [false, false, false, false];
        newState[index] = true;
        return newState;
      }
    });
  };
  const isAnyChecked = checkboxes.some((checked) => checked);

  // 2) 검색 상태
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (inputValue) => {
    setSearchTerm(inputValue);
    setCurrentPage(1);
  };


  // 3) 테이블에 표시할 열 결정
  let displayedColIndexes = [];
  const checkedIndex = checkboxes.findIndex((val) => val === true);
  if (checkedIndex === -1) {
    // 전부 false => 전체 컬럼 표시
    displayedColIndexes = [0, 1, 2, 3];
  } else {
    // 단일 체크 => 해당 열만
    displayedColIndexes = [checkedIndex];
  }

  // 4) 검색 로직
  let searchKey = "title"; // 디폴트
  if (checkedIndex !== -1) {
    searchKey = colKeys[checkedIndex];
  }
  const filteredData = smallTheaterData.filter((smalltheater) => {
    if (!searchTerm) return true; // 검색어 없으면 전체
    const fieldValue = (smalltheater[searchKey] ?? "").toString().toLowerCase();
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  // 5) 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;   // 한 페이지당 20개씩
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 그룹당 5페이지
  const groupIndex = Math.floor((currentPage - 1) / 5);
  const groupStart = groupIndex * 5 + 1;
  const groupEnd = Math.min(groupStart + 4, totalPages);

  const displayedPages = [];
  for (let p = groupStart; p <= groupEnd; p++) {
    displayedPages.push(p);
  }

  // 현재 페이지에 보여줄 데이터
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = filteredData.slice(startIdx, endIdx);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  const handleDoubleLeft = () => {
    if (groupIndex > 0) {
      const prevGroupLast = (groupIndex - 1) * 5 + 5;
      goToPage(prevGroupLast);
    }
  };
  const handleDoubleRight = () => {
    if (groupEnd < totalPages) {
      goToPage(groupEnd + 1);
    }
  };

  return (
    <Container>
      <Title>소극장 공연 관리</Title>
      
      <SearchSection>
        <SearchBar onSearch={handleSearch} />

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
          <CheckSearchIcon>
            <img
              src={isAnyChecked ? SearchIconRed : SearchIconBlack}
              alt="Search Icon"
            />
          </CheckSearchIcon>
        </CheckBoxes>
      </SearchSection>

      {/* 테이블 영역 */}
      <TableSection>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                {displayedColIndexes.map((i) => (
                  <th key={colKeys[i]}>{colLabels[i]}</th>
                ))}
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((smalltheater, idx) => (
                <tr key={idx}>
                  {displayedColIndexes.map((i) => {
                    // 상태 열인 경우 & "확인 전" 시 빨강
                    if (colKeys[i] === "status") {
                      return (
                        <td
                          key={colKeys[i]}
                          style={{ color: smalltheater.status === "확인 전" ? COLOR_MUIT_RED : COLOR_GRAY_MAINTEXT }}>
                          {smalltheater[colKeys[i]]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={colKeys[i]}>{smalltheater[colKeys[i]]}</td>
                      );
                    }
                  })}
                  <td>
                    {/* 상세 페이지 */}
                    <DetailButton to={`/adminpage/small-theater/detail/${smalltheater.title}`}>
                      상세
                    </DetailButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </TableSection>

      {/* 페이지네이션 */}
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

/* ───────── Styled Components ───────── */

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

const Title = styled.div`
  margin-top: 4px;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_MUIT_RED};
`;

const SearchSection = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxes = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
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
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TableSection = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: 691px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

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
  color: #555555;
  border: 1px solid #D9D9D9;
  background-color: #D9D9D9;
  cursor: pointer;
  padding: 0 6px;

  &:hover {
    border-color: ${COLOR_MUIT_RED};
    color: ${COLOR_MUIT_RED};
  }
`;

const Pagination = styled.div`
  width: 948px;
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


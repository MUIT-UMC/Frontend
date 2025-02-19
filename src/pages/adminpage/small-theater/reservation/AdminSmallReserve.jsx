import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import SearchIconBlack from "../../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../../assets/icons/AdminCheckboxRed.svg";
import DoubleLeftIcon from "../../../../assets/icons/DoubleLeft.svg";
import SingleLeftIcon from "../../../../assets/icons/SingleLeft.svg";
import SingleRightIcon from "../../../../assets/icons/SingleRight.svg";
import DoubleRightIcon from "../../../../assets/icons/DoubleRight.svg";

import SearchBar from "../../components/SearchBar";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = localStorage.getItem("adminToken");
const colKeys = ["name", "title", "schedule", "place", "num", "status"];
const colLabels = ["이름", "소극장 공연 이름", "날짜/시간", "공연 장소", "매수", "상태"];
const checkBoxMap = [1, 2, 5]; 
const checkBoxLabels = ["소극장 공연 이름", "날짜/시간", "상태"];

export default function AdminSmallReserve() {

  // 소극장 공연 예약정보 API
  const [smallReserveData, setSmallReserveData] = useState([]);
  useEffect(() => {
    fetchMemberTickets();
  }, []);
  const fetchMemberTickets = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/member-tickets`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const contentArr = response.data.result?.content || [];
      const refined = contentArr.map((item) => {
        let statusText = item.reservationStatus;
        switch (statusText) {
          case "RESERVE_AWAIT":
            statusText = "예약 중";
            break;
          case "RESERVED":
            statusText = "예약 완료";
            break;
          case "EXPIRED":
            statusText = "사용 완료";
            break;
          case "CANCEL_AWAIT":
            statusText = "취소 중";
            break;
          case "CANCELED":
            statusText = "취소 완료";
            break;
          default:
            break;
        }
        return {
          ticketId: item.memberTicketId,
          name: item.memberName,
          title: item.amateurShowName, 
          schedule: item.schedule,
          place: item.place,
          num: item.quantity + "매",
          status: statusText  
        };
      });
      setSmallReserveData(refined);
    } catch (err) {
      console.error("소극장 예약 목록 조회 실패:", err);
      alert("소극장 예약 정보를 불러오는 중 오류가 발생했습니다.");
      setSmallReserveData([]);
    }
  };

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

  // 2. SearchBar 검색 기능 ////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (inputValue) => {
    // 검색버튼 누르면 SearchBar에서 넘어온 값
    setSearchTerm(inputValue);
    setCurrentPage(1); // 검색 시 1페이지로
  };

  // 3. Table 기능 ////////////////////////////////////////////////////
  let displayedColIndexes = [];
  const checkedIndex = checkboxes.findIndex((val) => val === true);
  if (checkedIndex === -1) {
    // 전부 false => 전체 컬럼
    displayedColIndexes = [0, 1, 2, 3, 4, 5];
  } else {
    // 하나 체크 => 그 컬럼럼만
    displayedColIndexes = [checkBoxMap[checkedIndex]];
  }

  // 4. SearchBar 검색 로직 ////////////////////////////////////////////
  let searchKey = "name"; // default
  if (checkedIndex !== -1) {
    searchKey = colKeys[ checkBoxMap[checkedIndex] ];
  }
  const filteredData = smallReserveData.filter((smallreserve) => {
    if (!searchTerm) return true; // 아무것도 안쳤다면 전체
    const fieldValue = (smallreserve[searchKey] ?? "").toString().toLowerCase();
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  // 5. 페이지네이션 기능 ////////////////////////////////////////////////////
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
  const location = useLocation();

  return (
    <Container>
      <Tilte>소극장 공연 관리</Tilte>
      <PageMenu>
        <MenuLink 
        $active={location.pathname === "/adminpage/small-theater/ticket"}
        to="/adminpage/small-theater/ticket">
            소극장 티켓 관리</MenuLink>
        <MenuLink 
        $active={location.pathname === "/adminpage/small-theater/reserve"}
        to="/adminpage/small-theater/reserve">
            예약 내역 관리</MenuLink>
        {/* <MenuLink 
        $active={location.pathname === "/adminpage/small-theater/refund"}
        to="/adminpage/small-theater/refund">
            환불 내역 관리</MenuLink> */} {/* 데모데이 이후 구현 */}
      </PageMenu>
      <SearchSection>
        <SearchBar onSearch={handleSearch}/>
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

      <Data>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                {/* 선택된 컬럼들만 thead에 표시 */}
                {displayedColIndexes.map((i) => (
                  <th key={colKeys[i]}>{colLabels[i]}</th>
                ))}
                {/* "관리" 열은 항상 */}
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((smallreserve, index) => (
                <tr key={index}>
                  {/* 선택된 컬럼들만 td */}
                  {displayedColIndexes.map((i) => {
                    // 상태 열인 경우 &  "중" => 빨강
                    if (colKeys[i] === "status") {
                      return (
                        <td
                          key={colKeys[i]}
                          style={{ color: 
                          (smallreserve.status === "예약 중") || 
                          (smallreserve.status === "취소 중") ? COLOR_MUIT_RED : COLOR_GRAY_MAINTEXT }}>
                          {smallreserve[colKeys[i]]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={colKeys[i]}>{smallreserve[colKeys[i]]}</td>
                      );
                    }
                  })}
                  {/* 상세페이지버튼 */}
                  <td>
                    <DetailButton to={`/adminpage/small-theater/reserve/detail/${smallreserve.ticketId}`}>상세</DetailButton>
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

const Data = styled.div`
  margin-top: 40px;
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
  margin-top: 20px;
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
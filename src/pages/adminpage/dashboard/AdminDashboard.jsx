import React from 'react';
import styled from 'styled-components';

import Graph1 from "../../../assets/icons/AdminDashboard1.svg";
import Graph2 from "../../../assets/icons/AdminDashboard2.svg";
import Lineimg from "../../../assets/icons/AdminDashboard3.svg";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

//주문관리 Mock Data
const orderData = [
  { musical: "여신님이 보고 계셔", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "지킬 앤 하이드", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", count: 25 },
];
//예약현황 Mock Data
const reservationData = [
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "25/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
  { musical: "알라딘", dateTime: "2025-01-09 / 14:00", status: "20/25" },
];

export default function AdminDashboard() {

  const monthLabels = ["8월", "9월", "10월", "11월", "12월", "1월", "2월", "3월"];

  return (
    <DashboardContainer>
      {/* 상단 구역 */}
      <TopSection>
        <ChartBox>
          <ChartTitle>통계 &gt;</ChartTitle>
          <ChartPlaceholder>
            <Graph><img src={Graph1} alt="Graph" /></Graph>
            <Line><img src={Lineimg} alt="Line" /></Line>
            <Months>
              {monthLabels.map((label) => (
                <Month key={label}>{label}</Month>
              ))}
            </Months>
          </ChartPlaceholder>
        </ChartBox>
        <ChartBox>
          <ChartTitle>하루 방문자 수 &gt;</ChartTitle>
          <ChartPlaceholder>
            <Graph><img src={Graph2} alt="Graph" /></Graph>
            <Line><img src={Lineimg} alt="Line" /></Line>
            <Months>
              {monthLabels.map((label) => (
                <Month key={label}>{label}</Month>
              ))}
            </Months>
          </ChartPlaceholder>
        </ChartBox>
      </TopSection>

      {/* 하단 구역 */}
      <BottomSection>
        <TableBox>
          <TableTitle>주문 관리 &gt;</TableTitle>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>뮤지컬</th>
                  <th>날짜/시간</th>
                  <th>장(수)</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.musical}</td>
                    <td>{item.dateTime}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </TableBox>
        <TableBox>
          <TableTitle>예약 현황 &gt;</TableTitle>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>뮤지컬</th>
                  <th>날짜/시간</th>
                  <th>현황</th>
                </tr>
              </thead>
              <tbody>
                {reservationData.map((item, idx) => {
                  // status가 "25/25"인지 확인
                  const isFull = (item.status === "25/25");
                  return (
                    <tr key={idx}>
                      <td>{item.musical}</td>
                      <td>{item.dateTime}</td>
                      {/* status 컬럼만 조건부 스타일 */}
                      <TdStatus $full={isFull}>{item.status}</TdStatus>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </TableBox>
      </BottomSection>
    </DashboardContainer>
  );
}

/* --------- Styled Components --------- */

const DashboardContainer = styled.div`
  width:  1150px;
  height: 916px;  
  padding-left: 61px;
  padding-right:  107px;
  background-color: ${COLOR_WHITE};
  box-sizing: border-box;

  display:  flex;
  flex-direction: column;
  justify-content:  flex-start;
  gap:  68px;
`;

const TopSection = styled.div`
  margin-top: 49px;
  display: flex;
  justify-content: space-between;
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:  flex-start;
  align-items:  flex-start;
`;

const ChartTitle = styled.div`
  font-family:  "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color:  ${COLOR_GRAY_MAINTEXT};
`;

const ChartPlaceholder = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Graph = styled.div`
  margin-bottom:  32px;
`;

const Line = styled.div`
  margin-bottom:  10px;
`;

const Months = styled.div`
  width:  451px;
  display:  flex;
  justify-content:  space-between;
  align-items:  center;
`;

const Month = styled.div`
  font-family:  "Pretendard";
  font-size: 12px;
  font-weight: 500;
  color:  ${COLOR_GRAY_SUB};
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TableBox = styled.div`
  width:  451px;
  display: flex;
  flex-direction: column;
  justify-content:  flex-start;
  align-items:  flex-start;
  gap:  25px;
`;

const TableTitle = styled.div`
  font-family:  "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color:  ${COLOR_GRAY_MAINTEXT};
`;

// 테이블 래퍼(스크롤용)
const TableWrapper = styled.div`
  width: 100%;
  max-height: 330px; /* 테이블 높이가 길어질 경우 스크롤되게 */
  overflow-y: auto;
  padding-right: 15px;

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

// 테이블 스타일
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;  /* 테이블 선 겹침 방지 */

  th, td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
    font-size: 16px;
    font-family: "Pretendard";
  }

  th {
    background-color: #eee;
    font-weight: 500;
  }
`;

const TdStatus = styled.td`
  color: ${({ $full }) => ($full ? COLOR_GRAY_SUB : "inherit")};
`;
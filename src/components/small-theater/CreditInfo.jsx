import React from "react";
import styled from "styled-components";

function CreditInfo() {
    return(
        <CreditsWrapper>
            <CreditLabel>원작</CreditLabel>
            <CreditValue>최문애</CreditValue>
            <CreditLabel>연출/각색</CreditLabel>
            <CreditValue>서준서</CreditValue>
            <CreditLabel>조연출</CreditLabel>
            <CreditValue>권혁진, 이보미</CreditValue>
            <CreditLabel>기획</CreditLabel>
            <CreditValue>권대의</CreditValue>
            <CreditLabel>무대</CreditLabel>
            <CreditValue>백수현, 송하은, 공보경, 김기주, 김유민</CreditValue>
            <CreditLabel>조명</CreditLabel>
            <CreditValue>서윤범, 오은솔, 최진윤</CreditValue>
            <CreditLabel>음향</CreditLabel>
            <CreditValue>이준빈, 주나경</CreditValue>
            <CreditLabel>의상</CreditLabel>
            <CreditValue>최성빈</CreditValue>
            <CreditLabel>소품</CreditLabel>
            <CreditValue>임설</CreditValue>
      </CreditsWrapper>
    );
}
export default CreditInfo;

const CreditsWrapper = styled.div`
  margin-top: 23px;
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: auto 1fr; /* Label과 Value의 고정된 두 열 */
  row-gap: 12px; /* 항목 간 간격 */
  column-gap: 35px; /* Label과 Value 간 간격 */
`;

const CreditLabel = styled.div`
  text-align: left; /* 텍스트 왼쪽 정렬 */
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const CreditValue = styled.div`
  text-align: left; /* 텍스트 왼쪽 정렬 */
  color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;
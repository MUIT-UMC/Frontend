import React from "react";
import styled from "styled-components";
import ChevronLeft from "../../assets/icons/ChevronLeft.svg";
import ChevronRight from "../../assets/icons/ChevronRight.svg";

const PageNavigator = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerGroup = 5; // 5개씩 끊어서 표시
  const currentGroup = Math.floor(currentPage / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PageNavigatorWrapper>
      {/* 이전 5개 이동 */}
      <Img
        src={ChevronLeft}
        visibility={currentGroup === 0 ? "hidden" : "visible"}
        onClick={() => handlePageClick(startPage - pagesPerGroup)}
      />

      {/* 현재 그룹의 페이지 번호 표시 */}
      {Array.from({ length: endPage - startPage }, (_, index) => (
        <PageNumber
          key={startPage + index}
          color={currentPage === startPage + index ? "#A00000" : undefined}
          onClick={() => handlePageClick(startPage + index)}
        >
          {startPage + index + 1}
        </PageNumber>
      ))}

      {/* 다음 5개 이동 */}
      <Img
        src={ChevronRight}
        visibility={endPage >= totalPages ? "hidden" : "visible"}
        onClick={() => handlePageClick(startPage + pagesPerGroup)}
      />
    </PageNavigatorWrapper>
  );
};

export default PageNavigator;

const PageNavigatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const Img = styled.img`
  visibility: ${(props) => props.visibility};
  cursor: ${(props) => (props.visibility === "visible" ? "pointer" : "default")};
`;

const PageNumber = styled.div`
  color: ${(props) => props.color || "#919191"};
  cursor: pointer;
  font-weight: ${(props) => (props.color === "#A00000" ? "700" : "300")};
`;

import React from "react";
import styled from "styled-components";
import ChevronLeft from "../../assets/icons/ChevronLeft.svg";
import ChevronRight from "../../assets/icons/ChevronRight.svg";

const PageNavigator = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PageNavigatorWrapper>
      <Img
        src={ChevronLeft}
        visibility={currentPage === 0 ? "hidden" : "visible"}
        onClick={() => handlePageClick(currentPage - 1)}
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <PageNumber
          key={index}
          color={currentPage === index ? "#A00000" : undefined}
          onClick={() => handlePageClick(index)}
        >
          {index + 1}
        </PageNumber>
      ))}
      <Img
        src={ChevronRight}
        visibility={currentPage === totalPages-1 ? "hidden" : "visible"}
        onClick={() => handlePageClick(currentPage + 1)}
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

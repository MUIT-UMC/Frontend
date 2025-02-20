import React from "react";
import styled from "styled-components";

function SearchContainer({ fields, onSearchChange }) {
  const handleInputChange = (label, value) => {
    onSearchChange(label, value);
  };

  return (
    <ContainerWrapper>
      {fields.map(({ labelkor, label, placeholder, type }, index) => (
        <SearchForm key={index}>
          <div>{labelkor}</div>
          <Input
            type={type === "date" ? "date" : "text"} // type이 "date"이면 date, 없으면 text
            placeholder={type === "date" ? "" : placeholder}
            onChange={(e) => {
              handleInputChange(label, e.target.value);
              console.log(e.target.value);
            }}
          />
        </SearchForm>
      ))}
    </ContainerWrapper>
  );
}

export default SearchContainer;

const ContainerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 24px;
  width: 866px;
  border: 1px solid var(--Gray-outline, #e6e6e6);
  padding: 12px 28px;
`;

const SearchForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  div {
    margin-bottom: 8px;
    width: 90px;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #e6e6e6;
  width: 328px;
  height: 90%;
  stroke: var(--Gray-outline, #e6e6e6);
  color: var(--Gray-maintext, #000);
/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;
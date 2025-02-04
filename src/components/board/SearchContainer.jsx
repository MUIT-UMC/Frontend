import React from "react";
import styled from "styled-components";

function SearchContainer({ fields, onSearchChange }) {
  const isTwoColumns = fields.length === 2;

  const handleInputChange = (label, value) => {
    onSearchChange(label, value); // 부모 컴포넌트로 값 전달
  };

  return (
    <ContainerWrapper isTwoColumns={isTwoColumns}>
      {fields.map(({ labelkor, label, placeholder }, index) => (
        <SearchForm key={index} isTwoColumns={isTwoColumns}>
          <div>{labelkor}</div>
          <Input
            placeholder={placeholder}
            onChange={(e) => {
              handleInputChange(label, e.target.value);
              console.log(e.target.value);
            }
            }
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
  gap:  ${({ isTwoColumns }) => isTwoColumns ? "0px 24px" : "24px 24px"};
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
`;
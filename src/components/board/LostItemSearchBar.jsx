import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LostItemSearchBar() {
  return (
  <>
    <LostItemWrapper>
      <SearchForm>
      <div>분실일</div><Input /> <div>분실장소</div><Input />
      </SearchForm>
        
      <SearchForm>
      <div>분실물명</div><Input /><div>뮤지컬명</div><Input />
      </SearchForm>
    </LostItemWrapper>
  </>
  )
}

export default LostItemSearchBar;

const LostItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 866px;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  padding: 16px 28px;
`

const SearchForm = styled.div`
display: flex;
flex-direction: row;
div {
  width: 90px;
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
}
`
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #E6E6E6;
  width: 328px;
stroke: var(--Gray-outline, #E6E6E6);
margin-right: 24px;
`
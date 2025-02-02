import React, { useState } from 'react';
import styled from 'styled-components';

import SearchIcon from "../../../assets/icons/AdminSearch.svg";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

export default function SearchBar() {
  // 검색어 입력값
  const [searchInput, setSearchInput] = useState("");           

  return(
    <SearchBarWrapper>
      <InputRow>
        <SearchInput
          type="text"
          placeholder=""
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <SearchButton>
          <img src={SearchIcon} alt="Search Icon" />
        </SearchButton>
      </InputRow>
    </SearchBarWrapper>
  );
}


const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  border: 1px solid ${COLOR_GRAY_MAINTEXT};
  border-radius: 3px;
  width: 360px;
`;

// 검색 input + 버튼 
const InputRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 4px 10px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 30px;
  border: none;
  outline: none;
  background-color: transparent;
  text-align: left;

  &::placeholder {
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: 500;
    color: ${COLOR_GRAY_SUB};
  }
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  background: ${COLOR_WHITE};
`;
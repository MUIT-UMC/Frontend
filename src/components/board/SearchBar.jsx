import styled from "styled-components";
import SearchIcon from '../../assets/icons/Search2.svg'
import React, { useState } from "react";


const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const onChange = (e) => {
      setSearchValue(e.target.value);
    }
    return (
        <Search>
          <img src={SearchIcon} className="search-btn" />
            <input className="search-txt"
                value={searchValue} onChange={onChange}
                placeholder="원하시는 내용을 검색하세요." />

        </Search>
    )
}

const Search = styled.form`
  box-sizing: border-box;
  display: flex;

  width: 922px;
  height: 40px;

  border: 1px solid #C1C1C1;
  border-radius: 3px;
  background: #FFF;
  gap:12px;

  padding: 8px 20px 8px 20px;

  input::placeholder{
    font-family: Pretendard;
    font-size: 16px;
    color: #919191;
  }
  .search-txt{
    border: none;
    width: 100%;
  }
  .search-btn{
    cursor: pointer;
    width: 28px;
  }
`

export default SearchBar;
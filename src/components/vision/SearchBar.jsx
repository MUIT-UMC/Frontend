import styled from "styled-components";
import SearchIcon from '../../assets/icons/Search.svg'
import React, { useState } from "react";


const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const onChange = (e) => {
      setSearchValue(e.target.value);
    }
    return (
        <Search>
            <input className="search-txt"
                value={searchValue} onChange={onChange}
                placeholder="뮤지컬이나 공연장을 입력해주세요." />
            <img src={SearchIcon} className="search-btn" />
        </Search>
    )
}

const Search = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  //margin-top: 140px;
  width: 508px;
  height: 40px;

  border: 1px solid #C1C1C1;
  border-radius: 3px;
  background: #FFF;

  padding: 8px 20px 8px 20px;

  input::placeholder{
    font-family: Pretendard;
    font-size: 16px;
    color: #919191;
  }
  .search-txt{
    border: none;
    width: 420px;
  }

  .search-btn{
    cursor: pointer;
    width: 28px;
  }
`

export default SearchBar;
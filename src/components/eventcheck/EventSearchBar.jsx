import styled from "styled-components";
import SearchIcon from '../../assets/icons/Search2.svg'
import React, { useState } from "react";

const EventSearchBar = () => {
    const [searchEValue, setSearchEValue] = useState("");
    const onChange = (e) => {
        setSearchEValue(e.target.value);
    }

    return (
        <Search>
            <input className="search-txt"
                value={searchEValue} onChange={onChange}
                placeholder="원하시는 뮤지컬을 검색하세요." />
            <img src={SearchIcon} className="search-btn" />
        </Search>
    )
}

const Search = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export default EventSearchBar;
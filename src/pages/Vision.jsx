
import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

const Vision = () => {
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e) => {
    setSearchValue(e.target.value);
  }
  
  return (
    <Container>
      <h2>어느 <span className="color-txt">공연장</span>이 궁금하세요?</h2>
      <SearchBar>
        <input className="search-txt"
        value={searchValue} onChange={onChange}
        placeholder="뮤지컬이나 공연장을 입력해주세요."/>
        <IoIosSearch
        className="search-btn"
        size={28} color="#C1C1C1"/>
      </SearchBar>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top:100px;

    h2{
      font-size: 24px;
    }
    .color-txt{
      color: #A00000;
    }
`
const SearchBar = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 140px;
  width: 508px;
  height: 40px;

  border: 1px solid #C1C1C1;
  border-radius: 3px;

  padding: 8px 20px 8px 20px;

  input::placeholder{
    font-size: 16px;
    color: #919191;
  }

  .search-txt{
    border: none;
    width: 420px;
  }

  .search-btn{
    cursor: pointer;
  }
`

export default Vision;

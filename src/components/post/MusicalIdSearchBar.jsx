import React from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/icons/Search2.svg"; // 파일 직접 불러오기
import { useState } from "react";
import useCustomFetch from "../../hooks/useCustomFetch";
import MusicalIdSearchItem from "./MusicalIdSearchItem";
const token = localStorage.getItem("accessToken");

const MusicalIdSearchBar = ({setMusicalId, setLocation}) => {

  const [searchParams, setSearchParams] = useState({
    musicalName:""
  });

  const [doSearch, setDoSearch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const queryString = new URLSearchParams({
    musicalName: searchParams.musicalName,
  }).toString();

  const url = `/musicals/search?${queryString}`;

  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  console.log(data);
  const handleSearchChange = (label, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [label]: value, // 필드 값 업데이트
    }));
  };

  return (
    <Wrapper>
    <img src={SearchIcon} alt="검색 아이콘" />
      <Input type="text" 
      value={searchParams.musicalName}
      placeholder="뮤지컬 이름을 입력하세요" 
      onChange={(e) => {
        handleSearchChange("musicalName", e.target.value);
        console.log(e.target.value);}
      }
      onFocus={() => setIsFocused(true)} // focus 상태 변경
        onBlur={() => setIsFocused(false)} // blur 상태 변경
      />
      {isFocused && (
  <ResultWrapper onMouseDown={(e) => e.preventDefault()}>
    <ResultList>
      {data?.result?.musicalHomeList && data.result.musicalHomeList.length > 0 ? (
        data.result.musicalHomeList.map((d) => (
          <div
            key={d.id}
            onClick={() => {
              setMusicalId(d.id);
              setLocation(d.place);
              handleSearchChange("musicalName", d.name);
              console.log(d.id);
            }}
          >
            <MusicalIdSearchItem data={d} />
          </div>
        ))
      ) : (
        <div>{/*검색 결과가 없습니다.*/}</div>
      )}
    </ResultList>
  </ResultWrapper>
)}

      
    </Wrapper>
      
  );
};

export default MusicalIdSearchBar;

const Input = styled.input`
  width: 610px;
  border: none;
  color: var(--Gray-maintext, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;

  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 610px;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  color: var(--Gray-maintext, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;

const ResultWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 5px;
  z-index: 100;
`;

const ResultList = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;

  max-height: 300px; /* 최대 높이를 300px로 지정, 필요에 따라 조정 가능 */
  overflow-y: auto; /* 내용이 최대 높이를 초과하면 스크롤바 표시 */

  div {
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

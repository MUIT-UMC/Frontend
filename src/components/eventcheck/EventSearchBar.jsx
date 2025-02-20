import styled from "styled-components";
import SearchIcon from '../../assets/icons/Search2.svg'
import React, { useEffect, useState } from "react";
import EventSearchResult from "./EventSearchResult";
import useCustomFetch from "../../hooks/fetchWithAxios";

const EventSearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    const handleSearch = () => {
        setDebouncedValue(searchValue.trim());
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(searchValue.trim());
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue]);

    const { data, error, loading } = useCustomFetch(
        debouncedValue ? `/musicals/search?musicalName=${debouncedValue}` : null
    );

    const result = data?.isSuccess ? data?.result?.musicalHomeList || [] : [];
    console.log(result);

    return (
      <>
        <Search>
          <input className="search-txt"
            value={searchValue} onChange={onChange}
            placeholder="원하시는 뮤지컬을 검색하세요." />
          <img src={SearchIcon} className="search-btn" />
        </Search>
        <Result>
          {loading && <p>검색 중...</p>}
          {error && <p>오류 발생!</p>}

          {!loading && !error && result.length === 0 && debouncedValue && (
            <p>검색 결과가 없습니다.</p>
          )}

          {result.length> 0 && <p className="result-length">검색 결과 {result.length}건</p>}
          {result.length > 0 && result.map((musical) => (
            <EventSearchResult
              key={musical?.id}
              id={musical?.id}
              posterUrl={musical?.posterUrl}
              name={musical?.name}
              place={musical?.place}
              duration={musical?.duration}
              onClick={() => ToEventDetail(musical.id)}
            />
          ))}
        </Result>
      </>
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
const Result = styled.div`
  margin-top: 10px;
  .result-length{
    margin: 6px 0px;
    color: var(--Gray-sub, #919191);
    font-size: 14px;
    font-weight: 500;
  }
`;

export default EventSearchBar;
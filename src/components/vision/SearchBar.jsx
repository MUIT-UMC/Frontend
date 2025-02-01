import styled from "styled-components";
import SearchIcon from '../../assets/icons/Search2.svg';
import React, { useEffect, useState } from "react";
import useCustomFetch from "../../hooks/fetchWithAxios";
import SearchResult from "./SearchResult";

const SearchBar = () => {
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
        debouncedValue ? `/theatres?theatreName=${debouncedValue}` : null
    );

    const result = data?.isSuccess ? data.result.theatreResults || [] : [];
    console.log(result.length);

    return (
      <>
        <Search>
          <input 
            className="search-txt"
            value={searchValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="뮤지컬이나 공연장을 입력해주세요."
          />
          <img 
            src={SearchIcon} 
            className="search-btn" 
            onClick={handleSearch} 
          />
        </Search>
        
        <Result>
          {loading && <p>검색 중...</p>}
          {error && <p>오류 발생!</p>}

          {!loading && !error && result.length === 0 && debouncedValue && (
            <p>검색 결과가 없습니다.</p>
          )}

          {result.length> 0 && <p className="result-length">검색 결과 {result.length}건</p>}
          {result.length > 0 && result.map((theatre) => (
            <SearchResult
              key={theatre?.id}
              id={theatre?.id}
              theatreName={theatre?.theatreName}
              address={theatre?.address}
              theatrePic={theatre?.theatrePic}
              onClick={() => ToVisionDetail(theatre.id)}
            />
          ))}
        </Result>
      </>
    );
};

const Search = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 508px;
  height: 40px;
  margin-bottom: 12px;

  border: 1px solid #C1C1C1;
  border-radius: 3px;
  background: #FFF;

  padding: 8px 20px 8px 20px;

  input {
    font-family: Pretendard;
  }

  input::placeholder {
    font-family: Pretendard;
    font-size: 16px;
    color: #919191;
  }
  .search-txt {
    border: none;
    width: 420px;
  }
  .search-btn {
    cursor: pointer;
    width: 28px;
  }
`;

const Result = styled.div`
  margin-top: 10px;
  .result-length{
    margin: 6px 0px;
    color: var(--Gray-sub, #919191);
    font-size: 14px;
    font-weight: 500;
  }
`;

export default SearchBar;
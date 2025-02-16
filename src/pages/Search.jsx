import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import SearchIcon from "../assets/icons/SearchButton.svg";
import DivideBarIcon from "../assets/icons/DivideBarSearch.svg";
import DeleteIcon from "../assets/icons/Delete.svg";

// 색상
const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const MAX_WIDTH = 1440;

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
// const token = localStorage.getItem("token"); 로그인 구현되면 이렇게
// 그전 까지 임시
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

export default function Search() {
  
  const [hotMusicals, setHotMusicals] = useState([]);           // 핫뮤지컬 목록 (Hot 10 API)
  const [searchInput, setSearchInput] = useState("");           // 검색어 입력값
  const [isFocused, setIsFocused] = useState(false);            // 검색창 포커스 여부
  const searchBarRef = useRef(null);
  const [recentSearches, setRecentSearches] = useState([        // 최근 검색어 목록(Figma예시 상태)
    "진짜 나쁜 소녀",
    "알라딘",
    "킹키부츠",
    "마타하리",
    "지킬 앤 하이드",
  ]);
  const [filteredData, setFilteredData] = useState([]);         // 검색결과 목록 (검색 API)

  useEffect(() => {
    fetchHotMusicals();
  }, []);

  // 최근 핫뮤지컬 10 클릭
  const handleHotMusicalClick = (title) => {
    setSearchInput(title);
    addRecentSearch(title);
    setIsFocused(true);
  };

  //Hot 10 API
  const fetchHotMusicals = async () => {
    try {
      const response = await axios.get(`${baseURL}/musicals/hot/all?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const dataArr = response.data.result.content;
      const topTen = dataArr.slice(0, 10);
      const refined = topTen.map((item, idx) => ({
        poster: item.posterUrl,
        title: item.name,
        locate: item.place,
        date: item.duration,
        ranking: (idx + 1).toString()
      }));
      
      setHotMusicals(refined);
    } catch (error) {
      console.error("Error fetching hot musicals:", error);
      setHotMusicals([]);
    }
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredData([]);
    } else {
      fetchSearchData(searchInput.trim());
    }
  }, [searchInput]);

   // 검색 API
  const fetchSearchData = async (keyword) => {
    try {
      const res = await axios.get(`${baseURL}/musicals/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { musicalName: keyword }
      });
      const list = res.data.result.musicalHomeList || [];
      const refined = list.map((item) => ({
        poster: item.posterUrl,
        title: item.name,
        locate: item.place,
        date: item.duration
      }));
      setFilteredData(refined);
    } catch (err) {
      console.error("Search API Error:", err);
      setFilteredData([]);
    }
  };

  // 최근 검색어 추가
  const addRecentSearch = (keyword) => {
    if (!keyword.trim()) return;
    setRecentSearches((prev) => {
      // 이미 있는 키워드는 제거 후 맨 앞으로
      const filtered = prev.filter((item) => item !== keyword);
      return [keyword, ...filtered];
    });
  };

  // 개별 삭제
  const removeRecentItem = (keyword) => {
    setRecentSearches((prev) => prev.filter((item) => item !== keyword));
  };

  // 전체 삭제
  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  // Enter 시 최근 검색어 등록
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addRecentSearch(searchInput);
    }
  };

  // 최근 검색어 클릭 시 해당 검색어로 검색
  const handleRecentSearchClick = (keyword) => {
    setSearchInput(keyword);
    addRecentSearch(keyword);
    setIsFocused(true);
  };

  // 검색바 전환
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <Title>
        <TitleRed>원하시는 뮤지컬</TitleRed>
        <TitleBlack>을 검색하세요</TitleBlack>
      </Title>

      {/* 검색창 + 아래 내용(상태별 표시) */}
      <SearchBarWrapper ref={searchBarRef}
        // 디자인 구분을 위해 상태 전달
        $isFocused={isFocused}
        $hasInput={!!searchInput.trim()}
      >
        {/* 실제 입력창 + 버튼 */}
        <InputRow>
          <SearchInput
            type="text"
            placeholder="원하시는 뮤지컬을 검색하세요"
            value={searchInput}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchButton>
            <img src={SearchIcon} alt="Search Icon" />
          </SearchButton>
        </InputRow>

        {/* 상태: 포커스 있지만 입력값 X => '최근 검색어 + 핫뮤지컬' */}
        {isFocused && !searchInput && (
          <>
            <Dividebar>
              <img src={DivideBarIcon} alt="Bar Icon" />
            </Dividebar>

            {/* 최근 검색어 */}
            <RecentSearchBox>
              <RecentSearchTitle>최근 검색어</RecentSearchTitle>
              <RecentSearchesContainer>
                {recentSearches.length > 0 ? (
                  recentSearches.map((keyword, idx) => (
                    <RecentSearchItem key={idx}>
                      <RecentSearchKeyword
                        onClick={() => handleRecentSearchClick(keyword)}
                      >
                        {keyword}
                      </RecentSearchKeyword>
                      <RemoveButton onClick={() => removeRecentItem(keyword)}>
                        <img src={DeleteIcon} alt="Delete Icon" />
                      </RemoveButton>
                    </RecentSearchItem>
                  ))
                ) : (
                  <NoRecentSearch>최근 검색어가 없습니다.</NoRecentSearch>
                )}
                {recentSearches.length > 0 && (
                  <ClearButton onClick={clearAllRecent}>전체 삭제</ClearButton>
                )}
              </RecentSearchesContainer>
            </RecentSearchBox>

            {/* 핫 뮤지컬 */}
            <PopularSearchBox>
              <PopularSearchTitle>최근 핫한 뮤지컬</PopularSearchTitle>
              <PopularSearches>
                <Column>
                  {hotMusicals.slice(0, 5).map((item, idx) => (
                    <PopularSearchItem key={idx} onClick={() => handleHotMusicalClick(item.title)}>
                      <RankingText $rank={Number(item.ranking)}>
                        {item.ranking}
                      </RankingText>
                      <PopularSearchTitleText>
                        {item.title}
                      </PopularSearchTitleText>
                    </PopularSearchItem>
                  ))}
                </Column>
                <Column>
                  {hotMusicals.slice(5, 10).map((item, idx) => (
                    <PopularSearchItem key={idx} onClick={() => handleHotMusicalClick(item.title)}>
                      <RankingText $rank={Number(item.ranking)}>
                        {item.ranking}
                      </RankingText>
                      <PopularSearchTitleText>
                        {item.title}
                      </PopularSearchTitleText>
                    </PopularSearchItem>
                  ))}
                </Column>
              </PopularSearches>
            </PopularSearchBox>
          </>
        )}

        {/* 상태: 포커스 O + 검색어 O => 검색결과 */}
        {isFocused && searchInput && (
          <>
            <SearchResultBox>
              <SearchResultText>
                검색 결과 {filteredData.length}건
              </SearchResultText>

              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <SearchResultItem key={index}>
                    <Poster src={item.poster} alt={item.title} />
                    <SearchResultDetails>
                      <SearchResultTitle>{item.title}</SearchResultTitle>
                      <Location>{item.locate}</Location>
                      <Date>{item.date}</Date>
                    </SearchResultDetails>
                  </SearchResultItem>
                ))
              ) : (
                <NoResults>검색된 결과가 없습니다.</NoResults>
              )}
            </SearchResultBox>
          </>
        )}
      </SearchBarWrapper>
    </Container>
  );
}

/* ------------------- Styled Components ------------------- */

const Container = styled.div`
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  position: relative;
  background-color: ${COLOR_WHITE};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 152px;
  display: flex;
`;

const TitleRed = styled.div`
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 700;
  color: ${COLOR_MUIT_RED};
  text-align: center;
`;

const TitleBlack = styled.div`
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
  text-align: center;
`;

/* 검색바 상황에 따라 조건부 렌더링 */
const SearchBarWrapper = styled.div`
  /* 공통 스타일 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  border-radius: 3px;
  width: 508px;

  /* $isFocused, $hasInput를 사용한 조건부 스타일 */
  ${({ $isFocused, $hasInput }) => {
    if ($isFocused && !$hasInput) {
      // 포커스O + 입력값X => 확장 검색바
      return `
        margin-top: 140px;
        border: 1px solid ${COLOR_GRAY_UNSELECTED};
        height: auto; 
      `;
    } else {
      // 그 외 => 기본 검색바
      return `
        margin-top: 140px;
        border: 1px solid ${COLOR_GRAY_UNSELECTED};
        height: 40px;
      `;
    }
  }}
`;

// (상단) 검색 input + 버튼 들어가는 영역
const InputRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 8px 20px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  width: 450px;
  height: 34px;
  border: none;
  outline: none;
  background-color: transparent;
  text-align: left;

  &::placeholder {
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 500;
    color: ${COLOR_GRAY_SUB};
  }
`;

const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  width: 28px;
  height: 28px;
  background: ${COLOR_WHITE};
`;

const Dividebar = styled.div`
  margin-top: -8px;
  margin-left: 12px;
  width: 480px;
`;

const RecentSearchBox = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  width: 466px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RecentSearchTitle = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
  margin-bottom: 16px;
`;

const RecentSearchesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 16px;
`;

const RecentSearchItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  box-sizing: border-box;
  border: 1px solid ${COLOR_GRAY_MAINTEXT};
  border-radius: 30px;
  height: 33px;
  padding: 6px 12px;
`;

const RecentSearchKeyword = styled.span`
  cursor: pointer;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 12px;
  margin-top: 3px;
  margin-left: 3px;
  margin-right: 3px;
`;

const NoRecentSearch = styled.p`
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const ClearButton = styled.button`
  position: absolute;
  top: 2px;
  right: 0px;
  border: none;
  cursor: pointer;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  background: ${COLOR_WHITE};
  color: ${COLOR_GRAY_SUB};
`;

const PopularSearchBox = styled.div`
  margin-top: 4px;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 450px;
  max-height: 251px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PopularSearchTitle = styled.h3`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const PopularSearches = styled.div`
  display: flex;
  gap: 120px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const PopularSearchItem = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
`;

const RankingText = styled.span`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: ${(props) =>
    props.$rank <= 3 ? COLOR_MUIT_RED : COLOR_GRAY_MAINTEXT};
`;

const PopularSearchTitleText = styled.span`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

/* 검색결과 영역 */
const SearchResultBox = styled.div`
  margin-top: 41px;
  position: relative;
  width: 508px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchResultText = styled.div`
  position: absolute;
  top: -24px;
  left: 0;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_SUB};
`;

const SearchResultItem = styled.div`
  box-sizing: border-box;
  border: 1px solid ${COLOR_GRAY_UNSELECTED};
  border-radius: 3px;
  width: 100%;
  height: 220px;

  display: flex;
  align-items: center;
  gap: 26px;
`;

const Poster = styled.img`
  margin-left: 10px;
  width: 140px;
  height: 200px;
`;

const SearchResultDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SearchResultTitle = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_GRAY_MAINTEXT};
  margin-bottom: 10px;
`;

const Location = styled.div`
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
  margin-bottom: 16px;
`;

const Date = styled.div`
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_SUB};
`;

const NoResults = styled.div`
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

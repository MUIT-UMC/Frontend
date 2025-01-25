import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

// TICKET OPEN 목업 데이터(임시) -> 추후 API
const SearchData = [
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
    title: "알라딘",
    locate: "샤롯데씨어터",
    date: "2024.11.22 ~ 2025.06.22",
    ranking: "1",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014885_p.gif",
    title: "시라노",
    locate: "예술의 전당",
    date: "2024.12.06 ~ 2025.02.23",
    ranking: "2",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
    title: "지킬앤하이드",
    locate: "블루스퀘어 신한카드홀",
    date: "2024.11.29 ~ 2025.05.18",
    ranking: "3",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24016737_p.gif",
    title: "웃는남자",
    locate: "예술의전당 오페라극장",
    date: "2025.01.09 ~ 2025.03.09",
    ranking: "4",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/L0/L0000106_p.gif",
    title: "마타하리",
    locate: "LG아트센터 서울 LG SIGNATURE 홀",
    date: "2024.12.05 ~ 2025.03.02",
    ranking: "5",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24016374_p.gif",
    title: "미아 파밀리아",
    locate: "링크아트센터드림 드림1관",
    date: "2024.12.19 ~ 2025.03.23",
    ranking: "6",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24015073_p.gif",
    title: "테일러",
    locate: "대학로 TOM 1관",
    date: "2024.11.19 ~ 2025.02.09",
    ranking: "7",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
    title: "이프덴",
    locate: "홍익대 대학로 아트센터",
    date: "2024.12.03 ~ 2025.03.02",
    ranking: "8",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24014865_p.gif",
    title: "글루미 선데이",
    locate: "링크아트센터 페이코홀",
    date: "2024.11.05 ~ 2025.01.26",
    ranking: "9",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
    title: "베르테르",
    locate: "디큐브 링크아트센터",
    date: "2025.01.17 ~ 2025.03.16",
    ranking: "10",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018180_p.gif",
    title: "라파치니의 정원",
    locate: "플러스씨어터",
    date: "2025.01.30 ~ 2025.04.20",
    ranking: "11",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/25/25000113_p.gif",
    title: "무명호걸",
    locate: "CKL스테이지",
    date: "2025.02.04 ~ 2025.02.19",
    ranking: "12",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018133_p.gif",
    title: "시카고",
    locate: "계명아트센터",
    date: "2025.02.07 ~ 2025.02.09",
    ranking: "13",
  },
  {
    poster: "https://ticketimage.interpark.com/Play/image/large/24/24018006_p.gif",
    title: "원스",
    locate: "코엑스 신한카드 아티움",
    date: "2025.02.19 ~ 2025.05.31",
    ranking: "14",
  },
];

export default function Search() {
  // 상태들
  const [searchInput, setSearchInput] = useState("");           // 검색어 입력값
  const [isFocused, setIsFocused] = useState(false);            // 검색창 포커스 여부
  const [recentSearches, setRecentSearches] = useState([        // 최근 검색어 목록
    "진짜 나쁜 소녀",
    "알라딘",
    "킹키부츠",
    "마타하리",
    "지킬 앤 하이드",
  ]);
  const [filteredData, setFilteredData] = useState(SearchData); // 필터링된 검색 결과

  // 핫뮤지컬(1~10)
  const hotMusicals = SearchData
    .filter((item) => parseInt(item.ranking, 10) <= 10)
    .sort((a, b) => parseInt(a.ranking, 10) - parseInt(b.ranking, 10));

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredData([]); // 입력이 없으면 결과 비움
    } else {
      const result = SearchData.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredData(result);
    }
  }, [searchInput]);

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

  return (
    <Container>
      <Title>
        <TitleRed>원하시는 뮤지컬</TitleRed>
        <TitleBlack>을 검색하세요</TitleBlack>
      </Title>

      {/* 검색창 + 아래 내용(상태별 표시) */}
      <SearchBarWrapper
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
                    <PopularSearchItem key={idx}>
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
                    <PopularSearchItem key={idx}>
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

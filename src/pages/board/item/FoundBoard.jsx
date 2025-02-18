import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostList from "../../../components/board/PostList";
import SearchContainer from "../../../components/board/SearchContainer";
import useFetch from "../../../hooks/useFetch";
import PageNavigator from "../../../components/board/PageNavigator";
import useCustomFetch from "../../../hooks/useCustomFetch";
// const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");
console.log(token);
const FoundBoard = () => {
  const [postType] = useState("FOUND");
  const [currentPage, setCurrentPage] = useState(0);
  const [size] = useState(5); // 한 페이지당 게시물 수
  const [searchParams, setSearchParams] = useState({
    musicalName: "",
    lostDate: "",
    location: "",
    lostItem: "",
  });

  const [doSearch, setDoSearch] = useState(false);
  const queryString = new URLSearchParams({
    postType,
    page: currentPage,
    size,
    musicalName: searchParams.musicalName,
    lostDate: searchParams.lostDate,
    location: searchParams.location,
    lostItem: searchParams.lostItem,
  }).toString();

  const url = `/losts?${queryString}`;

  

  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },);

  const handleSearchChange = (label, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [label]: value, // 필드 값 업데이트
    }));
    setCurrentPage(0);
  };

  const fieldsForFour = [
    
    { labelkor: "습득일", label: "lostDate", placeholder: "" },
    { labelkor: "습득장소", label: "location", placeholder: "" },
    { labelkor: "습득물명", label: "lostItem", placeholder: "" },
    { labelkor: "뮤지컬명", label: "musicalName", placeholder: "" },
  ];

  const tableHeaders = ["습득물명", "뮤지컬명", "습득장소", "습득일"];

  const totalPages = data?.result?.totalPage || 1;

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

    
  return (
    <>
    {/*
    <ButtonWrapper>
        <Button
          background="none"
          color="#A00000"
          marginBottom="8px"
          onClick={() => {
            setCurrentPage(0);
          }} // 검색 시 첫 페이지부터
        >
            검색
          </Button>
      </ButtonWrapper>
     */}
      
      <SearchContainer fields={fieldsForFour} onSearchChange={handleSearchChange} />

      {loading && <div>로딩 중...</div>}
      {error && <div>에러 발생: {error}</div>}
      {data?.result?.posts?.length == 0 ? <div style={{marginTop: '30px'}}>아직 작성된 게시글이 없습니다.</div> :
        !loading && !error && (
          <>
            <PostList details={data.result.posts} headers={tableHeaders} cols={3}/>
            <PageNavigator
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
             </>
        )
      }
    </>
  );
};

export default FoundBoard;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  padding: 0;
  `

const Text = styled.div`
  color: var(--Gray-maintext, #000);

/* body-16-medium */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
margin-bottom: 20px;
`
import React from "react";
import styled from "styled-components";
import PostList from "../../../components/board/PostList";
import SearchBar from "../../../components/board/SearchBar";
import SearchContainer from "../../../components/board/SearchContainer";
import { useState } from "react";
import PageNavigator from "../../../components/board/PageNavigator";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

const MusicalBoard = () => {
  
  const [postType] = useState("REVIEW");
    const [currentPage, setCurrentPage] = useState(0);
    const [size] = useState(5); // 한 페이지당 게시물 수
    const [searchParams, setSearchParams] = useState({
      musicalName: "",
      location: "",
    });
  
    const [doSearch, setDoSearch] = useState(false);
    const queryString = new URLSearchParams({
      postType,
      page: currentPage,
      size,
      musicalName: searchParams.musicalName,
      location: searchParams.location,
    }).toString();
  
    const url = `/reviews?${queryString}`;

  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const handleSearchChange = (label, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [label]: value, // 필드 값 업데이트
    }));
    setCurrentPage(0);
  };  

  const fieldsForTwo = [
    { labelkor: "뮤지컬명", label: "musicalName", placeholder: "" },
    { labelkor: "장소", label:"location", placeholder: "" },
  ];
  const tableHeaders = [
    "제목", "뮤지컬명", "장소"
  ]
    // API에서 받은 데이터와 상태 처리
    const totalPages = data?.result?.totalPage || 1; // 전체 페이지 수
  
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
      
      <SearchContainer fields={fieldsForTwo} onSearchChange={handleSearchChange}/>
      {loading && <div>로딩 중...</div>}
      {error && <div>에러 발생: {error}</div>}
      {!loading && !error && (
        <>
          <PostList details={data.result.posts} headers={tableHeaders} cols={3}/>
          <PageNavigator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
           </>
      )}
    </>
  );
};

export default MusicalBoard;

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
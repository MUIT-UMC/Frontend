import React from "react";
import styled from "styled-components";
import SearchBar from "../../../components/board/SearchBar";
import PostList2 from "../../../components/board/PostList2";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { useEffect } from "react";
import { useState } from "react";
import PageNavigator from "../../../components/board/PageNavigator";
import useFetch from "../../../hooks/useFetch";

// const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");
console.log(token);

const HotBoard = () => {
const [postType] = useState("HOT");
  const [currentPage, setCurrentPage] = useState(0);
  const [size] = useState(5); // 한 페이지당 게시물 수

  const [searchParams, setSearchParams] = useState({
    search:""
  });

  const [doSearch, setDoSearch] = useState(false);

  const queryString = new URLSearchParams({
    postType,
    page: currentPage,
    size,
    search: searchParams.search,
  }).toString();

  const url = `/posts?${queryString}`;

  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  console.log('핫게', data);

  const handleSearchChange = (label, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [label]: value, // 필드 값 업데이트
    }));
    setCurrentPage(0);
  };

// API에서 받은 데이터와 상태 처리
  const totalPages = data?.result?.totalPage || 1; // 전체 페이지 수

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
      <Text>좋아요 10개를 받으면 HOT 게시물로 자동 선정됩니다.</Text>
      <ButtonWrapper>
        <SearchBar onSearchChange={handleSearchChange}/>
      </ButtonWrapper>
      {loading && <div>로딩 중...</div>}
      {error && <div>에러 발생: {error}</div>}
      {data?.result?.posts?.length == 0 ? <div style={{marginTop: '30px'}}>아직 작성된 게시글이 없습니다.</div> :
        !loading && !error && (
          <>
          <PostList2 posts={data.result.posts} />
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

export default HotBoard;

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
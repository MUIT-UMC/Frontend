import React from "react";
import styled from "styled-components";
import SearchBar from "../../../components/board/SearchBar";
import PostList2 from "../../../components/board/PostList2";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { useEffect } from "react";
import { useState } from "react";
import PageNavigator from "../../../components/board/PageNavigator";

const AllBoard = () => {

  // 현재 페이지 세팅 
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const url = `/posts/?${currentPage}&size=20`;

  const { data, error, loading } = useCustomFetch(url);

  console.log("데이터", data);
  if (!data || data.result.posts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

// API에서 받은 데이터와 상태 처리
  const totalPages = data?.result?.totalPage || 1; // 전체 페이지 수
  console.log(totalPages);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  

  return (
    <>
      <Text>좋아요 10개를 받으면 HOT 게시물로 자동 선정됩니다.</Text>
      <ButtonWrapper>
        <SearchBar />
      </ButtonWrapper>
      {loading && <div>로딩 중...</div>}
      {error && <div>에러 발생: {error}</div>}
      {!loading && !error && 
      <>
      <PostList2 posts={data.result.posts} />
      <PageNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </>
      }
    </>
  );
};

export default AllBoard;

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
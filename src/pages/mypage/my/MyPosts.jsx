import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostList from "../../../components/board/PostList";
import { useState } from "react";
import PageNavigator from "../../../components/board/PageNavigator";
import useCustomFetch from "../../../hooks/useCustomFetch";
// const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");

function MyPosts() {
  const tableHeaders = [
    "제목", "게시판", "날짜"
  ]
  const [currentPage, setCurrentPage] = useState(0);
  const [size] = useState(8); // 한 페이지당 게시물 수

  const queryString = new URLSearchParams({
    page: currentPage,
    size,
  }).toString();

  const url = `/myPost?${queryString}`;


  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },[token]);

  console.log(data);
 
  const totalPages = data?.result?.totalPage || 1;

  return (
    <>
    {loading && <div style={{marginTop:'32px'}}>로딩 중...</div>}
      {error && <div style={{marginTop:'32px'}}>에러 발생: {error}</div>}
      {!loading && !error && (
  <>
    {data?.result?.posts?.length > 0 ? (
      <>
        <PostList details={data?.result?.posts} headers={tableHeaders} cols={3} boardType="mypost" />
        <PageNavigator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </>
    ) : (
      <p style={{marginTop:'32px'}}>아직 작성된 게시글이 없습니다.</p>
    )}
  </>
)}
      
    </>
  );
}

export default MyPosts;


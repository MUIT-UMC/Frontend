import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostList from "../../../components/board/PostList";
import { useState } from "react";
import PageNavigator from "../../../components/board/PageNavigator";
import useCustomFetch from "../../../hooks/useCustomFetch";
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

function MyPosts() {
  const tableHeaders = [
    "제목", "게시판", "날짜"
  ]
  const details = [
    { id:1, title: "알라딘 어떤거 같아?", musicalName: "익명 게시판", location: "2025-01-15 (수)"},
    { id:2, title: "알라딘 관람 후기", musicalName: "리뷰 게시판", location: "2025-01-05 (수)"},
    { id:3,  title: "실종", musicalName: "소극장 연극아", location: "2024-10-01 (화)"},
  ];
  
  const [postType] = useState("FOUND");
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
  },);

  console.log(data);
 
  const totalPages = data?.result?.totalPage || 1;

  return (
    <>
    {loading && <div>로딩 중...</div>}
      {error && <div>에러 발생: {error}</div>}
      {!loading && !error && (
        <>
          <PostList details={data?.result?.posts} headers={tableHeaders} cols={3} boardType='mypost'/>
          <PageNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      
    </>
  );
}

export default MyPosts;


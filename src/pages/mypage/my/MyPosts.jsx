import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostList from "../../../components/board/PostList";

function MyPosts() {
  const tableHeaders = [
    "제목", "게시판", "날짜"
  ]
  const details = [
    { id:1, name: "알라딘 어떤거 같아?", musical: "익명 게시판", place: "2025-01-15 (수)"},
    { id:2, name: "알라딘 관람 후기", musical: "리뷰 게시판", place: "2025-01-05 (수)"},
    { id:3,  name: "실종", musical: "소극장 연극아", place: "2024-10-01 (화)"},
  ];
  
  return (
    <>
      <h1>내가 쓴 글</h1>
      <PostList details={details} headers={tableHeaders} cols={3}/>
    </>
  );
}

export default MyPosts;


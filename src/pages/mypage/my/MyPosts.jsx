import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostList from "../../../components/board/PostList";

function MyPosts() {
  const tableHeaders = [
    "제목", "게시판", "날짜"
  ]
  const details = [
    { id:1, title: "알라딘 어떤거 같아?", musicalName: "익명 게시판", location: "2025-01-15 (수)"},
    { id:2, title: "알라딘 관람 후기", musicalName: "리뷰 게시판", location: "2025-01-05 (수)"},
    { id:3,  title: "실종", musicalName: "소극장 연극아", location: "2024-10-01 (화)"},
  ];
  
  return (
    <>
      <PostList details={details} headers={tableHeaders} cols={3}/>
    </>
  );
}

export default MyPosts;


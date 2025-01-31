import React from "react";
import styled from "styled-components";
import PostList from "../../../components/board/PostList";
import SearchBar from "../../../components/board/SearchBar";
import PostList2 from "../../../components/board/PostList2";
import musicalPic from "../../../assets/images/aladin-pic.png";
import useFetch from "../../../hooks/useFetch";
import { useState, useEffect } from "react";

const HotBoard = () => {
  const [postType] = useState("HOT");
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [url, setUrl] = useState("");

   const { data, error, loading } = useFetch(`http://13.209.69.125:8080/losts/?postType=${postType}&page=${page}`);

  const posts = [
    {
      id: 1,
      title: "알라딘 어떤 거 같아?",
      content: "방금 보고 왔는데 생각보다 재밌었음...",
      likes: 10,
      comments: 4,
      time: "방금",
      image: musicalPic,
    },
    {
      id: 2,
      title: "미아 파밀리아 후기",
      content: "노래도 좋고 무대 연출이 진짜 감동적이었음.",
      likes: 25,
      comments: 8,
      time: "1시간 전",
    },
    {
      id: 3,
      title: "뮤지컬 초보 추천해주세요",
      content: "뮤지컬을 처음 보려 하는데 어떤 걸 추천하시나요?",
      likes: 5,
      comments: 2,
      time: "2시간 전",
    },
  ];

  const details = data?.result?.postResultListDTO || [];

  if (!data || details.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  
  return (
    <>
      <Text>좋아요 10개를 받으면 HOT 게시물로 자동 선정됩니다.</Text>
      <ButtonWrapper>
      <SearchBar />
      </ButtonWrapper>
      <PostList2 posts={posts}/>
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
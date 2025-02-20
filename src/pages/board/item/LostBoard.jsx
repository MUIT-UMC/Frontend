import React from "react";
import styled from "styled-components";
import PostList from "../../../components/board/PostList";
import SearchContainer from './../../../components/board/SearchContainer';
import useFetch from '../../../hooks/useFetch';
import { useState } from "react";
import { useEffect } from "react";
import PageNavigator from "../../../components/board/PageNavigator";
import useCustomFetch from "../../../hooks/useCustomFetch";

const LostBoard = () => {
  
  const [postType] = useState("LOST");
  const [currentPage, setCurrentPage] = useState(0);
  const [size] = useState(5); // 한 페이지당 게시물 수
const [searchParams, setSearchParams] = useState({
    musicalName: "",
    lostDate: "",
    location: "",
    lostItem: "",
  });


  console.log("첫", currentPage);
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

  // const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
  const token = localStorage.getItem("accessToken");
  console.log(token);
  
  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

   console.log('데이터', data);
   console.log(error);
  const fieldsForFour = [
    { labelkor: '분실일', label: "lostDate", placeholder: "", type:"date"},
    { labelkor: '분실장소', label: "location", placeholder: "" },
    { labelkor: '분실물명', label: "lostItem", placeholder: "" },
    { labelkor: '뮤지컬명', label: "musicalName", placeholder: "" },
  ];
  const tableHeaders = ["분실물명", "뮤지컬명", "분실장소", "분실일"];

  const handleSearchChange = (label, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [label]: value, // 필드 값 업데이트
    }));
    setCurrentPage(0);
  };
  // API에서 받은 데이터와 상태 처리
   const totalPages = data?.result?.totalPage || 1; // 전체 페이지 수
  console.log(totalPages);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);


  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <>
    {/*
          <ButtonWrapper>
        <Button background="none" color="#A00000" marginBottom="8px">
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

export default LostBoard;

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
import React from "react";
import styled from "styled-components";
import PostList from "../../../components/board/PostList";
import SearchBar from "../../../components/board/SearchBar";
import SearchContainer from "../../../components/board/SearchContainer";
import { useState } from "react";
import PageNavigator from "../../../components/board/PageNavigator";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { useEffect } from "react";
const MusicalBoard = () => {
  
  const fieldsForTwo = [
    { label: "뮤지컬명", placeholder: "" },
    { label: "장소", placeholder: "" },
  ];
  const tableHeaders = [
    "제목", "뮤지컬명", "장소"
  ]
  
  const [postType] = useState("LOST");
  const [currentPage, setCurrentPage] = useState(0);
  const [size] = useState(20); // 한 페이지당 게시물 수
  console.log("첫", currentPage);

  const url = `/reviews/?postType=REVIEW&page=${currentPage}&size=20`;

  const { data, error, loading } = useCustomFetch(url);

  console.log('데이터', data);

  
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
      <SearchContainer fields={fieldsForTwo} />
      <PostList details={data.result.posts} headers={tableHeaders} cols={3}/>
      <PageNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
    </>
  );
};

export default MusicalBoard;

const BoardContainer = styled.div`
  margin: 100px 104px;
  display: grid;
  grid-template-columns: auto 1fr; /* 첫 번째 컬럼은 자동 크기, 두 번째 컬럼은 남은 공간을 차지 */
   grid-auto-rows: auto; /* 행 높이는 자동 크기 */
  column-gap: 112px; /* 컬럼 간의 간격 설정 */
`;

const BoardMenuWrapper = styled.div`
  align-self: start; /* 메뉴를 상단에 고정 (높이 늘어나지 않도록) */
`;



const BoardContent = styled.div`
  width: 100%;
`;

const BoardHeader = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  
  h1 {
    margin: 0;
  }
`;

const Button = styled.button`
 display: flex;
    width: 80px;
    height: 28px;
    padding: 5px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 3px;
    background: ${(props) => props.background ? props.background :'#A00000'};
    border: 1px solid var(--Muit-Red-main, #A00000);
    margin: 0px;
    margin-bottom: ${(props) => props.marginBottom? props.marginBottom : '0px' };

    color: ${(props) => props.color ? props.color : '#FFF' };

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;

`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  padding: 0;
  `

const PageNavigatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center;
  margin-top: 40px;
  
`

const Img = styled.img`
visibility: ${(props) => props.visibility ? props.visibility : 'visible'};
`

const PageNumber = styled.div`
  color: ${(props) => props.color ? props.color : '#919191'};
`

const NavItem = styled.div`
  color: ${(isActive) => isActive ? '#A00000' : '#919191'};
  font-weight: ${(isActive) => isActive ? '700' : '300'};
`

const Content = styled.div``

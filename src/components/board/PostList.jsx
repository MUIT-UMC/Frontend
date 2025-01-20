import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageNavigator from "./PageNavigator";

function PostList({ details, headers, cols }) {
  const navigate = useNavigate();
  

  const handleRowClick = (id) => {
    navigate(`/board/lost/${id}`); // 클릭 시 경로 이동
  };

  return (
    <>
    <PostListWrapper>
    <thead>
      <tr>
        {headers.map((name) => (
          <th>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {details.map((d) => {
        console.log(d); // 로그 찍기
        return (
          <tr key={d.id} onClick={() => handleRowClick(d.id)}>
            <td>{d.name}</td>
            <td>{d.musical}</td>
            <td>{d.place}</td>
            {
              d.date ? <td width="126px">{d.date}</td> : <></>
            }
          </tr>
        );
      })}
    </tbody>
    
  </PostListWrapper>
  <NavWrapper>
  <PageNavigator
    currentPage={4} // 현재 페이지
    totalPages={4} // 전체 페이지 수
    onPageChange={(page) => console.log(`Move to page: ${page}`)} // 페이지 변경 핸들러
  />
  </NavWrapper>
  </>
  )
}

export default PostList;

const PostListWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 32px;
  font-family: Pretendard, sans-serif;
  text-align: center;


  
  th, td {
    
    padding: 10px;
    width: ${(props) => props.width ? props.width : "auto"};
    
  }

  th {
    background: #F5F5F5;
    text-align: center;
    color: #757575;

    /* Body-bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    
  }
  td:nth-child(1) {
    text-align: left;
    padding-left: 50px;
  }
    th:nth-child(1) {
    text-align: left;
    padding-left: 94px;
  }

  td {
    color: #000;
    border-bottom: 1px solid #E6E6E6;
    padding-top: 18px;
    padding-bottom: 18px;

  /* Body-tiny-md */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  }

  tbody tr:hover {
    background-color: #F5F5F5;
    cursor: pointer;
  }
`;
const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`
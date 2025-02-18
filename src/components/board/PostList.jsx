import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import PageNavigator from "./PageNavigator";
function PostList({ details, headers, boardType }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴

  console.log(details);
  console.log(boardType);
  const getUrl = (id, postType) => {
    if (boardType === 'mypost') {
      console.log('포스트타입', postType);
      if (postType === "LOST") {
        return `/board/item/lost/${id}`;
      } 
      else if (postType === "FOUND") {
        return `/board/item/found/${id}`;
      } 
      else if (postType === "BLIND") {
        return `/board/anonymous/all/${id}`;
      } 
      else if (postType === "HOT") {
        return `/board/anonymous/hot/${id}`;
      } 
      else if (postType === "REVIEW") {
        return `/board/review/musical/${id}`;
      } 
      else if (postType === "SIGHT") {
        return `/board/review/seats/${id}`;
      }
    }
  
    return `${location.pathname}/${id}`; // 기본 URL
  };
  
  const handleRowClick = (id, postType) => {
    const url = getUrl(id, postType); 
    navigate(url);
  };
  
  
  const korPostType = {
    LOST: "분실물 게시판",
    FOUND: "분실물 게시판",
    BLIND: "익명 게시판",
    HOT: "익명 게시판",
    REVIEW: "리뷰 게시판",
    SIGHT: " 리뷰 게시판"
  }; 

  const korStatus = {
    AWAIT: "답변 대기중",
    COMPLETED: "답변 완료",
  }
  return (
    <>
      
      <PostListWrapper>
        <thead>
          <tr>
            {headers?.map((name) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {details?.map((d) => (
            <tr key={d.id} onClick={() => handleRowClick(d.id, d.postType)}>
              <td>{d.title}</td>
              {boardType=='mypost' && d.postType ? <td>{korPostType[d.postType] || d.postType}</td> : null}
              {boardType!=='mypost' && d.musicalName ? <td>{d.musicalName}</td> : null }
              {boardType!=='mypost' && d.location ? <td>{d.location}</td> : null }
              {boardType!=='mypost' && d.lostDate ? <td>{d.lostDate.split("T")[0]}</td> : null}
              {(boardType=='mypost' || boardType=='contact' )&& d.createdAt? <td>{d.createdAt.split("T")[0]}</td>: null}
              {d.status ? <td>{korStatus[d.status]}</td> : null }
            </tr>
          ))}
        </tbody>
      </PostListWrapper>

    </>
  );
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
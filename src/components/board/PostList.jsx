import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function PostList() {
  return (
  <>
    <PostListWrapper>
        <th>NO</th><th>분실물명</th><th>분실장소</th><th>분실일</th>
        <tr>
          <td width='64px'>5</td><td >아이폰 16 pro 화이트 티타늄</td><td width='180px'>링크아트센터드림 드림1관</td><td width="112px">2025.01.05</td>
        </tr>
        <tr>
          <td width='64px'>5</td><td >가방 (샤넬백)</td><td width='180px'>링크아트센터드림 드림1관</td><td width="112px">2025.01.05</td>
        </tr>
    </PostListWrapper>
  </>
  )
}

export default PostList;

const PostListWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Pretendard, sans-serif;
  text-align: center;
  margin-top: 32px;
  
  th, td {
    
    padding: 10px;
    width: ${(props) => props.width ? props.width : ""};
    
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
  td:nth-child(2) {
    text-align: left;
    padding-left: 50px;
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
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function PostList() {
  const navigate = useNavigate();
  
    const details = [
      { id:1, name: "아이폰 16 pro 화이트 티타늄", musical: "알라딘", place: "링크아트센터드림 드림1관", date: '2025.01.05'},
      { id:2, name: "가방 (샤넬백)", musical: "알라딘", place: "링크아트센터드림 드림1관", date: '2025.01.05'},
      { id:3,  name: "남성용 반지갑", musical: "미아 파밀리아", place: "링크아트센터드림 드림1관", date: '2025.01.05'},
      { id:4, name: "블랙야크 벙어리장갑", musical: "미아 파밀리아", place: "링크아트센터드림 드림1관", date: '2025.01.05'},
      { id:5, name: "아이폰 14프로", musical: "미아 파밀리아", place: "링크아트센터드림 드림1관", date: '2025.01.05'},
    ];

  const handleRowClick = (id) => {
    navigate(`/board/lost/${id}`); // 클릭 시 경로 이동
  };

  return (
    <PostListWrapper>
    <thead>
      <tr>
        <th>분실물명</th>
        <th>뮤지컬명</th>
        <th>분실장소</th>
        <th>분실일</th>
      </tr>
    </thead>
    <tbody>
      {details.map(({ id, name, musical, place, date }) => (
        <tr key={id} onClick={() => handleRowClick(id)}>
          <td>{name}</td>
          <td width="180px">{musical}</td>
          <td width="220px">{place}</td>
          <td width="126px">{date}</td>
        </tr>
      ))}
    </tbody>
  </PostListWrapper>
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
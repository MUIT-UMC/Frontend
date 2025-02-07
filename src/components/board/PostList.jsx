import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import PageNavigator from "./PageNavigator";
function PostList({ details, headers }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴


  const handleRowClick = (id) => {
    navigate(`${location.pathname}/${id}`);
  };

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
            <tr key={d.id} onClick={() => handleRowClick(d.id)}>
              <td>{d.title}</td>
              {d.musicalName ? <td>{d.musicalName}</td> : null }
              {d.location ? <td>{d.location}</td> : null }
              {d.lostDate ? <td>{d.lostDate.split("T")[0]}</td> : null}
              {d.status ? <td>{d.status}</td> : null }
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

import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import SearchBar from "../components/vision/SearchBar";
import background from '../assets/images/searchpage.png'
import Search from '../assets/icons/Search.svg'

function Vision() {
  return (
    <Container>
      <h2>어느 <span className="color-txt">공연장</span>이 궁금하세요?</h2>
      <SearchBar/>
    </Container>
  );
}

const Container = styled.div`
    box-sizing: border-box;
    height: 864px;

    font-family: Pretendard;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top:100px;
    gap: 140px;
    h2{
      font-size: 24px;
    }
    .color-txt{
      color: #A00000;
    }

    background-image: linear-gradient(rgba(255, 255, 255) 50%, rgba(255, 255, 255, 0.5)), url(${background});
    background-size: cover;
`


export default Vision;

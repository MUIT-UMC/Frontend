import React from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/icons/Search2.svg"; // 파일 직접 불러오기
import { useState } from "react";
import useCustomFetch from "../../hooks/useCustomFetch";
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

const MusicalIdSearchItem = ({data}) => {



  return (
  <>
    <Wrapper>
      <Img src={data.posterUrl} />
      <TextWrapper>
      <div>{data.name}</div>
      <div>{data.place}</div>
      <div>{data.duration}</div>
      </TextWrapper>
    </Wrapper>
  </>
  );
};

export default MusicalIdSearchItem;

const Wrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 8px;
`

const Img = styled.img`
  height: 100px;
`

const TextWrapper = styled.div`
  
 div {
 color: #000;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
}
div:nth-child(1) {
  font-weight: 700;
  font-size: 18px;
}
`
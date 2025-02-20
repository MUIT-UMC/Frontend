import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Performance({ data }) {
  console.log('퍼포먼스', data);

  return (
    
    <>
     {data?.result?.desImgUrl[0] ? (
        <Img src={data?.result?.desImgUrl[0]} />
      ) : (
        <div>공연정보가 없습니다.</div>
      )
    }
   </>
    
  );
}

export default Performance;

const Img = styled.img`
  max-width: 800px;
`
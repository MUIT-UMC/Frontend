import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Performance({ data }) {
  console.log('퍼포먼스', data);

  return (
    
    <>
      <img src={data?.result?.desImgUrl[0]} />
   </>
    
  );
}

export default Performance;

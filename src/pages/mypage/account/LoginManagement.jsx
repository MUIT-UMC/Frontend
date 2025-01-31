import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Authenticate from "../../../components/mypage/account/Authenticate";

function LoginManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Container>
      {isAuthenticated ? (
        <>
          <h1>로그인 관리하기</h1>
        </>
      ):(
        <Authenticate setIsAuthenticated={setIsAuthenticated} /> 
      )}

    </Container>
  );
}

const Container = styled.div`

`
const AuthArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  .Title{
    font-size: 16px;
    font-weight: 500;
    color: #000000;
  }
  .colored{
    color: #A00000;
  }


  .Authorize{
    display: flex;
    flex-direction: column;
    align-items: center;  
    gap: 80px;
  }
`;


export default LoginManagement;

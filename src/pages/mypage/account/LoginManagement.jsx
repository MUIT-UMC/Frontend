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
  font-family: Pretendard;
  padding: 16px 0px;
`


export default LoginManagement;

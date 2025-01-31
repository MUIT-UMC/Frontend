import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Authenticate from "../../../components/mypage/account/Authenticate";

function AddressManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Container>
      {isAuthenticated ? (
        <>
        
        </>
      ) : (
        <Authenticate setIsAuthenticated={setIsAuthenticated} /> 
      )}
    </Container>
  );
}

const Container = styled.div`
  font-family: Pretendard;
  padding: 16px 0px;
  
`

export default AddressManagement;
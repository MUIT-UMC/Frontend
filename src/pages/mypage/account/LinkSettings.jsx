import React, { useState } from "react";
import styled from "styled-components";
import Authenticate from "../../../components/mypage/account/Authenticate";

import Google from '../../../assets/logos/google.png';
import Kakao from '../../../assets/logos/kakao.png';
import Naver from '../../../assets/logos/naver.png';

function LinkSettings() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ 연결 여부를 관리하는 상태
  const [linkedAccounts, setLinkedAccounts] = useState({
    kakao: false,
    google: false,
    naver: false
  });

  // ✅ 버튼 클릭 시 연결 여부 토글
  const toggleLink = (account) => {
    setLinkedAccounts((prev) => ({
      ...prev,
      [account]: !prev[account] // true <-> false 변경
    }));
  };

  return (
    <Container>
      {isAuthenticated ? (
        <>
          <AccountLink>
            <div className="Social">
              <img src={Kakao} className="logo"/>
              <h3>카카오</h3>
            </div>
            <StyledButton 
              isLinked={linkedAccounts.kakao} 
              onClick={() => toggleLink("kakao")}
            >
              {linkedAccounts.kakao ? "해제" : "연결"}
            </StyledButton>
          </AccountLink>
          
          <AccountLink>
            <div className="Social">
              <img src={Naver} className="logo"/>
              <h3>네이버</h3>
            </div>
            <StyledButton 
              isLinked={linkedAccounts.naver} 
              onClick={() => toggleLink("naver")}
            >
              {linkedAccounts.naver ? "해제" : "연결"}
            </StyledButton>
          </AccountLink>

          <AccountLink>
            <div className="Social">
              <img src={Google} className="logo" style={{border: '1px solid #E6E6E6'}}/>
              <h3>구글</h3>
            </div>
            <StyledButton 
              isLinked={linkedAccounts.google} 
              onClick={() => toggleLink("google")}
            >
              {linkedAccounts.google ? "해제" : "연결"}
            </StyledButton>
          </AccountLink>

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

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AccountLink = styled.div`
  box-sizing: border-box;
  width: 820px;
  height: 60px;
  padding: 12px 20px;
  border: 1px solid #E6E6E6;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .Social {
    display: flex;
    align-items: center;
    gap: 20px;

    font-size: 16px;
    font-weight: 700;
  }

  .logo {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
`;
const StyledButton = styled.button`
  width: 72px;
  height: 28px;
  border-radius: 3px;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  
  cursor: pointer;

  background-color: ${(props) => (props.isLinked ? "#FFF" : "#A00000")};
  color: ${(props) => (props.isLinked ? "#A00000" : "#FFF")};
  border: 1px solid ${(props) => (props.isLinked ? "#A00000" : "#A00000")};
`;

export default LinkSettings;


import React, { useState } from "react";
import styled from "styled-components";

import SeePassword from "../../../assets/icons/SeePassword.svg";

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

export default function AdminMypage() {

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShow = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirm = () => {
    console.log("입력된 비밀번호:", password);
    // 임시
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <Wrapper>  
        <Header>비밀번호 인증</Header>
        <Line />

        <Description>
            정보를 안전하게 보호하기 위해 <br />
            <Highlight style={{color: COLOR_MUIT_RED}}>비밀번호를 다시 한 번 확인</Highlight>합니다.
        </Description>

        <InputRow>
            <Label>비밀번호</Label>
            <PasswordWrapper>
            <PasswordInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 인증"
                onKeyDown={handleKeyDown}
            />
            <EyeIcon onClick={handleToggleShow}>
                <img src={SeePassword} alt="SeePassword"/>
            </EyeIcon>
            </PasswordWrapper>
        </InputRow>
        <ConfirmButton onClick={handleConfirm}>확인 &gt;</ConfirmButton>
      </Wrapper>  
    </Container>
  );
}

/* ───────── styled components ───────── */

const Container = styled.div`
  position: relative;
  width:  1150px;
  height: 916px;
  background-color: #fff;
  padding-left: 71px;
  padding-right:  131px;
  box-sizing: border-box;

  display:  flex;
  flex-direction:  column;
  justify-content:  flex-start;
  align-items:  flex-start;
`;

const Title = styled.div`
  margin-top: 4px;
  font-family:  "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color:  ${COLOR_MUIT_RED};
`;

const Wrapper = styled.div`
  width: 820px; 
  height: 393px;
  margin-left: 54px;
  margin-top:  204px;
  border: 1px solid ${COLOR_GRAY_MAINTEXT};
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-family:  "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color:  ${COLOR_GRAY_MAINTEXT};
  margin-top: 16px;
  margin-left: 22px;
`;

const Line = styled.hr`
  align-self: center;
  width: 776px;
  border: none;
  border-top: 1px solid ${COLOR_GRAY_MAINTEXT};
  margin-top: 15px;
`;

const Description = styled.div`
  align-self: center;
  margin-top: 40px;
  font-family:  "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color:  ${COLOR_GRAY_MAINTEXT};
  text-align: center;
`;

const Highlight = styled.span`

`;

const InputRow = styled.div`
  margin-top: 100px;
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
`;

const Label = styled.div`
  margin-left: 183px;
  font-family:  "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color:  ${COLOR_GRAY_MAINTEXT};
`;

const PasswordWrapper = styled.div`
  width: 352px;
  height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${COLOR_GRAY_MAINTEXT};
`;

const PasswordInput = styled.input`
  width: 300px;
  padding-left: 8px;
  font-family:  "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color:  ${COLOR_GRAY_MAINTEXT};  
  box-sizing: border-box;
  border: none;
  outline: none;
`;

const EyeIcon = styled.span`
  margin-right: 8px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ConfirmButton = styled.button`
  width: 55px;
  margin-top: 16px;
  margin-left: 560px;
  font-family:  "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color:  ${COLOR_GRAY_UNSELECTED}; 
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${COLOR_GRAY_MAINTEXT};
  }
`;
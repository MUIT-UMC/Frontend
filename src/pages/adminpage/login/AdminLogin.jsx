
import React, { useState }  from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SeePassword from "../../../assets/icons/SeePassword.svg";

// 색상
const COLOR_MUIT_RED = "#A00000";

const AdminLogin = () => {

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

   // 로그인 버튼 핸들러
   const handleLogin = () => {
    // 임시 로직: ID=1, PW=1이면 로그인 성공
    if (adminId === "1" && password === "1") {
      // localStorage에 토큰 저장
      localStorage.setItem("adminToken", "FAKE_TOKEN");
      // 새로고침 등으로 AdminLayout이 다시 그려져서 모달 사라짐
      window.location.reload();
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <LoginContainer>
      <ContentWrapper>
        <LogoLink>MUIT</LogoLink>

        {/* 로그인 폼 */}
        <LoginForm>
          <Input>
            {/* 단순 input, 기능 로직 제거 */}
            <input 
            type="text" 
            placeholder="관리자 아이디" 
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            />
          </Input>

          <Input>
            <input 
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {/* UI만 */}
            <img src={SeePassword} alt="Show Password" />
          </Input>
        </LoginForm>

        <OptionArea>
          <div className="keepLogin">
            <input type="checkbox" className="LoginCheck" id="LoginCheck" />
            <label htmlFor="LoginCheck">로그인 상태 유지</label>
          </div>

          <FindInfo>
            <span>아이디 찾기</span>
            <span> | </span>
            <span>비밀번호 찾기</span>
          </FindInfo>
        </OptionArea>

        <BtnArea>
          <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
          <SignUpBtn>회원가입</SignUpBtn>
        </BtnArea>
      </ContentWrapper>
    </LoginContainer>
  );
};

export default AdminLogin;

/* ----------------- Styled Components ----------------- */

const LoginContainer = styled.div`
  margin-left: -290px;
  width: 1440px;
  height: 916px;
  position: absolute;
  top:  108px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  font-family: "BelgianoSerif";
  font-size: 80px;
  font-weight: 400;
  color: ${COLOR_MUIT_RED};
  margin-bottom: 40px;
  cursor: pointer;
`;

const LoginForm = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 500px;
  height: 60px;

  border: 1px solid #c1c1c1;
  border-radius: 3px;
  background: #fff;

  padding: 8px 20px;

  input::placeholder {
    color: #919191;
  }
  input {
    border: none;
    flex: 1;

    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
  }
  input:focus {
    outline: none;
  }

  img {
    cursor: pointer;
  }
`;

const OptionArea = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #989898;
  font-size: 14px;
  font-weight: 500;

  .keepLogin {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .LoginCheck {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid #898989;
  }
  .LoginCheck:checked {
    background: ${COLOR_MUIT_RED};
    border: none;
  }
`;

const FindInfo = styled.div``;

const BtnArea = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginBtn = styled.button`
  box-sizing: border-box;
  width: 400px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #a00000;
  background: #a00000;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const SignUpBtn = styled.button`
  box-sizing: border-box;
  width: 400px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;


import React, { useState }  from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SeePassword from "../../../assets/icons/SeePassword.svg";

// 색상
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;

const AdminLogin = () => {

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleToggleShow = () => {
    setShowPassword((prev) => !prev);
  };

  // 로그인 버튼 핸들러
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/admin/login`,
        {
          email: adminId, 
          pw: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 전송
          },
        }
      );
      // 로그인 응답 처리
      if (response.data.isSuccess) {
        // 로그인 성공
        localStorage.setItem("adminToken", response.data.result.accessToken);
        window.location.reload();
      } else {
        // 로그인 실패
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <LoginContainer>
      <ContentWrapper>
        <LogoLink>MUIT</LogoLink>

        {/* 로그인 폼 */}
        <LoginForm>
          <Input>
            <input 
            type="text" 
            placeholder="관리자 아이디" 
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            onKeyDown={handleKeyDown}
            />
          </Input>

          <Input>
            <input 
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <EyeIcon onClick={handleToggleShow}>
                <img src={SeePassword} alt="SeePassword"/>
            </EyeIcon>
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
`;

const EyeIcon = styled.span`
  margin-right: 8px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const OptionArea = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLOR_GRAY_MAINTEXT};
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
    border: 1px solid ${COLOR_GRAY_MAINTEXT};
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
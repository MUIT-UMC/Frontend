import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

function EditAccount() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태 관리
  const [password, setPassword] = useState("");

  const navigate = useNavigate;
  const GoBack = () => {
    navigate(-1);
  };
  const handleAuthentication = () => {
    // 실제 API 호출로 변경 필요
    setIsAuthenticated(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Container>
          <InputArea>
            <p className="body-B-600">이름</p>
            <Input>
              <input />
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600">아이디</p>
            <Input>
              <input />
              <EditButton>수정</EditButton>
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600">이메일</p>
            <Input>
              <input />
              <EditButton>수정</EditButton>
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600">휴대폰</p>
            <Input>
              <input />
              <EditButton>수정</EditButton>
            </Input>
          </InputArea>

        </Container>) : (
        <AuthArea>
          <p className="Title">정보를 안전하게 보호하기 위해 <span className="colored">비밀번호를 다시 한 번 확인</span>합니다.</p>

          <div className="Authorize">
            <InputArea2>
              <label>현재 비밀번호</label>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputArea2>

            <BtnArea2>
              <button onClick={handleAuthentication}
                className="check"
                disabled={!password}>확인</button>
              <button onClick={GoBack} className="previous">이전</button>
            </BtnArea2>

          </div>

        </AuthArea>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-family: Pretendard;

  padding-top: 60px;
`
const InputArea = styled.div`
  display: flex;
  gap: 64px;

  .body-B-600{
    width: 64px;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  position: relative;
`
const Input = styled.div`
  display: flex;
  justify-content: space-between;

  height: 32px;
  width: 716px;

  border-style:none;
  border-bottom:solid 1px #E6E6E6;
  outline: none;

  input{
    border: none;
    flex: 1;

    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
  }
  input::placeholder{
    color: #919191;
    /* Body-tiny-md */
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  input:focus{
    outline : none;
  }

`
const EditButton = styled.button`
  width: 73px;
  height: 28px;
  padding: 4px 12px;
  align-items: center;

  border-radius: 2px;
  border: 1px solid #919191;
  background: #FFF;

  color: #919191;
  /* Body-tiny-md */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`
const AuthArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  .Authorize{
    display: flex;
    flex-direction: column;
    align-items: center;  
    gap: 80px;
  }
`;
const InputArea2 = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;

  label {
    color: #000;
    text-align: center;
    /* Body-bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  
  input {
    width: 400px;
    height: 40px;
    padding: 8px 20px;
    align-items: center;
    border-radius: 3px;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: #FFF;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
  
  input::placeholder{
    color: var(--Gray-sub, #919191);
  }
`;
const BtnArea2 =styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  button{
    display: flex;
    width: 400px;
    height: 40px;
    padding: 8px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;

    /* Body-bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  
  .check{
    color: #FFF;
    border: 1px solid var(--Muit-Red-main, #A00000);
    background: var(--Muit-Red-main, #A00000);
  }
  .check:disabled{
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-sub, #919191);
  }
  .previous{
    color: #000;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: var(--Gray-white-bg, #FFF);
  }
`

export default EditAccount;

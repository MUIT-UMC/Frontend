import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Authenticate({ setIsAuthenticated }) {
    const [password, setPassword] = useState("");
    const handleAuthentication = () => {
        // 실제 API 호출로 변경 필요
        setIsAuthenticated(true);
    };

    const navigate = useNavigate();
    const GoBack = () => {
        navigate(-1);
    };
    
    return (
        <AuthArea>
          <p className="Title">정보를 안전하게 보호하기 위해 <span className="colored">비밀번호를 다시 한 번 확인</span>합니다.</p>
          
          <div className="Authorize">
            <InputArea>
              <label>현재 비밀번호</label>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputArea>

            <BtnArea>
              <button onClick={handleAuthentication}
              className="check"
              disabled={!password}>확인</button>
              <button onClick={GoBack} className="previous">이전</button>
            </BtnArea>

          </div>

        </AuthArea>
    )
};

const AuthArea = styled.div`
  font-family: Pretendard;

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

const InputArea = styled.div`
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

const BtnArea =styled.div`
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

export default Authenticate;
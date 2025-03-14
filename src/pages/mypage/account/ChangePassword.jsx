import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch from "../../../hooks/fetchWithAxios";
import Authenticate from "../../../components/mypage/account/Authenticate";
import SeePassword from "../../../assets/icons/SeePassword.svg"

function ChangePassword() {
  const { fetchData } = useCustomFetch();
  const memberId = localStorage.getItem("userId");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태 관리
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const GoBack = () => {
    navigate(-1);
  };

  
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("비밀번호를 다시 확인해 주십시오.");
      return;
    }
    const response = await fetchData(`/member/${memberId}/changePassword`, 'PATCH', { 
      newPassword: newPassword,
      newPasswordConfirm : confirmPassword });
    if (response?.isSuccess){
      alert("비밀번호가 성공적으로 변경되었습니다.");
      GoBack();
    }
    console.log("응답:", response);
  };

  const [isShowPWChecked, setIsShowPWChecked] = useState(false);
  const handleShowPWChecked = async() => {
    setIsShowPWChecked(!isShowPWChecked);
  };

  return (
    <Container>
      {isAuthenticated ? (
        <ChangePasswordArea>
          <p className="Title">주기적인 비밀번호 변경을 통해 개인정보를 안전하게 보호하세요.</p>

          <div className="setNewPassword">
            <InputArea>
              <p className="body-B-600">비밀번호</p>
              <Input>
                <input
                type={isShowPWChecked ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}/>
                <img src={SeePassword} onClick={handleShowPWChecked} />
              </Input>
            </InputArea>

            <InputArea>
              <p className="body-B-600">비밀번호 확인</p>
              <Input>
                <input
                type={isShowPWChecked ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                <img src={SeePassword} onClick={handleShowPWChecked} />
              </Input>
            </InputArea>
          </div>

          
          <BtnArea>
            <button onClick={GoBack} className="previous">이전</button>
            <button onClick={handleChangePassword}
            className="confirm"
            disabled={!newPassword || !confirmPassword}
            >변경</button>
          </BtnArea>

        </ChangePasswordArea>
      ) : (
        <Authenticate setIsAuthenticated={setIsAuthenticated} /> 
      )}
    </Container>
  );
}

export default ChangePassword;

const Container = styled.div`
  font-family: Pretendard;
  padding: 16px 0px;
`;
const ChangePasswordArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  .setNewPassword{
    display: flex;
    flex-direction: column;
    gap: 44px;
  }
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  p{margin: 0px;}

  .body-B-600{
    width: 98px;

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
const BtnArea = styled.div`
  display: flex;
  gap: 20px;

  padding-top: 100px;

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

  .confirm{
    color: #FFF;
    border: 1px solid var(--Muit-Red-main, #A00000);
    background: var(--Muit-Red-main, #A00000);
  }
  .confirm:disabled{
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-sub, #919191);
  }

  .previous{
    color: #000;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: var(--Gray-white-bg, #FFF);
  }  
`

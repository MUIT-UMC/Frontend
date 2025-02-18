import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch from "../../../../hooks/fetchWithAxios";

function EditField() {
  const { fetchData } = useCustomFetch();
  const memberId = localStorage.getItem("userId");
  const { field } = useParams();
  const [inputValue, setInputValue] = useState("");

  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const sendVerificationCode = async () => {
    try {
        const email = inputValue;
        if (!email) {
            alert('이메일을 입력해주세요.');
            return;
        }
        const response = fetchData('/sendCode', 'POST', { email });
        setShowVerification(true);
        alert('인증번호가 전송되었습니다.');
        //console.log(response?.message);
    } catch (error) {
        alert('인증번호 전송에 실패했습니다.');
        console.log(error);
    }
};
  const verifyCode = async () => {
    try {
        const email = inputValue;
        const [username, domain] = email.split("@");
        const url = `/verify?email=${username}%40${domain}&code=${verificationCode}`
        
        if (!verificationCode) {
            alert('인증번호를 입력해주세요.');
            return;
        }
        const response = await fetchData(url, 'POST', { 
            email, 
            code: String(verificationCode) }
        );
        console.log('response:', response);

        if (response?.isSuccess) {
            alert('이메일 인증이 완료되었습니다.');
            setIsVerified(true);
        } else {
            alert(response?.message);
        }
    } catch (error) {
        console.error("이메일 인증 실패:", error);
        alert('이메일 인증에 실패했습니다.');
    }
  };
  const handleVerificationChange = (e) => setVerificationCode(e.target.value);

  const navigate = useNavigate();
  const GoBack = () => {
    navigate(-1);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const changeInfo = () => {
    if(!inputValue.trim()){
      alert("값을 입력해주세요.");
      return;
    }

    let requestData = {};

    if (field === "Username") {
        requestData = { newUsername: inputValue };
    } else if (field === "Email") {
        verifyCode();
        if(isVerified){
          requestData = { email: inputValue };
        }
    } else if (field === "Phone") {
        requestData = { newPhoneNumber: inputValue };
    }

    fetchData(`/member/${memberId}/change${field}`, 'PATCH', requestData);
    console.log(requestData);
    alert('변경이 완료되었습니다.');
    navigate(-1);
  }


  return (
    <Container>
      {field === 'Username' && <>
        <h3>변경할 아이디를 입력하세요</h3>
        <InputArea>
          <p className="body-B-600">아이디</p>
          <Input>
            <input value={inputValue} onChange={handleInputChange} />
          </Input>
        </InputArea>
      </>}

      {field === 'Email' && <>
        <h3>이메일 변경을 위해 인증이 필요합니다</h3>
        <InputArea>
          <p className="body-B-600">이메일</p>
          <Input>
            <input value={inputValue} onChange={handleInputChange} />
            <button
            className='passkey-btn'
            disabled={!inputValue.trim()}
            onClick={sendVerificationCode}
            >인증번호 받기</button>
          </Input>
        </InputArea>
        
        {showVerification && (
            <InputArea>
              <p className="body-B-600">인증번호</p>
              <Input>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={handleVerificationChange}
                  placeholder="인증번호 8자리 입력"
                />
              </Input>
            </InputArea>
          )}
      </>}

      {field === 'Phone' && <>
        <h3>변경 휴대폰 번호를 입력하세요</h3>
        <InputArea>
          <p className="body-B-600">휴대폰</p>
          <Input>
            <input value={inputValue} onChange={handleInputChange} />
          </Input>
        </InputArea>
      </>}
      <BtnArea>
            <button
            onClick={GoBack}
            className="previous"> 이전</button>
            <button
            onClick={changeInfo}
            className='confirm'
            disabled={!inputValue}
            >수정</button>
      </BtnArea>
    </Container> 
  );
}

export default EditField;

const Container = styled.div`
  font-family: Pretendard;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3{
    //styleName: Body-me;
    font-size: 16px;
    font-weight: 500;
  }
`;
const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;

  .body-B-600{
    width: 60px;

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

  .passkey-btn{
    font-family: Pretendard;
    margin-bottom: 4px;
    height: 28px;    
    display: flex;
    padding: 4px 12px;
    align-items: center;
    border-radius: 2px; 
    background: var(--Gray-white-bg, #FFF);
    /* Body-tiny-md */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;

    color: #A00000;
    border: 1px solid var(--Gray-sub, #A00000);
  }

  .passkey-btn:disabled{
    border: 1px solid var(--Gray-sub, #919191);
    color: #919191;
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

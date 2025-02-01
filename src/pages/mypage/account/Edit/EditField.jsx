import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function EditField() {
  const { field } = useParams();
  const [inputValue, setInputValue] = useState("");

  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const handleVerificationChange = (e) => setVerificationCode(e.target.value);
  const handleRequestVerification = () => {
    if (inputValue.trim()) {
      setShowVerification(true); // 인증번호 입력 필드
    }
  };

  const navigate = useNavigate();
  const GoBack = () => {
    navigate(-1);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleChangeInfo = () => {
    if (!inputValue.trim()) {
      alert("값을 입력해주세요!");
      return;
    }
    
    // 실제 변경 API 요청을 보낼 수 있음
    console.log(`변경된 ${field}:`, inputValue);

    // 예시: 변경 완료 후 이전 페이지로 이동
    alert(`${field}가 성공적으로 변경되었습니다!`);
    navigate(-1);
  };


  return (
    <Container>
      {field === 'id' && <>
        <h3>변경할 아이디를 입력하세요</h3>
        <InputArea>
          <p className="body-B-600">아이디</p>
          <Input>
            <input value={inputValue} onChange={handleInputChange} />
          </Input>
        </InputArea>
      </>}
      {field === 'email' && <>
        <h3>이메일 변경을 위해 인증이 필요합니다</h3>
        <InputArea>
          <p className="body-B-600">이메일</p>
          <Input>
            <input value={inputValue} onChange={handleInputChange} />
            <button
            className='passkey-btn'
            disabled={!inputValue.trim()}
            onClick={handleRequestVerification}
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
      {field === 'phone' && <>
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
            onClick={handleChangeInfo}
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

import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AccountDeletion() {

  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCancelClick = () => {
    const currentUrl = window.location.pathname; // 현재 URL 가져오기
    navigate(currentUrl + '/complete'); // '/cancel'을 URL 뒤에 추가하여 이동
  };

  return (
    <Wrapper>
      <Title>회원 탈퇴</Title>
      <Text mb='20px'>계정을 삭제하려면 현재 사용중인 비밀번호를 입력하세요</Text>
      
        <InputArea>
          <p className="body-B-600">비밀번호</p>
          <Input>
            <input
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </Input>
        </InputArea>

      <Text fontWeight='700' mt='40px' mb='24px'>계정 삭제시 모든 정보가 삭제되며 복구 불가능합니다</Text>
      <AgreeText>
      <Checkbox 
          type="checkbox" 
          checked={isChecked} 
          onChange={() => setIsChecked(!isChecked)} 
        />동의합니다.
      </AgreeText>
      <ButtonWrapper>
        <CancelButton disabled={!isChecked} onClick={handleCancelClick}>탈퇴하기</CancelButton>
        <Button>취소</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default AccountDeletion;

const Wrapper = styled.div`
  margin: 170px 382px;

`
const Title = styled.div`
  color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 16px;
`

const Text = styled.div`
color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: ${(props) => props.fontWeight ? props.fontWeight : '500'};
line-height: 25px; /* 156.25% */
margin-bottom: ${(props) => props.mb ? props.mb : '0px'};
margin-top: ${(props) => props.mt ? props.mt : '0px'};
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items:center;

  margin-top: 60px;
   button {
    
  }
`
const Button = styled.button`
  display: flex;
    width: 400px;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 3px;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: ${(props) => props.color || '#FFF'};

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const CancelButton = styled.button`
  display: flex;
  width: 400px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
  border: 1px solid var(--Muit-Red-main, #A00000);
  background: var(--Muit-Red-main, #A00000);
color: #FFF;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease;
  
  &:disabled {
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-sub, #919191);
    cursor: not-allowed;
  }
`;


const AgreeText = styled.div`
color: var(--Gray-maintext, #000);

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
display: flex;
  align-items: center; /* 세로 정렬 */
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Muit-Red-main, #A00000);
  margin-right: 10px;

  &:checked {
    background-color: var(--Muit-Red-main, #A00000);
    border-color: var(--Muit-Red-main, #A00000);
  }

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
color: #000;
text-align: center;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;

`

const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 60px;
  margin-bottom: 40px;
  p {margin: 0px;}

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

  height: 39px;
  width: 380px;
  padding-left: 20px;

  border-style:none;
  border:solid 1px #E6E6E6;
  border-radius: 3px;
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
    margin-left: 20px;
  }
  input:focus{
    outline : none;
  }
`
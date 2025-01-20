import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function EditAccount() {
  return (
    <Container>
      <InputArea>
        <p className="body-B-600">이름</p>
        <Input/>
      </InputArea>
      <InputArea>
        <p className="body-B-600">아이디</p>
        <Input/>
        <EditButton>수정</EditButton>
      </InputArea>
      <InputArea>
        <p className="body-B-600">이메일</p>
        <Input/>
        <EditButton>수정</EditButton>
      </InputArea>
      <InputArea>
        <p className="body-B-600">휴대폰</p>
        <Input/>
        <EditButton>수정</EditButton>
      </InputArea>
    </Container>
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
const Input = styled.input`
  height: 24px;
  width: 716px;

  border-style:none;
  border-bottom:solid 1px #E6E6E6;
  outline: none;
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

  position: absolute;
  right: 0%;
  bottom: 60%;
`

export default EditAccount;

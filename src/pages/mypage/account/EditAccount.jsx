import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useCustomFetch from "../../../hooks/fetchWithAxios";

import Authenticate from "../../../components/mypage/account/Authenticate";

function EditAccount() {
  const memberId = localStorage.getItem("userId");
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const GoBack = () => {
    navigate(-1);
  };
  const handleEdit = (field) => {
    navigate(`/mypage/account/edit/${field}`);
  }

  const {data: info, error, loading} = useCustomFetch(`/member/${memberId}`);
  console.log(info?.result);

  return (
    <Container>
      {isAuthenticated ? (
        <div>
          <InputArea>
            <p className="body-B-600">이름</p>
            <Input>
              <p>{info?.result?.name}</p>
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600">아이디</p>
            <Input>
              <p>{info?.result?.username}</p>
              <EditButton onClick={() => handleEdit("Username")}>수정</EditButton>
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600">이메일</p>
            <Input>
              <p>{info?.result?.email}</p>
              <EditButton onClick={() => handleEdit("Email")}>수정</EditButton>
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600">휴대폰</p>
            <Input>
            <p>{info?.result?.phone}</p>
              <EditButton onClick={() => handleEdit("Phone")}>수정</EditButton>
            </Input>
          </InputArea>
        </div>

        ) : (
          <Authenticate setIsAuthenticated={setIsAuthenticated} /> 
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  padding: 16px 0px;
`
const InputArea = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;

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
  align-items: center;

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

export default EditAccount;

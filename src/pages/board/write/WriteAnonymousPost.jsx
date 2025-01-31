import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WriteAnonymousPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(title.trim() && content.trim()));
  }, [title, content]);

  const handleSubmit = async () => {
    const postData = new FormData();
    const postRequestDTO = {
      memberId: 1, // 실제 회원 ID로 변경
      isAnonymous: true,
      title: title.trim(),
      content: content.trim(),
    };

    postData.append(
      "postRequestDTO",
      new Blob([JSON.stringify(postRequestDTO)], { type: "application/json" })
    ); 

    try {
      const response = await axios.post(
        "http://13.209.69.125:8080/posts/",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("게시글이 성공적으로 등록되었습니다!");
      console.log(response.data);
      navigate("/board/anonymous/all"); // 게시글 등록 후 이동
    } catch (error) {
      alert("게시글 등록 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <WritePostContainer>
      <InputWrapper>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          disabled={isButtonDisabled}
          onClick={isButtonDisabled ? undefined : handleSubmit}
        >
          등록
        </Button>
      </InputWrapper>
      <Text>익명 게시판</Text>
      <Hr marginTop="20px" marginBottom="36px" />
      <ContentWrapper>
        <TextArea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ContentWrapper>
    </WritePostContainer>
  );
}

export default WriteAnonymousPost;
const WritePostContainer = styled.div`
  margin: 86px 100px;
`;

const Hr = styled.hr`
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  margin-top: ${(props) => props.marginTop || "0px"};
  border: 0;
  border-top: 1px solid var(--Gray-outline, #E6E6E6);
`;

const InputWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  gap: 10px;

 
`;

const Button = styled.div`
    display: flex;
    width: 80px;
    height: 28px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: ${({ disabled }) => disabled ? "#919191" : "#A00000"};
    border: none;
    color: ${({ disabled }) => (disabled ? "#FFF" : "#FFF")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    transition: all 0.3s ease;
`
const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 4px;
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;

  &:focus {
    outline: none;
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 40px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 600px;
  padding: 0px;
  border: none;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
  color: #000;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  color: var(--Gray-sub, #919191);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;
const FileInputWrapper = styled.div`
  margin-top: 16px;
`;
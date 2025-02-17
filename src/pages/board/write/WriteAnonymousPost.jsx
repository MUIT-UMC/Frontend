import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Camera from "../../../assets/icons/Camera.svg";
// const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");
console.log(token);
const muit_server = import.meta.env.VITE_APP_SERVER_URL;

function WriteAnonymousPost() {

  const navigate = useNavigate();

  // useState
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgFiles, setImgFiles] = useState([]); // 이미지 배열 

  // 업로드 버튼 비활성화 처리 
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(title.trim() && content.trim()));
  }, [title, content]);

  // 업로드할 사진 선택 & 미리보기 
  const handleImageChange = (e) => {
    setImgFiles(Array.from(e.target.files)); // 여러 파일 선택 가능
    console.log('이미지파일스 미리보기', imgFiles[0]);
  };
  const previewImage = imgFiles.length > 0 ? URL.createObjectURL(imgFiles[0]) : null;

  // 글 업로드하기 
  const handleSubmit = async () => {
    
    const postData = new FormData();

    // FormData에 JSON 데이터를 추가하기
    postData.append("postRequestDTO", JSON.stringify({
      memberId: 1, // 실제 회원 ID로 변경
      isAnonymous: true,
      title: title.trim(),
      content: content.trim(),
    }));
  
    // 이미지 파일이 있다면 FormData에 추가하기
    for (let i = 0; i < imgFiles.length; i++) { 
        postData.append("imageFiles", imgFiles[i]);
      }
  
    try {
      const response = await axios.post(
        `${muit_server}/posts`,
        postData, // FormData 전송
        {
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data", // multipart/form-data로 전송
          },
        }
      );
      alert("게시글이 성공적으로 등록되었습니다!");
      console.log(response.data);
      navigate(`/board/anonymous/all/${response.data.result.id}`); // 게시글 등록 후 이동
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
      <Hr marginTop="20px" marginBottom="16px" />

      
      
      <ContentWrapper style={{marginTop: '8px'}}>
        <TextArea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ContentWrapper>
      <ImageInsertButtonWrapper>
        {/* 
        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
          <img src={Camera} alt="camera icon" />
          <Text>사진</Text>
        </label>
        */}
        
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          multiple
          onChange={handleImageChange}
          // style={{ display: 'none' }} // 기본 input 스타일 숨기기
        />
    </ImageInsertButtonWrapper>
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

const ImageInsertButtonWrapper = styled.div`
width: 100%;
display: flex;
// justify-content: flex-end;
label {
display: flex;
flex-direction: row;
gap: 8px;
}
input {
// width: 190px;
}
input[type=file]::file-selector-button {
  color: #919191;
  width: 80px;
  height: 30px;
  background: #fff;
  border: 1px solid #E6E6E6;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
}
* {
color: #919191;
}
`
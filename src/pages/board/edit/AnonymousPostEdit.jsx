import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

function 
AnonymousPostEdit() {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId 가져오기

  // 게시글 데이터 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgFile, setImgFile] = useState(null);

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.result;
        console.log("불러온 데이터:", data);

        setContent(data.content);
        setTitle(data.title);
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
      }
    };

    fetchData();
  }, [postId]);

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
    }
  };

  // 게시글 수정 API 요청
  const handleUpdate = async () => {
    if (!content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    const updateData = {
      title,
      content,
     // postType: categoryState,
    };

    formData.append(
      "postRequestDTO",
      new Blob([JSON.stringify(updateData)], { type: "application/json" })
    );
    
    // 빈 배열로 이미지 파일 추가
    formData.append("imageFiles", []);
    
    console.log('수정된 데이터', updateData);
    
    try {
      const response = await axios.patch(`${serverUrl}/posts/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("게시글이 성공적으로 수정되었습니다!");
      console.log(response.data);
      navigate(`/board/anonymous/all/${postId}`);
    } catch (error) {
      alert("게시글 수정 중 오류가 발생했습니다.");
      console.error(error);
    }
  };


  return (
    <EditContainer>
      <Header>
        <Title>게시글 수정</Title>
        <ButtonWrapper>
          <Button onClick={handleUpdate}>저장</Button>
        </ButtonWrapper>
      </Header>

      <Form>
        <Label>제목</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <Label>본문</Label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />

      {/*
<Label>이미지</Label>
        <ImageUpload>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imgFile ? <img src={URL.createObjectURL(imgFile)} alt="첨부된 이미지" /> : <p>이미지 선택</p>}
        </ImageUpload>
       */}
        
      </Form>
    </EditContainer>
  );
}

export default AnonymousPostEdit;

// ✅ Styled Components
const EditContainer = styled.div`
  margin: 50px auto;
  max-width: 600px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #000;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: #a00000;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const DeleteButton = styled(Button)`
  background: #919191;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ImageUpload = styled.div`
  border: 1px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;

  img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
  }
`;

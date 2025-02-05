import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

function ItemPostEdit() {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId 가져오기

  // 게시글 데이터 상태 관리
  const [musicalName, setMusicalName] = useState("");
  const [location, setLocation] = useState("");
  const [lostItem, setLostItem] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [content, setContent] = useState("");
  const [categoryState, setCategoryState] = useState("LOST");
  const [imgFiles, setImgFiles] = useState([]); // 이미지 배열 

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/losts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.result;
        console.log("불러온 데이터:", data);

        setMusicalName(data.musicalName);
        setLocation(data.location);
        setLostItem(data.lostItem);
        setLostDate(data.lostDate.split("T")[0]); // 날짜 형식 변환
        setContent(data.content);
        setCategoryState(data.postType);
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
      }
    };

    fetchData();
  }, [postId]);

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e) => {
    setImgFiles(Array.from(e.target.files)); // 여러 파일 선택 가능
    console.log('이미지파일스 미리보기', imgFiles[0]);
  };

  // 게시글 수정 API 요청
  const handleUpdate = async () => {
    if (!musicalName || !location || !lostItem || !lostDate || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    const updateData = {
      musicalName,
      location,
      lostItem,
      lostDate,
      content,
     // postType: categoryState,
    };

    formData.append(
      "lostRequestDTO",
      new Blob([JSON.stringify(updateData)], { type: "application/json" })
    );
    // console.log('수정된 데이터', updateData);

    // 여러 개의 이미지 파일을 imageFiles 배열로 추가
    for (let i = 0; i < imgFiles.length; i++) { 
        formData.append("imageFiles", imgFiles[i]);
      }
    
      // formData 확인용 콘솔로그 
   formData.forEach((value, key) => {
    console.log(key, value);
  });
    try {
      const response = await axios.patch(`${serverUrl}/losts/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("게시글이 성공적으로 수정되었습니다!");
      console.log(response.data);
      navigate(`/board/item/lost/${postId}`);
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
        <Label>뮤지컬명</Label>
        <Input value={musicalName} onChange={(e) => setMusicalName(e.target.value)} />

        <Label>장소</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />

        <Label>물품명</Label>
        <Input value={lostItem} onChange={(e) => setLostItem(e.target.value)} />

        <Label>날짜</Label>
        <Input type="datetime-local" value={lostDate} onChange={(e) => setLostDate(e.target.value)} />

        <Label>특징</Label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />

      
<Label>이미지</Label>
        <ImageUpload>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imgFiles ? <img alt="첨부된 이미지" /> : <p>이미지 선택</p>}
        </ImageUpload>
    
        
      </Form>
    </EditContainer>
  );
}

export default ItemPostEdit;

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

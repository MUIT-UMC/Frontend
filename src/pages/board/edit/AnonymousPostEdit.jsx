import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;
import { GoX } from "react-icons/go";
import Delete from "../../../assets/icons/Delete.svg";
function 
AnonymousPostEdit() {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId 가져오기

  // 게시글 데이터 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgFiles, setImgFiles] = useState([]); 
  const [originalImgUrls, setOriginalImgUrls] = useState([]);
  // 업로드 버튼 비활성화 처리 
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(title.trim() && content.trim()));
  }, [title, content]);
  
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
        setOriginalImgUrls(data.imgUrls);
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
      }
    };

    fetchData();
  }, [postId]);

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e) => {
    setImgFiles((prevFiles) => [
      ...prevFiles, 
      ...Array.from(e.target.files), 
    ]);
    console.log('이미지파일스 미리보기', imgFiles[0]);
  };
  
  
// 게시글 수정 API 요청
const handleUpdate = async () => {

  console.log("직전이미지", originalImgUrls);
  if (!title || !content) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  const formData = new FormData();
  const updateData = {
    title,
    content,
    originalImgUrls,
   // postType: categoryState,
  };

  formData.append(
    "postRequestDTO",
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
    const response = await axios.patch(`${serverUrl}/${postId}`, formData, {
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

const removeOriginalImage = (index) => {
  setOriginalImgUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  console.log(originalImgUrls);
};
const removeNewImage = (index) => {
  setImgFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
          onClick={isButtonDisabled ? undefined : handleUpdate}
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
    <CardWrapper>
      {originalImgUrls?.map((url, index) => (
        <Card key={`original-${index}`}>
          <DeleteIcon onClick={() => {removeOriginalImage(index); }}>
            <GoX />
          </DeleteIcon>
          <Image src={url} alt={`Original image ${index}`} />
        </Card>
      ))}
      {/*
      <DotWrapper>
      <Line />
      </DotWrapper>
       */}
      
      
      {imgFiles?.map((file, index) => (
        <Card key={`file-${index}`}>
          <DeleteIcon onClick={() => {removeNewImage(index)}}>
            <GoX />
          </DeleteIcon>
          <Image src={URL.createObjectURL(file)} alt={`Uploaded image ${index}`} />
        </Card>
      ))}
    </CardWrapper>
    </WritePostContainer>
  );
}

export default AnonymousPostEdit;

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
`;
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

const Card = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #E6E6E6; 
  position: relative;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  filter: 1;
  background: #919191;
  color: white;

`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 8px;
margin-top: 16px;
`

const DotWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Line=styled.div`
  width:2px;
  height: 60px;
  background: #E6E6E6;
  margin: 4px;
  border-radius: 1px;
`
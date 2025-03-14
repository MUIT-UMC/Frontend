import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { InteractiveRatingStars } from "../../../components/detail/InteractiveRatingStars";
import { useNavigate } from "react-router-dom";
import MusicalIdSearchBar from "../../../components/post/MusicalIdSearchBar";
// const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
import { GoX } from "react-icons/go";
const token = localStorage.getItem("accessToken");
console.log(token);
const muit_server = import.meta.env.VITE_APP_SERVER_URL;

function WriteReviewPost() {

  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [musicalName, setMusicalName] = useState("");
  const [musicalId, setMusicalId] = useState(0);
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  
  const [categoryState, setCategoryState] = useState("REVIEW"); // category 상태 추가
  const [imgFiles, setImgFiles] = useState([]); // 이미지 배열 
  

  // 업로드 버튼 비활성화 처리 
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(title.trim() && content.trim() && musicalId && rating));
  }, [title, content, musicalId, rating]);

  // 업로드할 사진 선택 & 미리보기 
  const handleImageChange = (e) => {
    setImgFiles((prevFiles) => [
      ...prevFiles, 
      ...Array.from(e.target.files), 
    ]);
    console.log('이미지파일스 미리보기', imgFiles[0]);
  };
  const previewImage = imgFiles.length > 0 ? URL.createObjectURL(imgFiles[0]) : null;

  // 글 업로드하기
  const handleSubmit = async (e) => {
    
    const postData = new FormData();

    // FormData에 JSON 데이터를 추가하기
    postData.append("reviewRequestDTO", JSON.stringify({
      isAnonymous: true,
      title: title.trim(),
      content: content.trim(),
      location: location.trim(),
      musicalId: musicalId, 
      rating: rating, 
    }));

    // 이미지 파일이 있다면 FormData에 추가하기
    for (let i = 0; i < imgFiles.length; i++) { 
        postData.append("imageFiles", imgFiles[i]);
      }
  
    try {
      console.log(categoryState);
      const response = await axios.post(
        `${muit_server}/reviews?postType=${categoryState}`,
        postData,
        {
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          }
        }
      ); 
      alert("게시글이 성공적으로 등록되었습니다!");
      console.log("리스폰스 데이터", response.data);
      console.log("데이터 아이디", response.data.result.id);
      if (categoryState === "REVIEW")
        navigate(`/board/review/musical/${response.data.result.id}`);
      else if (categoryState === "SIGHT")
        navigate(`/board/review/seats/${response.data.result.id}`);
    } catch (error) {
      alert("게시글 등록 중 오류가 발생했습니다.");
      console.error(error);
    }
  };
  const removeNewImage = (index) => {
    setImgFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <WritePostContainer>
      <InputWrapper>
        <InputTitle
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button disabled={isButtonDisabled} onClick={handleSubmit}>
          등록
        </Button>
      </InputWrapper>
      <Text>리뷰 게시판</Text>
      <Hr marginTop="20px" marginBottom="36px" />
      <Content>
        <Form onSubmit={handleSubmit}>
          <Div>
            <label>분류</label>
            <SelectWrapper>
              <select
                value={categoryState}
                onChange={(e) => setCategoryState(e.target.value)}
              >
                <option value="REVIEW">뮤지컬 리뷰</option>
                <option value="SIGHT">시야 리뷰</option>
              </select>
            </SelectWrapper>
          </Div>
          <Div>
            <label>뮤지컬명</label>
            <MusicalIdSearchBar setMusicalId={setMusicalId} setLocation={setLocation}/>
          </Div>
          <Div>
            <label>장소</label>
            <Input
              type="text"
              placeholder="뮤지컬명 검색 결과에 따라 자동 입력됩니다"
              value={location}
              disabled
            />
          </Div>
          <Div>
            <label>평점</label>
            <InteractiveRatingStars
              value={rating}
              onRatingChange={setRating}
            />
          </Div>
          <Div>
            <label>내용</label>
            <textarea
              placeholder="악의적인 비방과 욕설이 포함된 글은 무통보 삭제될 수 있습니다."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Div>
        </Form>
      </Content>
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

export default WriteReviewPost;

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
const InputTitle = styled.input`
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

const Text = styled.div`
  color: var(--Gray-sub, #919191);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;

const Label = styled.label`
  
`

const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start; /* 라벨을 상단 정렬 */
    gap: 10px; /* 라벨과 textarea 간 간격 */

    label {
    width: 100px;
    color: #000;

    /* Body-bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
    textarea {
    border: none;
    width: 1104px;
    height: 600px;
    color: #000;

    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 156.25% */
    padding: 0px;
  }
    textarea:focus {
    outline: none;
  }

`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;


const SelectWrapper = styled.div`
  border-bottom: solid 1px #E6E6E6;
  width: 610px;
  padding-bottom: 4px;

  select {
    border: none;
    color: var(--Gray-maintext, #000);

    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 156.25% */
  }
    select:focus {
    outline: none;
    }
`

const ImgWrapper = styled.div`
  height: 320px;
  width: 320px;
  background:#F5F5F5;
  
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`


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

const Input = styled.input`
    width: 610px;
    border: none;
    border-bottom: 1px solid #E6E6E6;
    color: var(--Gray-maintext, #000);

    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 156.25% */

  }
  input:focus {
     outline: none;
  }`

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
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { InteractiveRatingStars } from "../../../components/detail/InteractiveRatingStars";
import { useNavigate } from "react-router-dom";
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const muit_server = import.meta.env.VITE_APP_SERVER_URL;

function WriteReviewPost() {

  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [musicalName, setMusicalName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  
  const [categoryState, setCategoryState] = useState("REVIEW"); // category 상태 추가
  const [imgFiles, setImgFiles] = useState([]); // 이미지 배열 
  

  // 업로드 버튼 비활성화 처리 
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(title.trim() && content.trim() && musicalName.trim() && location.trim()));
  }, [title, content, musicalName, location]);

  // 업로드할 사진 선택 & 미리보기 
  const handleImageChange = (e) => {
    setImgFiles(Array.from(e.target.files)); // 여러 파일 선택 가능
    console.log('이미지파일스 미리보기', imgFiles[0]);
  };
  const previewImage = imgFiles.length > 0 ? URL.createObjectURL(imgFiles[0]) : null;

  // 글 업로드하기
  const handleSubmit = async (e) => {
    
    const postData = new FormData();

    // FormData에 JSON 데이터를 추가하기
    postData.append("reviewRequestDTO", JSON.stringify({
      memberId: 1, // 실제 회원 ID로 변경
      isAnonymous: true,
      title: title.trim(),
      content: content.trim(),
      musicalName:  musicalName.trim(),
      location: location.trim(),
      musicalId: 2, // 뮤지컬 ID (적절한 값으로 대체하세요)
      rating: rating, // 평점이 필요하지 않다면 생략 가능
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
      ); // API URL 변경 필요
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

  return (
    <WritePostContainer>
      <InputWrapper>
        <Input
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
          <div>
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
          </div>
          <div>
            <label>뮤지컬명</label>
            <input
              type="text"
              placeholder="뮤지컬 이름을 검색하세요"
              value={musicalName}
              onChange={(e) => setMusicalName(e.target.value)}
            />
          </div>
          <div>
            <label>장소</label>
            <input
              type="text"
              placeholder="뮤지컬 장소를 입력하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label>평점</label>
            <InteractiveRatingStars
              starSize={36}
              value={rating}
              onRatingChange={setRating}
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              placeholder="악의적인 비방과 욕설이 포함된 글은 무통보 삭제될 수 있습니다."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
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

const Text = styled.div`
  color: var(--Gray-sub, #919191);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;

const Label = styled.label`
  
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  div {
    display: flex;
    flex-direction: row;
    align-items: flex-start; /* 라벨을 상단 정렬 */
    gap: 10px; /* 라벨과 textarea 간 간격 */
  }

  div > input {
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
  div > input:focus {
     outline: none;
  }

  div > label {
    width: 100px;
    color: #000;

    /* Body-bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  div > textarea {
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

  div > textarea:focus {
    outline: none;
  }
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
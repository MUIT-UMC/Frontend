import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { InteractiveRatingStars } from "../../../components/detail/InteractiveRatingStars";
import { GoX } from "react-icons/go";
const token = localStorage.getItem("accessToken");
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

function ReviewPostEdit() {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId 가져오기

  // 게시글 데이터 상태 관리
  const [title, setTitle] = useState("");
  const [musicalName, setMusicalName] = useState("");
  const [musicalId, setMusicalId] = useState(2);
  const [location, setLocation] = useState("");
  const [lostItem, setLostItem] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [content, setContent] = useState("");
  // const [categoryState, setCategoryState] = useState("LOST");
  const [imgFiles, setImgFiles] = useState([]); // 이미지 배열 
  const [originalImgUrls, setOriginalImgUrls] = useState([]);
  const [rating, setRating] = useState(0);

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/reviews/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.result;
        console.log("불러온 데이터:", data);

        setTitle(data.title);
        setMusicalName(data.musicalName);
        setLocation(data.location);
        setContent(data.content);
        setRating(data.rating);
        setOriginalImgUrls(data.imgUrls);
        console.log('평점', data.rating);
        // setCategoryState(data.postType);
        // setImgFiles(data.imgUrls);
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
      }
    };

    fetchData();
  }, [postId]);

  const handleImageChange = (e) => {
    setImgFiles((prevFiles) => [
      ...prevFiles, 
      ...Array.from(e.target.files), 
    ]);
    console.log('이미지파일스 미리보기', imgFiles[0]);
  };
  

  // 게시글 수정 API 요청
  const handleUpdate = async () => {
    if (!title || !musicalId || !rating || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    const updateData = {
      title,
      musicalName,
      musicalId,
      location,
      content,
      rating,
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
      navigate(`/board/review/musical/${postId}`);
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

  
// 필드 전부 입력 해야 버튼 활성화화
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    setButtonDisabled(!(title.trim() && content.trim() && musicalId && rating));
  }, [title, content, musicalId, rating]);

  return (
<WritePostContainer>
      <InputWrapper>
        <InputTitle
          placeholder="제목을 입력하세요"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Button
         onClick={handleUpdate} 
         // disabled={isButtonDisabled}
         >
          등록
        </Button>
      </InputWrapper>

      <Text>분실물 게시판</Text>
      <Hr marginTop="20px" marginBottom="36px" />

      <Content>
      <Form>
        {/*
        <div>
            <label>분류</label>
            <SelectWrapper>
              <select
                value={categoryState}
                onChange={(e) => setCategoryState(e.target.value)}
              >
                <option value="LOST">분실</option>
                <option value="FOUND">습득</option>
              </select>
            </SelectWrapper>
          </div>
        
         */}
      <Div>
          <label>뮤지컬명</label>
          <Input
            type="text"
            value={musicalName}
            onChange={(e) => {
              setMusicalName(e.target.value);
              console.log(musicalName);
            }}
          />
        </Div>
        <Div>
          <label>장소</label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Div>
        <Div>
          <label>평점</label>
          <InteractiveRatingStars
            value={rating}
            rating={rating}
            onRatingChange={setRating}
          />
        </Div>
        <Div>
          <label>내용</label>
          <textarea
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

export default ReviewPostEdit;

const WritePostContainer = styled.div`
  margin: 86px 100px;
`;

const Hr = styled.hr`
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  margin-top: ${(props) => props.marginTop || "0px"};
  border: 0;
  border-top: 1px solid var(--Gray-outline, #E6E6E6);
`;
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

const InputWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  gap: 10px;

 
`;

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


const Text = styled.div`
  color: var(--Gray-sub, #919191);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  
`;

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

const ImgWrapper = styled.div`
  height: 320px;
  width: 320px;
  background:#F5F5F5;
   overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`


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
  border-radius: 1px;`
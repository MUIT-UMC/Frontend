import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { InteractiveRatingStars } from "../../../components/detail/InteractiveRatingStars";

const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
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
        console.log('평점', data.rating);
        // setCategoryState(data.postType);
        // setImgFiles(data.imgUrls);
      } catch (error) {
        console.error("게시글 불러오기 오류:", error);
      }
    };

    fetchData();
  }, [postId]);

  // 게시글 수정 API 요청
  const handleUpdate = async () => {
    //if (!musicalName || !location || !content) {
    //  alert("모든 필드를 입력해주세요.");
    //  return;
    //}

    const formData = new FormData();
    const updateData = {
      title,
      musicalName,
      musicalId,
      location,
      content,
      rating,
     // postType: categoryState,
    };

    formData.append(
      "reviewRequestDTO",
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
      const response = await axios.patch(`${serverUrl}/reviews/${postId}`, formData, {
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

// 필드 전부 입력 해야 버튼 활성화화
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    setButtonDisabled(
      !(content.trim() && musicalName && location && lostItem && lostDate)
    );
    console.log(isButtonDisabled);
  }, [content, musicalName, location, lostItem, lostDate]);
  return (
<WritePostContainer>
      <InputWrapper>
        <Input
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
      <div>
          <label>뮤지컬명</label>
          <input
            type="text"
            value={musicalName}
            onChange={(e) => {
              setMusicalName(e.target.value);
              console.log(musicalName);
            }}
          />
        </div>
        <div>
          <label>장소</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>평점</label>
          <InteractiveRatingStars
            starSize={36}
            value={rating}
            rating={rating}
            onRatingChange={setRating}
          />
        </div>
        <div>
          <label>특징</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </Form>
      </Content>
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
    border: 1px solid #E6E6E6;
    width: 610px;
    color: #000;
    height: 100px;

    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 156.25% */
    padding: 4px 12px;
  }

  div > textarea:focus {
    outline: none;
  }
`;

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
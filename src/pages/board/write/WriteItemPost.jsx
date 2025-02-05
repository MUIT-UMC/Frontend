import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Camera from "../../../assets/icons/Camera.svg";
import axios from "axios"; // axios 추가
import { useNavigate } from "react-router-dom";
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const muit_server = import.meta.env.VITE_APP_SERVER_URL;

function WriteItemPost({category}) {

  const navigate = useNavigate();

  const isAnonymous = true;
  const [musicalName, setMusicalName] = useState("");
  // const [title, setTitle] = useState(""); // ItemPost는 title이 lostItem
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [lostItem, setLostItem] = useState("");
  const [lostDate, setLostDate] = useState("");

  const [imgFiles, setImgFiles] = useState([]); // 이미지 배열 

  const [categoryState, setCategoryState] = useState("LOST"); // category 상태 추가

  // 필드 전부 입력 해야 버튼 활성화화
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    setButtonDisabled(
      !(content.trim() && musicalName && location && lostItem && lostDate)
    );
    console.log(isButtonDisabled);
  }, [content, musicalName, location, lostItem, lostDate]);

  // 업로드할 사진 미리보기 
  const handleImageChange = (e) => {
    setImgFiles(Array.from(e.target.files)); // 여러 파일 선택 가능
    console.log('이미지파일스 미리보기', imgFiles[0]);
  };
  const previewImage = imgFiles.length > 0 ? URL.createObjectURL(imgFiles[0]) : null;
  
  // 글 업로드하기 
  const handleSubmit = async () => {

    const formData = new FormData();

    const lostRequestDTO = {
      isAnonymous: isAnonymous,
      musicalName: musicalName.trim(),
      title: lostItem.trim(),
      content: content.trim(),
      location: location.trim(),
      lostItem: lostItem.trim(),
      lostDate: lostDate.trim(),
    };
    
    // 제출할 데이터를 formData에 추가한다. 
    formData.append(
      "lostRequestDTO",
      new Blob([JSON.stringify(lostRequestDTO)], { type: "application/json" })
    );   

    // 여러 개의 이미지 파일을 imageFiles 배열로 추가
    for (let i = 0; i < imgFiles.length; i++) { 
        formData.append("imageFiles", imgFiles[i]);
      }
   // formData 확인용 콘솔로그 
   formData.forEach((value, key) => {
    console.log(key, value);
  });

      
    try {
      const response = await axios.post(
        `${muit_server}/losts?postType=${categoryState}`,
        formData,
        {
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("게시글이 성공적으로 등록되었습니다!");
      console.log(response.data);
      navigate(`/board/item/lost/${response.data.result.id}`);
    } catch (error) {
      alert("게시글 등록 중 오류가 발생했습니다.");
      console.error(error);
    }
  };


  return (
    <WritePostContainer>
      <InputWrapper>
        <Input
          placeholder="물품명을 입력해주세요."
          type="text"
          value={lostItem}
          onChange={(e) => setLostItem(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={isButtonDisabled}>
          등록
        </Button>
      </InputWrapper>

      <Text>분실물 게시판</Text>
      <Hr marginTop="20px" marginBottom="36px" />

      <Content>
      {/*이미지 첨부 기능*/}
      <ImgWrapper>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }} // 기본 input 스타일 숨기기
            id="fileInput"
            multiple 
            onChange={handleImageChange}
          />
          <label htmlFor="fileInput">
            {console.log("이미지파일스 미리보기", imgFiles[0])}
            {imgFiles.length > 0 ? (
              <img
                src={previewImage}
                alt="첨부된 이미지"
                style={{ maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", }}
              />
            ) : (
              <img src={Camera} alt="카메라 아이콘" />
            )}
          </label>
        </ImgWrapper>
      <Form>
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
          <label>날짜</label>
          <input
            type="datetime-local"
            value={lostDate}
            onChange={(e) => {
              setLostDate(e.target.value);
              console.log(lostDate);
            }}
          />
        </div>
        <div>
          <label>물품명</label>
          <input
            type="text"
            value={lostItem}
            onChange={(e) => setLostItem(e.target.value)}
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

export default WriteItemPost;

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
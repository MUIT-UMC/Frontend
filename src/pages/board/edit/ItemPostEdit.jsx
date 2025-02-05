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
          placeholder="물품명을 입력해주세요."
          type="text"
          value={lostItem}
          onChange={(e) => setLostItem(e.target.value)}
        />
        <Button onClick={handleUpdate} disabled={isButtonDisabled}>
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
            {imgFiles ? (
              <img
                //src={URL.createObjectURL(imgFiles[0])}
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

export default ItemPostEdit;

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
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Camera from "../../../assets/icons/Camera.svg";
import axios from "axios"; // axios 추가

function WriteItemPost({category}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [musicalName, setMusicalName] = useState("");
  const [location, setLocation] = useState("");
  const [lostItem, setLostItem] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [imgFile, setImgFile] = useState(null); // 이미지 파일 상태 추가
  const [categoryState, setCategoryState] = useState(category || "LOST"); // category 상태 추가

  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(
      !(content.trim() && musicalName && location && lostItem && lostDate)
    );
    console.log(isButtonDisabled);
  }, [content, musicalName, location, lostItem, lostDate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    if (file) {
      setImgFile(file); // 상태에 파일 저장
    }
  };

  const handleSubmit = async () => {
    console.log("뮤지컬명:", musicalName);
    console.log("분실일:", lostDate);

    const formData = new FormData();

    const lostRequestDTO = {
      memberId: 1, // 실제 회원 ID로 변경
      isAnonymous: true,
      musicalName: musicalName.trim(),
      title: lostItem.trim(),
      content: content.trim(),
      location: location.trim(),
      lostItem: lostItem.trim(),
      lostDate: lostDate.trim(),
    };

    formData.append(
      "lostRequestDTO",
      new Blob([JSON.stringify(lostRequestDTO)], { type: "application/json" })
    ); 
    
    console.log("lostRequest", lostRequestDTO);

    console.log("formData", formData);    
    try {
      const response = await axios.post(
        `http://13.209.69.125:8080/losts/?postType=${categoryState}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("게시글이 성공적으로 등록되었습니다!");
      console.log(response.data);
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
            onChange={handleImageChange}
          />
          <label htmlFor="fileInput">
            {imgFile ? (
              <img
                src={URL.createObjectURL(imgFile)}
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
          <label>일시</label>
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
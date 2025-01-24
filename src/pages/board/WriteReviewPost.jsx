import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Camera from "../../assets/icons/Camera.svg";
import { InteractiveRatingStars } from './../../components/detail/InteractiveRatingStars';
function WriteReviewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(title.trim() && content.trim()));
  }, [title, content]);

  return (
    <>
      <WritePostContainer>
        <InputWrapper>
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button disabled={isButtonDisabled}>등록</Button>
        </InputWrapper>
        <Text>분실물 게시판</Text>
        <Hr marginTop="20px" marginBottom="36px" />
        <Content>

          <Form>
          <div style={{display: 'flex', flexDirection: 'row',}}>
            <label>분류</label>
            <SelectWrapper>
            <select name="language" >
              <option value="korean" selected>뮤지컬 리뷰</option>
              <option value="english">시야 리뷰</option>
            </select>
            </SelectWrapper>
          </div>
          <div>
            <label>뮤지컬명</label>
            <input type='text' placeholder="뮤지컬 이름을 검색하세요"/>
          </div>
          <div>
            <label>장소</label>
            <input type='text' placeholder="뮤지컬 장소를 입력하세요"/>
          </div>
          <div>
            <label>평점</label>
            <InteractiveRatingStars starSize={36}/>
          </div>
          <div>
            <label>내용</label>
            <textarea type='text' placeholder="악의적인 비방과 욕설이 포함된 글은 무통보 삭제될 수 있습니다. 모든 게시글은 익명으로 올라갑니다. "/>
          </div>
        </Form>
        
        </Content>
        
      </WritePostContainer>
    </>
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

const CancelButton = styled(Button)`
  background-color: var(--Gray-outline, #E6E6E6);
  color: #000;

  &:hover {
    background-color: #cfcfcf;
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
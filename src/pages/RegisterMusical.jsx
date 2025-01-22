import React, { useState } from "react";
import styled from "styled-components";
import CameraIcon from '../assets/icons/Camera.svg';

const RegisterMusical = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <RegisterWrapper>
      <Title>공연 이름을 입력하세요</Title>
      <Form>
        <LeftSection>
          <ImageUpload>
            <Preview>
            <img src={CameraIcon} alt="Camera Icon" />
            </Preview>
            <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
          </ImageUpload>
        </LeftSection>
        <RightSection>
          <InputWrapper>
            <Label>장소</Label>
            <Input type="text" placeholder="공연할 장소를 입력하세요" />
          </InputWrapper>
          <InputWrapper>
            <Label>공연 기간</Label>
            <Input type="text" placeholder="공연 기간을 입력하세요" />
          </InputWrapper>
          <InputWrapper>
            <Label>공연 시간</Label>
            <Input type="text" placeholder="공연 시간을 입력하세요" />
          </InputWrapper>
          <InputWrapper>
            <Label>관람 연령</Label>
            <Input type="text" placeholder="관람 연령을 입력하세요" />
          </InputWrapper>
          <InputWrapper>
            <Label>출연</Label>
            <Input type="text" placeholder="출연하는 배우의 이름을 입력하세요" />
          </InputWrapper>
          <InputWrapper>
            <Label>가격</Label>
            <Input type="text" placeholder="가격을 입력하세요" />
          </InputWrapper>
          <InputWrapper>
            <Label>할인</Label>
            <Input type="text" placeholder="예) 지인 할인인" />
          </InputWrapper>
          <InputWrapper>
            <Label>티켓 수</Label>
            <Input type="text" placeholder="총 입장할 수 있는 티켓 수를 입력하세요요" />
          </InputWrapper>
        </RightSection>
      </Form>
      <BottomSection>
  <Section>
    <SectionTitle>⚠️ 참고사항</SectionTitle>
    <InputWrapper2>
      <Label>해시태그</Label>
      <Input type="text" placeholder="예: #극중극 #드라마" />
    </InputWrapper2>
    <InputWrapper2>
      <Label>줄거리</Label>
      <TextArea placeholder="줄거리를 입력하세요" />
    </InputWrapper2>
  </Section>

  <Section>
    <SectionTitle>공연정보</SectionTitle>
    <InputWrapper2>
      <Label>공연시간 정보</Label>
      <Input type="text" placeholder="공연시간 정보를 입력하세요" />
    </InputWrapper2>
    <InputWrapper2>
      <Label>공지사항</Label>
      <TextArea placeholder="공지사항을 입력하세요" />
    </InputWrapper2>
  </Section>

  <Section>
    <SectionTitle>캐스팅정보</SectionTitle>
    <CastingWrapper>
      <Left>
        <IconWrapper>
      
          <span>사진 추가</span>
        </IconWrapper>
      </Left>
      <Right>
        <InputWrapper>
          <Label>이름</Label>
          <Input type="text" placeholder="이름을 입력하세요" />
        </InputWrapper>
        <InputWrapper>
          <Label>역할</Label>
          <Input type="text" placeholder="역할을 입력하세요" />
        </InputWrapper>
        <AddButton>추가하기</AddButton>
      </Right>
    </CastingWrapper>
    <InputWrapper>
      <Label>감독 및 스태프</Label>
      <TextArea placeholder="감독 및 스태프 정보를 입력하세요" />
    </InputWrapper>
    <AddButton>추가하기</AddButton>
  </Section>

  <Section>
    <SectionTitle>결제정보</SectionTitle>
    <InputWrapper>
      <Label>계좌번호</Label>
      <Input type="text" placeholder="계좌번호를 입력하세요" />
    </InputWrapper>
    <InputWrapper>
      <Label>환불문의</Label>
      <TextArea placeholder="환불문의 정보를 입력하세요" />
    </InputWrapper>
  </Section>
</BottomSection>

    </RegisterWrapper>
  );
};

export default RegisterMusical;


const RegisterWrapper = styled.div`
  max-width: 1440px;
  height: 864px;
  margin: 0 auto;
  position: relative;
  
`;

const Title = styled.h1`
  color: var(--Gray-sub, #919191);
/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-top: 87px;
margin-left: 99px;
`;

const Form = styled.div`
  display: flex;
  gap: 40px;
`;

const LeftSection = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 99px;
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Preview = styled.div`
width: 320px;
height: 450px;
flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #F5F5F5;

  img {
    width: 24px;
height: 24px;
flex-shrink: 0;
    object-fit: cover;
  }
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center; /* 텍스트와 인풋을 수평 정렬 */
  gap: 16px; /* 라벨과 입력 필드 간격 */
`;

const Label = styled.label`
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
  text-align: left; /* 오른쪽 정렬 */
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ccc; /* 밑줄만 표시 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  padding: 4px 0;
color: #E6E6E6;
width: 300px;

  &::placeholder {
    color: #919191; /* 플레이스홀더 색상 */
    /* body-14-medium */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
  }

  &:focus {
    border-bottom: 1px solid #333; /* 포커스 시 밑줄 색상 변경 */
  }
`;
const BottomSection = styled.div`
  padding: 40px 100px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
height: 30.858px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: var(--Muit-Red-main, #A00000);
/* title-24-bold */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
const InputWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  padding: 8px;
  width: 100%;
  font-size: 14px;
  resize: none;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border: 1px solid #333;
  }
`;

const CastingWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  border-radius: 4px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
  }
`;

const Right = styled.div`
  flex: 1;
`;

const AddButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #a00000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #900000;
  }
`;

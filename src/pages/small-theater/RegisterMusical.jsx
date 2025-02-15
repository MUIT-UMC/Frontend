import React, { useState} from "react";
import styled from "styled-components";
import CameraIcon from '../../assets/icons/Camera.svg';
import CastingPictureIcon from '../../assets/icons/CastingPicture.svg';
import PlusIcon from '../../assets/icons/plus.svg'
import { useNavigate } from "react-router-dom"; 

const RegisterMusical = () => {
  const navigate = useNavigate();
  const [posterImage, setPosterImage] = useState(null);
  const [castingImages, setCastingImages] = useState([]);
  const [noticeImages, setNoticeImages] = useState([]);
  const [summaryImage, setSummaryImage] = useState(null);
  const [castings, setCastings] = useState([]);
  const [staff, setStaff] = useState([]); 
  const [ticketPrice, setTicketPrice] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    schedule: "",
    age: "",
    starring: "",
    totalTicket: 0,
    timeInfo: "",
    account: "",
    contact: "",
    hashtag: "",
    runtime: "",
    notice: {
      imgUrls: [],
      content: "",
    },
    summaries: {
      imgUrl: "",
      content: "",
    },
  });
  const handleTicketPriceChange = (e) => {
    setTicketPrice(e.target.value);
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPosterImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUploadInput").click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextClick = () => {
    navigate("/register-musical/check", {
      state: {
        formData,
        posterImage,
        castingImages,
        noticeImages,
        summaryImage,
        castings,
        staff,
        ticketPrice, 
      },
    });

  };

  return (
    <RegisterWrapper>
      <Title
       type="text" 
       name="name"
       placeholder="공연 이름을 입력하세요"
       value={formData.name}
       onChange={handleInputChange}
       />
      <Form>
        <LeftSection>

        <ImageUpload onClick={handleImageClick}>
        <Preview>
        {posterImage ? (
  <img src={URL.createObjectURL(posterImage)} alt="Uploaded" />
) : (
  <img src={CameraIcon} alt="Camera Icon" className="icon" />
)}

  </Preview>
  <input
    id="imageUploadInput"
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleImageUpload}
  />
</ImageUpload>
        </LeftSection>
        <RightSection>
          <InputWrapper>
            <Label>장소</Label>
            <Input
              type="text"
              name="place"
              placeholder="공연할 장소를 입력하세요"
              value={formData.place}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>공연 기간</Label>
            <Input
              type="text"
              name="schedule"
              placeholder="공연 기간을 입력하세요"
              value={formData.schedule}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>공연 시간</Label>
            <Input
              type="text"
              name="runtime"
              placeholder="공연 시간을 입력하세요"
              value={formData.runtime}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>관람 연령</Label>
            <Input
              type="text"
              name="age"
              placeholder="관람 연령을 입력하세요"
              value={formData.age}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>출연</Label>
            <Input
             type="text"
             name="starring"
            placeholder="출연하는 배우의 이름을 입력하세요"
            value={formData.starring}
            onChange={handleInputChange} />
          </InputWrapper>
          <InputWrapper>
            <Label>가격</Label>
            <Input
  type="text"
  name="ticketPrice"
  placeholder="가격을 입력하세요"
  value={ticketPrice}
  onChange={handleTicketPriceChange}
/>
          </InputWrapper>
          <InputWrapper>
            <Label>할인</Label>
            <Input 
              type="text" 
              name="discount"
              placeholder="예) 지인 할인"
              value={formData.discount||""}
              onChange={handleInputChange} />
          </InputWrapper>
          <InputWrapper>
            <Label>티켓 수</Label>
            <Input
             type="text" 
             name="totalTicket"
             placeholder="총 입장할 수 있는 티켓 수를 입력하세요"
             value={formData.totalTicket}
             onChange={handleInputChange}
              />
          </InputWrapper>
        </RightSection>
        <NextButtonWrapper>
    <NextButton onClick={handleNextClick} >다음</NextButton>
  </NextButtonWrapper>
      </Form>
      <BottomSection>
      <Border></Border>
  <Section>
    <SectionTitle>⚠️ 참고사항</SectionTitle>
    <SectionText>
      1. 기본 수수료는 5000원입니다.<br/>
      2. 등록 후, 관리자가 확인 후 페이지에 올라가게 됩니다.<br/>
      3. 대학생, 아마추어 연극/뮤지컬 모두 가능합니다. <br/>
      4. 환불은 저희가 해드리지 않습니다. 자신의 인스타그램으로 환불 or 현장에서 하시길 바랍니다.
      </SectionText>
   </Section>
    <Border></Border>
    <Section>  
    <InputWrapper2>
      <Label>해시태그</Label>
      <Input2
       type="text" 
       name="hashtag"
       placeholder="예: #극중극 #드라마"
       value={formData.hashtag}
       onChange={handleInputChange} />
    </InputWrapper2>
    <InputWrapper2>
      <Label>줄거리</Label>
      <TextArea
         name="summaries.content"   
        placeholder={`공연의 줄거리를 입력하세요
사진을 추가할 경우 미리보기 포스터로 올라갑니다`}
       value={formData.summaries.content}
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      summaries: { ...prev.summaries, content: e.target.value },
    }))
  }
      />
    </InputWrapper2>
  </Section>

  <Section>
    <SectionTitle>공연정보</SectionTitle>
    <InputWrapper2>
      <Label>공연시간 정보</Label>
      <TextArea 
        name="notice.content"
        placeholder="예매 가능시간이나 공연시간에 대해 자유롭게 입력하세요"
        value={formData.notice.content}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            notice: { ...prev.notice, content: e.target.value },
          }))
        } />
    </InputWrapper2>
    <InputWrapper2>
      <Label>공지사항</Label>
      <TextArea 
       name="notice"
       placeholder={`공지 사항에 대해 자유롭게 입력하세요
예: 예매시에 공연 관리자가 안내하는 입금계좌로 입금하시고, 공연 관리자의 입금 확인을 통해 티켓 예매 확인을 받을 수 있습니다. 
공연 관리자가 입금을 확인해야 하므로 티켓 확인까지 시간이 걸릴 수 있습니다.`} 
      value={formData.notice}
      onChange={handleInputChange}/>
    </InputWrapper2>
  </Section>

  <Section>
    <SectionTitle>캐스팅정보</SectionTitle>
    <CastingWrapper>
      <Left>
        <img src={CastingPictureIcon} alt="Casting Icon" width="140" height="140"/>
        <CastingInfo 
          type="text"
          placeholder="이름"
          name="castingName"
          onChange={handleInputChange}/>
        <CastingInfo 
          type="text"
          placeholder="역할"
          name="castingRole"
          onChange={handleInputChange}/>
      </Left>
      <Right>
        <InputWrapper>
        <img src={PlusIcon}/>
         <AddButton>추가하기</AddButton>
        </InputWrapper>
      </Right>
    </CastingWrapper>
    <InputWrapper>
      <Label>감독 및 스태프</Label>
    </InputWrapper>

  </Section>

  <Section>
    <SectionTitle>결제정보</SectionTitle>
    <InputWrapper2>
      <Label>계좌번호</Label>
      <Input2 
        type="text"
        name="account"
        placeholder="공연에 쓰일 계좌번호를 입력하세요 (입금주명)"
        value={formData.account}
        onChange={handleInputChange} />
    </InputWrapper2>
    <InputWrapper2>
      <Label>환불문의</Label>
      <Input2 
      type="text"
      name="refundContact"
      placeholder="환불 문의에 쓰일 SNS 또는 전화번호를 입력하세요"
      value={formData.contact}
      onChange={handleInputChange} />
    </InputWrapper2>
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

const Title = styled.input`
color: black;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
&::placeholder {
  color: var(--Gray-sub, #919191);
/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
}
margin-top: 87px;
margin-left: 99px;
border:none;
outline: none;
`;

const Form = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
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

const NextButtonWrapper = styled.div`
  display: flex;
margin-right:100px;
`;

const NextButton = styled.button`
  width: 300px;
height: 40px;
flex-shrink: 0;
border-radius: 3px;
border: 1px solid var(--Gray-sub, #919191);
background: var(--Gray-sub, #919191);
color: #FFF;
cursor: pointer;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;


const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Preview = styled.div`
width: 320px;
height: 450px;
flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:-30px;

  background-color: #F5F5F5;

  .icon {
    width: 24px;
height: 24px;
flex-shrink: 0;
    object-fit: cover;
  }
  img{
     width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// const FileInput = styled.input`
//   margin-top: 10px;
// `;

const InputWrapper = styled.div`
  display: flex;
  align-items: center; /* 텍스트와 인풋을 수평 정렬 */
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
  border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  padding: 4px 0;
  color:rgb(0, 0, 0);
  width: 300px;
  margin-left: auto; /* 요소를 오른쪽으로 최대한 밀어붙임 */
  margin-right:120px;/* 오른쪽에서 560px 떨어지게 함 */
 
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

const Border=styled.div`
 border: none;
border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
width: 924px;
flex-direction: column;
margin-bottom:32px;
`
const SectionText=styled.div`
color: #000;
margin-bottom:32px;

/* body-16-medium */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`

const BottomSection = styled.div`
  padding: 5px 100px;
`;

const Section = styled.div`
  margin-bottom: 32px;
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
const Input2 = styled.input`
  border: none;
  border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  padding: 4px 0;
  color:rgb(0, 0, 0);
  width: 924px;
  flex-direction: column;
  margin-bottom: 28px;
 
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
  `
const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
display: flex;
width: 924px;
height: 116px;
padding: 12px;
flex-direction: column;
align-items: flex-start;
gap: 42px;
flex-shrink: 0;
margin-top: 5px;
margin-bottom: 28px;

  &::placeholder {
  color:#919191;
    /* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
 white-space: pre-wrap;
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
  align-items: center;
  gap: 20px; /* 아이콘, 이름, 역할 간의 간격 */
    flex-direction: column;
    margin-bottom:20px;
`;

const CastingInfo = styled.input`

border: none;
  border-bottom: 1px solid #e6e6e6;
  outline: none;
  padding: 4px 0;
  color: rgb(0, 0, 0);
  width: 140px;
  text-align: center;

  &::placeholder {
    color: #919191;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
  }

  &:focus {
    border-bottom: 1px solid #333;
  }
`;


const Right = styled.div`
align-items: center;
  flex: 1;
`;

const AddButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
    background-color: transparent; /* 배경 제거 */
  cursor: pointer;
  color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`;

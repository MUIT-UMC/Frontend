import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import posterImg from "../../assets/images/lost-pic.png";

const Step1 = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 처리
    const [peopleCount, setPeopleCount] = useState(1); // 인원 수 상태 관리

    const poster = posterImg;
    const data = {
        title: "실종",
        location: "홍익대학교 학생회관 3층 소극장",
        duration: "2024.10.03 ~ 2024.10.05",
        date: "2024.10.03 (목)",
        time: "19:00",
    };

    const handlePeopleChange = (event) => {
        setPeopleCount(event.target.value); // 선택된 인원 수 업데이트
    };

    return (
      <Container>
        <LeftSection>
        <Image src={poster} alt="뮤지컬 포스터" />
        </LeftSection>
        <RightSection>
          <Header>{data.title}</Header>
          <Location>{data.location}</Location>
          <Duration>{data.duration}</Duration>
          <Border/>
          <Info>
            <TicketDetails>
                <TicketRow>
              <Label>공연 날짜</Label>
              <Text>{data.date}</Text>
              </TicketRow>
              <TicketRow>
              <Label>공연 시간</Label>
              <Text>{data.time}</Text>
              </TicketRow>
              <TicketRow>
              <Label>인원</Label>
              <Select value={peopleCount} onChange={handlePeopleChange}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                                    <Option key={count} value={count}>
                                        {count}
                                    </Option>
                                ))}
                            </Select>
              </TicketRow>
            </TicketDetails>
          </Info>
          <Button onClick={() => navigate('./step2')}>예약하기</Button>  {/* 페이지 전환 */}
        </RightSection>
      </Container>
    );
  };

  export default Step1;

  // 스타일 컴포넌트
  const Container = styled.div`
  max-width: 1440px;
  height: 864px;
  margin: 0 auto;
  position: relative;
    display: flex; /* 좌우로 섹션 배치 */
      gap: 234px;
`;
const LeftSection = styled.div`
  margin-top: 160px;
  display: flex;
  margin-left: 99px;
`;
const Image = styled.img`
  width: 500px;
  height: 704px;
  object-fit: cover; /* 이미지가 섹션에 맞게 조정됨 */
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-top: 160px;

`;

const Header = styled.div`
color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 25px;
`;
const Location = styled.div`
color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Duration = styled.div`
color: #919191;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Info = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`;

const Button = styled.button`
display: flex;
width: 400px;
height: 40px;
justify-content: center;
align-items: center;
border-radius: 3px;
border: 1px solid var(--Muit-Red-main, #A00000);
background: var(--Muit-Red-main, #A00000);
color: #FFF;
margin-top:25px;
cursor: pointer;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
const Border=styled.div`
 border: none;
border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
width: 399px;
flex-direction: column;
margin-top:12px;
`
const TicketDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 각 줄 간의 간격 */
  margin-top:30px; 
`;

const TicketRow = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: space-between;
  gap: 38px; /* Label과 Text 사이 간격 */
`;
const Label=styled.div`
color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Text=styled.div`
display: flex;
width: 136px;
height: 32px;
padding: 4px 12px;
align-items: center;
gap: 4px;
color: #000;
border-radius: 2px;
border: 1px solid var(--Gray-outline, #E6E6E6);
background: var(--Gray-white-bg, #FFF);

/* body-16-medium */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Select = styled.select`
  width: 64px;
  height: 32px;
  padding: 4px 12px;
  border-radius: 2px;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  background: var(--Gray-white-bg, #FFF);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  color: #000;
  margin-right:98px;
`;
const Option = styled.option`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  color: #000;
`;
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TicketDetail from "../../../../components/mypage/myticket/TicketDetail";
import posterImg from "../../../../assets/images/miafamiglia-poster.png";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("accessToken");
console.log(token);

const details2 = [
  { label: "예매번호", value: "T0000000000", },
  { label: "예매일", value: "2025-01-15" },
  { label: "장소", value: "링크아트센터드림 드림1관" },
  { label: "관람일시", value: "2025-03-21 (금) 14:30 1회" },
  { label: "상태", value: "예매완료 (무통장 미입금)" },
  { label: "취소가능일시", value: "2025-03-20 (목) 17:00 까지" ,  
    extra: [
      {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
      {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
      {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
      {date: "2025.01.15 ~ 2025.01.22", cancelfee:'없음'},
]},
];





function  TicketDetailPage() {

  const {memberTicketId} = useParams();
  console.log(memberTicketId);

  const navigate = useNavigate(); // useNavigate 훅 사용

  const url = `/tickets/myTickets/${memberTicketId}`;

  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },);

  const { 
    amateurShowName, 
    place,
    posterImgUrl,
    quantity, 
    reservationDate,
    reservationStatus,
    schedule,
 } = data?.result || {};

 
 const korStatus = {
  RESERVE_AWAIT: "입금 대기중",
  RESERVED: "예매 완료",
  EXPIRED: "예매 기한 만료",
  CANCEL_AWAIT: "취소 대기중",
  CANCELED: "취소 완료",

 }

 const date = new Date(schedule?.split(' ')[0]);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  console.log(dayOfWeek); // 예: 수

  console.log(data);
  const handleCancelClick = () => {
    const currentUrl = window.location.pathname; // 현재 URL 가져오기
    navigate(currentUrl + '/cancel'); // '/cancel'을 URL 뒤에 추가하여 이동
  };

  const valueWidth ='120px'

  return (
    <PageWrapper>
      <Wrapper>
      <InfoImage>
        <img src={posterImgUrl}/>
      </InfoImage>
      <RightSection>
      <InfoDetail>
        <Title>
          <div>
            <span>{amateurShowName
            }</span><span>2매</span>
          </div>
          <span>{korStatus[reservationStatus]}</span>
        </Title>
      
          <Item>
            <Label>예매일</Label>
            <div>
              <Value>{reservationDate?.split('T')[0]}</Value>
            </div>
          </Item>
          <Item>
            <Label>장소</Label>
            <div>
              <Value>{place}</Value>
            </div>
          </Item>
          <Item>
            <Label>관람일시</Label>
            <div>
              <Value>{schedule?.split(' ')[0]} ({dayOfWeek}) {schedule?.split(' ')[1]}</Value>
            </div>
          </Item>
          <Item>
            <Label>상태</Label>
            <div>
              <Value>{korStatus[reservationStatus]}</Value>
            </div>
          </Item>
          <Item>
            <Label>취소가능일시</Label>
            <div>
              <Value></Value>
              <Extra>
              {/*extra && (
                  extra.map(({ date, cancelfee }) => (
                    <CancelFee
                      key={date} // key 추가 (리스트 렌더링에서 필수)
                    >
                      <span>{date}</span>
                      <span>{cancelfee}</span>
                    </CancelFee>
                  ))
              )*/}
              </Extra>
            </div>
          </Item>
      </InfoDetail>
      <Cautions>
      <p>예매 수수료는 예매일 이후 취소 시에는 환불되지 않습니다.</p>
      <p>단, 예매 당일 밤 12시 이전 취소 시에는 취소 수수료가 없음 (취소 기한내에 한함)</p>
      <p>취소수수료는 취소시점에 따라 달라지며, 취소 진행 시 확인 하실 수 있습니다.</p>
      </Cautions>
      <button onClick={handleCancelClick}>
        예매 취소
      </button>
      </RightSection>
      
      </Wrapper>
    </PageWrapper>
  );
};


export default TicketDetailPage;

const PageWrapper = styled.div`
  margin: 80px 100px;
`
const Wrapper = styled.div`
  display: flex;
  gap: 160px;
`

const InfoImage = styled.div`
  img {
    width: ${(props) => props.width ? props.width : '500px'};
    height: ${(props) => props.height ? props.height : '704px'};
    background-color: #f0f0f0;
  }
`;

const InfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0px;
  
  
  }
`;

const Item = styled.div`
  display: flex;
`;

const Label = styled.div`
  color: #000;
  width: 120px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
`;

const Value = styled.div`
  color: ${(props) => (props.color ? props.color : "#000")};
  width: ${(props) => (props.width ? props.width : "340px")};
  font-family: Pretendard;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: 500;
  line-height: 25px;
  text-decoration-line: ${(props) => (props.strikethrough ? "line-through" : "none")};
  margin-right: ${(props) => props.marginRight || "0px"};
  margin-left: ${(props) => props.marginLeft || "0px"};
`;

const SightLink = styled.div`
  color: var(--Gray-sub, #919191);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
`

const Cautions = styled.div`
  diaplay: flex;
  flex-direction: column;
  margin-bottom: 32px;
 p {
  color: var(--Gray-sub, #919191);

  /* Body-tiny-md */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
  margin: 0px;
  margin-bottom: 8px;
 }
   margin-top: 20px;
`
const CancelFee = styled.div`
span {
color: var(--Gray-sub, #919191);
/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
}
 span:nth-child(2) {
 color: var(--Muit-Red-main, #A00000);
 margin-left: 20px;
 }
`
const Extra = styled.div`
display: flex;
flex-direction: column;
gap: 12px;
margin-top: 20px;
`

const Title = styled.div`
margin-bottom: 14px;
  div > span {
color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
  }
div > span:nth-child(2){
  margin-left: 12px;
  }
span {
color: var(--Muit-Red-main, #A00000);

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
margin-top: 12px;
}

`

const RightSection = styled.div`
  margin: 0px 40px;

  button {
    display: flex;
  width: 400px;
  height: 40px;
  padding: 10px 172px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
border: 1px solid var(--Gray-outline, #E6E6E6);
background: var(--Gray-white-bg, #FFF);
`
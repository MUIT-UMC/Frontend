// components/detail/InfoWrapper.jsx
import React from "react";
import styled from "styled-components";
const TicketDetail = ({ image, width, height, alt, details, valueWidth }) => {
  return (
    <Wrapper>
      <InfoImage height={height}>
        <img alt={alt} src={image}/>
      </InfoImage>
      <RightSection>
      <InfoDetail>
        <Title>
          <div>
            <span>미아 파밀리아 (Mia Famiglia)</span><span>2매</span>
          </div>
          <span>예매 완료</span>
        </Title>
      
        {details.map(({ label, value, extra }, index) => (
          <Item key={index}>
            <Label>{label}</Label>
            <div>
              <Value width={valueWidth}>{value}</Value>
              <Extra>
              {extra && (
                  extra.map(({ date, cancelfee }) => (
                    <CancelFee
                      key={date} // key 추가 (리스트 렌더링에서 필수)
                    >
                      <span>{date}</span>
                      <span>{cancelfee}</span>
                    </CancelFee>
                  ))
)}
              </Extra>
             
            </div>
          </Item>
        ))}
        
      </InfoDetail>
      <Cautions>
      <p>예매 수수료는 예매일 이후 취소 시에는 환불되지 않습니다.</p>
      <p>단, 예매 당일 밤 12시 이전 취소 시에는 취소 수수료가 없음 (취소 기한내에 한함)</p>
      <p>취소수수료는 취소시점에 따라 달라지며, 취소 진행 시 확인 하실 수 있습니다.</p>
      </Cautions>
      <button>
        예매 취소
      </button>
      </RightSection>
      
      
    </Wrapper>
  );
};

export default TicketDetail;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  margin-bottom: 37px;
`;

const InfoImage = styled.div`
  flex: 1;
  img {
    width: ${(props) => props.width ? props.width : '500px'};
    height: ${(props) => props.height ? props.height : '704px'};
    background-color: #f0f0f0;
  }
`;

const InfoDetail = styled.div`
  flex: 2;
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
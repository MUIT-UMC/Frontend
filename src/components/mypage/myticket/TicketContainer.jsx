// components/detail/InfoWrapper.jsx
import React from "react";
import styled from "styled-components";
import ChevronRight from "../../../assets/icons/ChevronRight.svg";
const TicketContainer = ({ image, width, height, alt, details, valueWidth }) => {
  return (
    <Wrapper>
      <InfoImage>
        <img alt={alt} src={image}/>
      </InfoImage>
      <InfoDetail>
        <div>
          <span>미아 파밀리아 (Mia Famiglia)</span><span>2매</span>
        </div>
        {details.map(({ label, value, extra }, index) => (
          <Item key={index}>
            <Label>{label}</Label>
            <Value width={valueWidth}>{value}</Value>
          </Item>
        ))}
      </InfoDetail>
      <ChevronWrapper>
      <img src={ChevronRight} />
      </ChevronWrapper>
      
    </Wrapper>
  );
};

export default TicketContainer;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  width: 780px;
  padding: 12px 20px;
  padding-right: 4px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, #E6E6E6);

`;

const InfoImage = styled.div`
  img {
    width: ${(props) => props.width ? props.width : '140px'};
    height: ${(props) => props.height ? props.height : '200px'};
    background-color: #f0f0f0;
  }
`;

const InfoDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0px 40px;
  
  div > span {
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
  }
`;

const Item = styled.div`
  display: flex;
`;

const Label = styled.div`
width: 120px;
color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`;

const Value = styled.div`
  color: ${(props) => (props.color ? props.color : "#000")};
  width: ${(props) => (props.width ? props.width : "340px")};
  color: #000;

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
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

const ChevronWrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  height: 204px;
`
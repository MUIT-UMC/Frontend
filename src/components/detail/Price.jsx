// components/detail/InfoWrapper.jsx
import React from "react";
import styled from "styled-components";
import ChevronRight from "../../assets/icons/ChevronRight.svg";
import ArrowRight from "../../assets/icons/ArrowRight.svg";
const Price = ({ image, width, height, alt, details, valueWidth }) => {
  return (
        <div style={{display: 'flex', flexDirection:'column', gap:'10px'}}>
          <Value color='#A00000' fontSize='14px'>공동 구매시 20% 할인</Value>
          <div style={{display:'flex', flexDirection:'row'}}>
            <Value width='28px' color='#919191' marginRight='16px'>R석</Value>
            <Value width='68px' strikethrough='true' color='#919191' marginRight='6px'>70,000원</Value>
            <img src={ArrowRight} />
            <Value width='68px' marginLeft='8px'>56,000원</Value>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <Value width='28px' color='#919191' marginRight='16px'>S석</Value>
            <Value width='68px' strikethrough='true' color='#919191' marginRight='6px'>60,000원</Value>
            <img src={ArrowRight} />
            <Value width='68px' marginLeft='8px'>48,000원</Value>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <Value width='28px' color='#919191' marginRight='16px'>A석</Value>
            <Value width='68px'>40,000원</Value>
          </div>
        </div>
  );
};

export default Price;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  margin-bottom: 37px;
`;

const InfoImage = styled.div`
  flex: 1;
  img {
    width: ${(props) => props.width ? props.width : '320px'};
    height: ${(props) => props.height ? props.height : '320px'};
    background-color: #f0f0f0;
  }
`;

const InfoDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0px 40px;
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

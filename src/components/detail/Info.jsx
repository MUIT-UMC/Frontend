// components/detail/InfoWrapper.jsx
import React from "react";
import styled from "styled-components";
import ChevronRight from "../../assets/icons/ChevronRight.svg";
import ArrowRight from "../../assets/icons/ArrowRight.svg";
const Info = ({ image, width, height, alt, details, valueWidth }) => {
  return (
    <Wrapper>
      <InfoImage height={height}>
        <img alt={alt} src={image}/>
      </InfoImage>
      <InfoDetail>
        {details.map(({ label, value, extra }, index) => (
          <Item key={index}>
            <Label>{label}</Label>
            <div>
              <Value width={valueWidth}>{value}</Value>
              {extra && (
                <div style={{ display: "flex", flexDirection: "row", gap: "4px", marginTop: "11px" }}>
                  <SightLink>{extra.text}</SightLink>
                  <img src={ChevronRight} alt="Chevron Right" />
                </div>
              )}
            </div>
          </Item>
        ))}
      </InfoDetail>
    </Wrapper>
  );
};

export default Info;

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

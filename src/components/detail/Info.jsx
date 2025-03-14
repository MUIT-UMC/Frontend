// components/detail/InfoWrapper.jsx
import React from "react";
import styled from "styled-components";
import ChevronRight from "../../assets/icons/ChevronRight.svg";
import ArrowRight from "../../assets/icons/ArrowRight.svg";
const Info = ({ image, width, height, alt, details, valueWidth }) => {
  return (
    <Wrapper>
      {image && image.length > 0 &&
      <InfoImage height={height}>
         <img alt={alt} src={image}/>
      </InfoImage>}
      <InfoDetail>
        {details.map(({ label, value, extra }, index) => (
          <Item key={index}>
            <Label>{label}</Label>
            <div>

              <ValueWrapper>
              {/* Value가 배열일 경우: 가격을 표시할 경우*/}
              {Array.isArray(value) ? (
                  value.map((item, index) => (
                    <PriceWrapper key={index}>
                    <Value width='60px'  color='#919191'>
                      {item.seat}
                    </Value>
                    <Value width='80px' style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end'}}>
                    {item.price}
                  </Value>
                    </PriceWrapper>
                  ))
                ) : (
                  <Value width={valueWidth}>{value}</Value>
                )}
              </ValueWrapper>
              {/* extra 정보가 있을 경우 */}
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
  gap: 40px;
`;

const InfoImage = styled.div`
  display: flex;
  width: ${(props) => props.width ? props.width : '320px'};
  height: ${(props) => props.height ? props.height : '320px'};
  background:#F5F5F5;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
  img {
    max-width: 100%;
    max-height: 100%;
    background-color: #f0f0f0;
    object-fit: contain;
  }
`;

const InfoDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 28px;
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
  width: ${(props) => (props.width ? props.width : "300px")};
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

const ValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
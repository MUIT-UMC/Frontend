import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TicketDetail = ({ image, width, height, alt, details, valueWidth }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleCancelClick = () => {
    const currentUrl = window.location.pathname; // 현재 URL 가져오기
    navigate(currentUrl + '/cancel'); // '/cancel'을 URL 뒤에 추가하여 이동
  };

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
      <button onClick={handleCancelClick}>
        예매 취소
      </button>
      </RightSection>
      
      
    </Wrapper>
  );
};

export default TicketDetail;


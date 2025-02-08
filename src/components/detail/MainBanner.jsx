import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pic from "../../assets/images/miafamiglia-pic.png";
import ChevronDown from '../../assets/icons/ChevronDown.svg';

    function MainBanner({ 
      data
    }) {
      console.log("배경이미지",data.desImgUrl[0]);
      return (
        <BannerContainer backgroundImage={data.desImgUrl[0]}>
          <EngHeader className="candlescript-text">{data.fancyTitle}</EngHeader>
          <Header>{data.name}</Header>
          <TagWrapper>
            {/*data.tags.map((tag, index) => (
              <Tag key={index}>{data.tag}</Tag>
            ))*/}
          </TagWrapper>
          <Quote>{data.quote}</Quote>
          <Description>{data.description}</Description>
          <ChevronWrapper>
            <img src={ChevronDown} alt="Scroll Down" />
          </ChevronWrapper>
        </BannerContainer>
      );
    }
    
    export default MainBanner;
const BannerContainer = styled.div`
  background: linear-gradient(
      var(--Muit-Red-main, #A00000),
      rgba(160, 0, 0, 0.5)
    ),
   url(${pic}) no-repeat center center / cover;
  width: 1250px;
  height:822px;
  padding: 101px 95px;
  position: relative;
`;

const EngHeader = styled.div`
color: #FFF;
font-family: 'Candlescript', sans-serif;
font-size: 64px;
font-style: normal;
font-weight: 300;
line-height: normal;
margin-bottom: -50px;
`
const Header = styled.div`
  color: #FFF;
  /* Headline-lg-ko */
  margin:0;
  padding:0;
  margin-bottom:20px;
  font-family: Pretendard;
  font-size: 80px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.6px;
`

const ChevronWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  img {
    display: block;
  }
`;

const Quote = styled.blockquote`
  color: #FFF;
  font-family: 'KoPub_Batang_Medium', serif;
  margin: 0px;
  margin-bottom: 28px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.div`
  color: #FFF;
  width: 870px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  line-height: 30px; /* 156.25% */
`
const Tag = styled.li`
  display: flex;
  width: 120px;
  height: 28px;
  padding: 1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, rgba(230, 230, 230, 0.7));

  color: #FFF;

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
`


const TagWrapper = styled.ul`
  display:flex; 
  flexDirection:row;
  gap:12px;
  padding:0px;
  margin-bottom: 136px;
          
`
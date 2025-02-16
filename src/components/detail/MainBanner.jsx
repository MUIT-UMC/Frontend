import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pic from "../../assets/images/miafamiglia-pic.png";
import ChevronDown from '../../assets/icons/ChevronDown.svg';

    function MainBanner({ 
      data, onMoveToElement
    }) {
      console.log("배경이미지",data.desImgUrl[0]);
      // 줄바꿈 기준으로 p태그로 분리해줌
      const formattedDescription = data.storyDescription.split('\n\n').map((line, index) => (
        <p key={index}>{line}</p>
      ));
      return (
        <BannerContainer backgroundImage={data.desImgUrl[0]}>
          <EngHeader className="candlescript-text">{data.fancyTitle}</EngHeader>
          <Header>{data.name}</Header>
          <TagWrapper>
          <Tag>데이터</Tag>
          <Tag>나중에</Tag>
          <Tag>고치삼</Tag>
            {/*data.tags.map((tag, index) => (
              <Tag key={index}>{data.tag}</Tag>
            ))*/}
          </TagWrapper>
          <Quote>{data.quote}</Quote>
          <Description dangerouslySetInnerHTML={{ __html: data.storyDescription.replace(/\n/g, '<br />') }} />
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
  width: 740px;
  height: 400px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  line-height: 24px; /* 156.25% */
  margin: 12px 0px 12px 0px;
  overflow-y: auto;
 position: relative;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* 하단 흐려지는 효과 */
-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);
`;

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
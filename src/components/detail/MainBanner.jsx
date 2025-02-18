import React, { useState } from "react";
import styled from "styled-components";
import ChevronDown from '../../assets/icons/ChevronDown.svg';

function MainBanner({ data }) {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <BannerContainer>
      {/* 이미지 태그로 직접 불러오기 */}
      {!imgError ? (
        <BannerImage 
          src={data.bgImg} 
          alt="배너 이미지" 
          onError={handleImageError} 
        />
      ) : (
        <BannerImage 
          src="/path/to/default-image.jpg" 
          alt="기본 배너 이미지" 
        />
      )}
      
      {/* 오버레이와 내용 */}
      <Overlay />
      <Content>
        <EngHeader className="candlescript-text">{data.fancyTitle}</EngHeader>
        <Header>{data.name}</Header>
        <TagWrapper>
          {data?.category?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagWrapper>
        <Quote>{data.quote}</Quote>
        <Description dangerouslySetInnerHTML={{ 
          __html: data.storyDescription.replace(/\n/g, '<br />') 
        }} />
        <ChevronWrapper>
          <img src={ChevronDown} alt="Scroll Down" />
        </ChevronWrapper>
      </Content>
    </BannerContainer>
  );
}

export default MainBanner;

const BannerContainer = styled.div`
  position: relative;
  width: 1440px;
  height: 1024px;
  overflow: hidden;
    &:hover img {
    transform: scale(1.1);
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 108;
  left: 0;
  transition: transform 1s ease-in-out;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--Muit-Red-main, #A00000), rgba(160, 0, 0, 0.5));
  z-index: 1;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 101px 95px;
  padding-top: 190px;
  color: #FFF;
`;

const EngHeader = styled.div`
  font-family: 'Candlescript', sans-serif;
  font-size: 64px;
  font-weight: 300;
  margin-bottom: -50px;
`;

const Header = styled.div`
  font-family: Pretendard;
  font-size: 80px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const TagWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 0;
  margin-bottom: 136px;
`;

const Tag = styled.li`
  display: flex;
  width: 120px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 1px solid rgba(230, 230, 230, 0.7);
  font-size: 16px;
  font-weight: 500;
`;

const Quote = styled.blockquote`
  font-family: 'KoPub_Batang_Medium', serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const Description = styled.div`
  width: 740px;
  height: 380px;
  font-family: Pretendard;
  font-size: 16px;
  line-height: 24px;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);
`;

const ChevronWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  img {
    display: block;
  }
`;

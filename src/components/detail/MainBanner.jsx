import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pic from "../../assets/images/miafamiglia-pic.png";
import ChevronDown from '../../assets/icons/ChevronDown.svg';

function MainBanner() {
  return (
      <BannerContainer>
          <EngHeader className="candlescript-text">Mia Famiglia</EngHeader>
          <Header>미아 파밀리아</Header>
          <TagWrapper>
            <Tag>극중극</Tag>
            <Tag>드라마</Tag>
            <Tag>마피아 시리즈</Tag>
          </TagWrapper>
          <Quote>"뉴욕의 깊은 밤 길 잃은 멜로디 아폴로니아"</Quote>
          <Description>
            1930년대 대공황시대 뉴욕,<br/>
            실업자는 급증하고 금주령에도 불구하고 사람들은 더욱 더 술을 찾는 황량한 도시 밀주 사업으로 도시를 점령한<br/>
            마피아는 점차 세력을 넓혀가고 합법적인 도박장을 짓겠다며 일대 건물을 모두 사들인다.<br/>
            가난한 이탈리아 노동자들의 삶을 위로하는 '아폴로니아 인앤바(Apollonia Inn&Bar) 역시 마피아의 손에 넘어가 내일이면<br/>
            문을 닫아야 하고 '아폴로니아'에 남은 최후의 보드빌 배우 '리차드'와 '오스카'는 마지막 레퍼토리 공연 '브루클린 브릿지의 전설'을<br/>
            준비한다. 리차드는 마지막까지 관객과의 약속을 지키기 위해 공연 준비에 심혈을 기울이지만, 파트너이자 유일한 친구 오스카는 공연<br/>
            보다는 내일 있는 부잣집 아가씨와의 결혼 준비에 정신이 팔려 있다.<br/>
            무대가 인생의 전부였던 리차드는 내일이면 무대도, 친구도 모두 잃게 되지만 그 어느 누구도 탓할 수 없다.<br/>
            이때, 마피아 패밀리의 솔져 '스티비'가 들이닥치고 마피아 보스의 자서전 '미아 파밀리아'를 오늘밤 당장 공연하라고 협박한다.<br/>
            배우가 모자란 탓에 스티비까지 공연에 합류하게 되고, 서로 너무 다른 세 남자는 아슬아슬한 리허설을 시작하는데···<br/>
          </Description>   
          <ChevronWrapper>
            <img src={ChevronDown} style={{ display: 'block', marginTop: '20px' }} />
          </ChevronWrapper>
          
      </BannerContainer>
  )
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
font-family: 'Candlescript_Demo_Version', sans-serif;
font-size: 60px;
font-style: normal;
font-weight: 400;
line-height: normal;
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
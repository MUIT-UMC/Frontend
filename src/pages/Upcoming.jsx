// Pages/Upcoming.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormattedDate from "../components/date/FormattedDate";
// import useFetch from "../hooks/useFetch";
import useCustomFetch from "../hooks/useCustomFetch";
import { Link } from 'react-router-dom';

//const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");

const Upcoming = () => {
  const [activeIndex, setActiveIndex] = useState(0); // 현재 표시 중인 뮤지컬 인덱스
  const [todayMusicals, setTodayMusicals] = useState([]);
  const [ticketListMusicals, setTicketListMusicals] = useState([]);
  const [loading, setLoading] = useState(true);

  const todayUrl = "/musicals/open/today";
  const allUrl = "/musicals/open/all";

  const { data: todayData, error: todayError, loading: todayLoading } = useCustomFetch(todayUrl, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const { data: allData, error: allError, loading: allLoading } = useCustomFetch(allUrl, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  useEffect(() => {
    if (todayData && todayData.result) {
      const formattedTodayMusicals = todayData.result.map((musical) => ({
        id: musical.id,
        name: musical.name,
        image: musical.posterUrl,
        time: musical.openTime,
        extraInfo: musical.openInfo,
      }));
      setTodayMusicals(formattedTodayMusicals);
    }
  }, [todayData]);

  useEffect(() => {
    if (allData && allData.result && allData.result.content) {
      const formattedTicketListMusicals = allData.result.content.map((musical) => ({
        id: musical.id,
        name: musical.name,
        image: musical.posterUrl,
        date: musical.openDate,
        info: musical.openInfo,
        extraInfo: musical.place,
        dday:musical.dday,
      }));
      setTicketListMusicals(formattedTicketListMusicals);
    }
  }, [allData]);

  useEffect(() => {
    if (!todayLoading && !allLoading) {
      setLoading(false);
    }
  }, [todayLoading, allLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (todayError || allError) {
    return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;
  }


  const handleMusicalClick = (index) => {
    setActiveIndex(index); // 클릭한 뮤지컬의 인덱스를 저장
  };


  return (
    <>
    <Container>
      {/* 중앙 섹션 */}
      <MainSection>
        <Today>
          <h1>TODAY</h1>
          <p>오늘 티켓 오픈</p>
        </Today>
        <FeaturedMusical>
          {todayMusicals.map((musical, index) => (
            <div
              key={musical.id}
              className={`musical-item ${index === activeIndex ? "active" : ""}`}
              style={{ zIndex: index === activeIndex ? 2 : 1 }} // 클릭된 이미지가 위로
              onClick={() => handleMusicalClick(index)}
            >
              <CardLink to={musical ? `/detail/${musical.id}` : "#"}>
                <img src={musical.image} alt={musical.name} />
              </CardLink>
              {index === activeIndex && (
                <div className="details">
                  <div className="title">
                    {musical.name}
                     {musical.extraInfo&&(<span className="extra-info">{musical.extraInfo}</span>)}
                  </div>
                  <div className="datetime">오늘 {musical.time}</div>
                  <div className="info">{musical.extraInfo}</div>
                </div>
              )}
            </div>
          ))}
        </FeaturedMusical>
      </MainSection>

      {/* 하단 섹션 */}
      <TicketListWrapper>
        <TicketListTitle>티켓 오픈 예정
        <TicketList>
          {ticketListMusicals.map((musical) => (
           <MusicalItem key={musical.id}>
             <DdayBadge>{musical.dday}</DdayBadge> 
             <CardWrapper>
             <CardLink to={musical ? `/detail/${musical.id}` : "#"}>
                <img src={musical.image} alt={musical.name} />
              </CardLink>
             </CardWrapper>
              
              <div className="details">
               <div className="name">
                {musical.name}
                {musical.extraInfo&&(<span className="extra-info">{musical.extraInfo}</span>)}
                </div>
               <div className="datetime">{musical.date}</div>
               <div className="info">{musical.info}</div>
              </div>
          </MusicalItem>
        ))}
        </TicketList>
        </TicketListTitle>
      </TicketListWrapper>
      </Container>
    </>
  );
};


export default Upcoming;

// Styled Components

const Container = styled.div`
  max-width: 1440px;
  height: 864px;
  margin: 0 auto;
  position: relative;
`;
const MainSection = styled.div`
  display: flex;
  position: relative; /* 자식 요소의 위치 조정을 위한 설정 */
`;

const Today = styled.div`
  flex: 1;
  padding-left: 100px; /* 더 왼쪽으로 밀기 위해 padding 증가 */
  margin-top: 378px;
  margin-bottom: 398px;
  position: relative;

  h1 {

    color: #A00000;
font-family: "BelgianoSerif";
margin: 0;
font-size: 60px;
font-style: normal;
font-weight: 400;
line-height: normal;
  }

  p {
    font-size: 1rem;
    margin: 0;
    font-weight: bold;
    font-family: Pretendard;
  }
`;

const FeaturedMusical = styled.div`
  flex: 1;
  position: relative;
  margin-top: 152px;
  margin-right: 609px;
  font-family: Pretendard;

  .musical-item {
    position: absolute;
    left: 0;
    transition: all 0.3s ease; /* 부드러운 전환 효과 */
    cursor: pointer;
    
    img {
      height: 584px;
      object-fit: cover;
    }

    .details {
      margin-top: 16px;
      color: black;

      .title {
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 20px;

      }

      .datetime {
       font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 25px; /* 156.25% */
      margin-bottom: 4px;
      }

      .info {
        font-size: 1rem;
        color: #919191;
      }
      .extra-info{
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px;
        margin-left: 8px;
      }
    }
  }

  .musical-item:nth-child(2) {
    left: 250px; /* 두 번째 이미지를 오른쪽으로 이동 */
  }

  .musical-item.active {
    z-index: 2; /* 활성화된 이미지가 위로 올라옴 */
  }
`;

const TicketListWrapper = styled.div`
  position: relative; /* 자식 요소 위치를 조정하기 위해 설정 */
`;

const TicketListTitle = styled.div`
  font-family: Pretendard;
  position: absolute;
  left: 97px; /* 왼쪽 여백 */
  font-size: 35px;
  font-weight: bold;
  color: black; /* 적절한 색상 선택 */ 
  margin-top: 60px;
`;

const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 행에 4개씩 배치 */
  gap: 80px; /* 각 사진 간의 간격 */
  justify-content: center; /* 그리드가 중앙 정렬되도록 설정 */
  padding-left: 48px; 
  margin-top: 37px;
  margin-bottom: 45px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MusicalItem = styled.div`
  position: relative;
  text-align: left;
  font-family: Pretendard;
  overflow: hidden;
 
  img {
    height: 320px;
    width: 228.571px;
    object-fit: cover; /* 이미지가 박스를 가득 채우고 비율을 유지하도록 설정 */
    margin: 0; /* 이미지 간의 마진을 없앰 */
  }

  .details {
    margin-top: 10px;
    font-size: 0.9rem;

    .name {
     font-style: normal;  
    font-weight: 700;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .datetime {
      color: black;
      font-size: 16px;
      margin-bottom: 4px;
      font-style: normal;
      font-weight: 500;
      line-height: 25px; /* 156.25% */
    }

    .info {
      color: #919191;
      font-size: 16px;
      font-weight: normal;
    }

    .extra-info{
        font-size: 16px;
        font-weight: normal;
        margin-left: 8px;
        font-weight: 500;
        line-height: 25px; /* 156.25% */
      }
    
  }
`;
const DdayBadge = styled.div`
  position: absolute;
  top: 13px;  /* 기존보다 아래로 이동 */
  left: 11px; /* 기존보다 오른쪽으로 이동 */
width: 35px;
height: 20px;
display: flex;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
background: #FFF;
color: #A00000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const CardLink = styled(Link)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  
`;

const CardWrapper = styled.div`
&:hover {
  transform: scale(1.04);
  transition: transform 0.2s ease;
}
`
// Pages/Upcoming.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import axios from "axios";

// Mock 데이터
const mockTodayMusical = [
  {
    id: 1,
    name: "베르테르",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhu1LYwXx-Eq6-QrtTz-JYHNhuO_o6fZarhQ&s",
    time: "11:00",
  },
  {
    id: 2,
    name: "미아 파밀리아",
    image: "https://image.yes24.com/themusical/fileStorage/ThemusicalAdmin/Play/Image/20200401094018e1ae4d9f808343ea8365cc3c662d59e3.jpg",
    time: "11:00",
  },
];


const mockTicketListMusicals = [
  {
    id: 1,
    name: "종의 기원",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif",
    date: "2025-01-20",
    time: "11:00",
  },
  {
    id: 2,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    date: "2025-01-20",
    time: "14:00",
  },
  {
    id: 3,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    date: "2025-01-25",
    time: "14:00",
  },
  {
    id: 4,
    name: "여신님이 보고계셔",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
    date: "2025-01-30",
    time: "16:00",
  },
  {
    id: 5,
    name: "종의 기원",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif",
    date: "2025-01-20",
    time: "11:00",
  },
  {
    id: 6,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    date: "2025-01-20",
    time: "14:00",
  },
  {
    id: 7,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    date: "2025-01-25",
    time: "14:00",
  },
  {
    id: 8,
    name: "여신님이 보고계셔",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
    date: "2025-01-30",
    time: "16:00",
  },
  {
    id: 9,
    name: "종의 기원",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif",
    date: "2025-01-20",
    time: "11:00",
  },
  {
    id: 10,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    date: "2025-01-20",
    time: "14:00",
  },
  {
    id: 11,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    date: "2025-01-25",
    time: "14:00",
  },
  {
    id: 12,
    name: "여신님이 보고계셔",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
    date: "2025-01-30",
    time: "16:00",
  },
];

const Upcoming = () => {
  const [todayMusicals, setTodayMusicals] = useState([]);
  const [TicketListMusicals, setTicketListMusicals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusicals = async () => {
      try {
        // const response = await axios.get("/api/musicals");
        // setMusicals(response.data);

        //Mock 데이터
        setTodayMusicals(mockTodayMusical);
        setTicketListMusicals(mockTicketListMusicals);
      } catch (error) {
        console.error("Error fetching musicals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* 중앙 섹션 */}
      <MainSection>
        <Today>
          <h1>TODAY</h1>
          <p>오늘 티켓 오픈</p>
        </Today>
        <FeaturedMusical>
  {todayMusicals.map((musical, index) => (
    <img 
      key={musical.id} 
      src={musical.image} 
      alt={musical.name} 
      style={{ zIndex: index === 0 ? 1 : -1 }} 
    />
  ))}
</FeaturedMusical>
      </MainSection>

      {/* 하단 섹션 */}
      <TicketListWrapper>
        <TicketListTitle>티켓 오픈 예정</TicketListTitle>
        <TicketList>
          {TicketListMusicals.map((musical) => (
           <MusicalItem key={musical.id}>
              <img src={musical.image} alt={musical.name} />
              <div className="details">
               <div className="name">{musical.name}</div>
               <div className="datetime">
                  {musical.date} / {musical.time}
               </div>
              </div>
          </MusicalItem>
        ))}
        </TicketList>
      </TicketListWrapper>
    </>
  );
};


export default Upcoming;

// Styled Components

const MainSection = styled.div`
  display: flex;
  height: calc(100vh - 160px); /* 높이를 늘려 이미지가 더 아래로 내려가도록 설정 */
  margin-bottom: 180px;
  position: relative; /* 자식 요소의 위치 조정을 위한 설정 */
`;

const Today = styled.div`
  flex: 1;
  padding-left: 100px; /* 더 왼쪽으로 밀기 위해 padding 증가 */
  margin-top: 378px;
  margin-bottom: 398px;
  position: relative;

  h1 {
    font-size: 4rem;
    margin: 0;
    color: #A00000;
    font-family: "BelgianoSerif";
    font-weight: 400;
  }

  p {
    font-size: 1rem;
    margin: 0;
    font-weight: bold;
  }
`;

const FeaturedMusical = styled.div`
  flex: 1;
  padding-left: 136px; /* 이미지와 "Today" 간격 늘리기 */
  padding-right: 609px;
   /* 아래로 더 이동 */
  margin-top: 100px; /* 네비게이션 바 아래로 간격을 추가 */
  position: relative;


  img {
    height: 584px;
    object-fit: cover;
    position: absolute; /* 이미지들을 겹치게 배치 */
    left: 0; /* 첫 번째 이미지는 기본 위치 */
  }

  img:nth-child(2) {
    left: 250px; /* 두 번째 이미지를 오른쪽으로 이동 */
    z-index: -1; /* 첫 번째 이미지 뒤에 배치 */
  }
`;
const TicketListWrapper = styled.div`
  position: relative; /* 자식 요소 위치를 조정하기 위해 설정 */
  margin-top: 60px; /* 상단 섹션과의 간격 */
`;

const TicketListTitle = styled.div`
  position: absolute;
  left: 97px; /* 왼쪽 여백 */
  font-size: 35px;
  font-weight: bold;
  color: black; /* 적절한 색상 선택 */
  margin-bottom: 32px; 

`;


const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 행에 4개씩 배치 */
  gap: 80px; /* 각 사진 간의 간격 */
  justify-content: center; /* 그리드가 중앙 정렬되도록 설정 */
  padding-left: 145px; 
  padding-right: 145px; 
 

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MusicalItem = styled.div`
  text-align: center;
  margin-top: 140px;
  gap:80px;

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
      font-weight: bold;
      font-size: 1rem;
      margin-bottom: 5px;
    }

    .datetime {
      color: #555;
    }
  }
`;


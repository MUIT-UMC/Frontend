import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormattedDate from "../components/date/FormattedDate";
import { useNavigate } from "react-router-dom";

//import axios from "axios";

const mockData = [
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

const SmallTheater=()=>{
    const [SmallMusicals,setSmallMusicals]=useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

   useEffect(() => {
       const fetchMusicals = async () => {
         try {
           // const response = await axios.get("/api/musicals");
           // setMusicals(response.data);
   
           //Mock 데이터
           setSmallMusicals(mockData);

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
    return(
        <>
         <TicketListWrapper>
         <TicketListTitle onClick={() => navigate("/register-musical")} clas>
          {"등록하러가기 ⇨"}
        </TicketListTitle>
        <TicketList>
          {SmallMusicals.map((musical) => (
           <MusicalItem key={musical.id}>
              <img src={musical.image} alt={musical.name} />
              <div className="details">
               <div className="name">{musical.name}</div>
               <div className="datetime">
                  <FormattedDate date={musical.date}/> {musical.time}
               </div>
              </div>
          </MusicalItem>
        ))}
        </TicketList>
      </TicketListWrapper>
        </>
    )

}

export default SmallTheater;

const TicketListWrapper = styled.div`
  position: relative; /* 자식 요소 위치를 조정하기 위해 설정 */
  margin-top: 31px; /* 상단 섹션과의 간격 */
`;

const TicketListTitle = styled.div`
  position: absolute;
  right: 84px; /* 오른쪽쪽 여백 */
  font-size: 16px;
  font-weight: bold;
  color: #A00000; /* 적절한 색상 선택 */
  margin-bottom: 31px; 
  cursor: pointer; /* 커서 변경 */
`;


const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 행에 4개씩 배치 */
  gap: 80px; /* 각 사진 간의 간격 */
  justify-content: center; /* 그리드가 중앙 정렬되도록 설정 */
  padding-left: 145px; 
  padding-right: 145px; 
}
`;

const MusicalItem = styled.div`
  text-align: left;
  margin-top: 62px;
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
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    }

    .datetime {
      color: black;
    }
  }
`;


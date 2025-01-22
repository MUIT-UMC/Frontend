import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormattedDate from "../components/date/FormattedDate";
import { useNavigate } from "react-router-dom";

//import axios from "axios";

const mockData = [
    {
      id: 1,
      name: "실종",
      image: "https://s3-alpha-sig.figma.com/img/a2b8/d604/235c8d162f6bd395d254e8ad50658ba1?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=miBOJM5zDybkWKh6th~0e6iYyIjcKtMOMt343ceQvUeGelbLYYa3LE2bEsHa8A4b~RJw7EML6T3MPVRNuXSZqxPVXwKR11XK2fhjc1DgLqzHGke2unn3L-R5Xc--z0Ei4eF5v7dAsd-Hc4fnqYPWT7oMPfCTaRjcOd8mbn7EB097G~TQwpkGatOtkgE9HpQ4-D1ewXAYBeQf3TGAqAXIQflbLNILYhWRsauWGY3ZggSd5B-OFUND7-caIdh2Lra3rCnxS6pah846GsSUdL732AhbgUDruTyWofHpsdwAVlWf6Dl2cDfGOuXIgaXog4bS6PFYIsxT2OMBNxGCevFRSQ__",
      date: "2025-10-03",
      time: "19:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 2,
      name: "실종",
      image: "https://s3-alpha-sig.figma.com/img/a2b8/d604/235c8d162f6bd395d254e8ad50658ba1?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=miBOJM5zDybkWKh6th~0e6iYyIjcKtMOMt343ceQvUeGelbLYYa3LE2bEsHa8A4b~RJw7EML6T3MPVRNuXSZqxPVXwKR11XK2fhjc1DgLqzHGke2unn3L-R5Xc--z0Ei4eF5v7dAsd-Hc4fnqYPWT7oMPfCTaRjcOd8mbn7EB097G~TQwpkGatOtkgE9HpQ4-D1ewXAYBeQf3TGAqAXIQflbLNILYhWRsauWGY3ZggSd5B-OFUND7-caIdh2Lra3rCnxS6pah846GsSUdL732AhbgUDruTyWofHpsdwAVlWf6Dl2cDfGOuXIgaXog4bS6PFYIsxT2OMBNxGCevFRSQ__",
      date: "2025-10-03",
      time: "19:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 3,
      name: "실종",
      image: "https://s3-alpha-sig.figma.com/img/a2b8/d604/235c8d162f6bd395d254e8ad50658ba1?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=miBOJM5zDybkWKh6th~0e6iYyIjcKtMOMt343ceQvUeGelbLYYa3LE2bEsHa8A4b~RJw7EML6T3MPVRNuXSZqxPVXwKR11XK2fhjc1DgLqzHGke2unn3L-R5Xc--z0Ei4eF5v7dAsd-Hc4fnqYPWT7oMPfCTaRjcOd8mbn7EB097G~TQwpkGatOtkgE9HpQ4-D1ewXAYBeQf3TGAqAXIQflbLNILYhWRsauWGY3ZggSd5B-OFUND7-caIdh2Lra3rCnxS6pah846GsSUdL732AhbgUDruTyWofHpsdwAVlWf6Dl2cDfGOuXIgaXog4bS6PFYIsxT2OMBNxGCevFRSQ__",
      date: "2025-10-03",
      time: "19:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 4,
      name: "실종",
      image: "https://s3-alpha-sig.figma.com/img/a2b8/d604/235c8d162f6bd395d254e8ad50658ba1?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=miBOJM5zDybkWKh6th~0e6iYyIjcKtMOMt343ceQvUeGelbLYYa3LE2bEsHa8A4b~RJw7EML6T3MPVRNuXSZqxPVXwKR11XK2fhjc1DgLqzHGke2unn3L-R5Xc--z0Ei4eF5v7dAsd-Hc4fnqYPWT7oMPfCTaRjcOd8mbn7EB097G~TQwpkGatOtkgE9HpQ4-D1ewXAYBeQf3TGAqAXIQflbLNILYhWRsauWGY3ZggSd5B-OFUND7-caIdh2Lra3rCnxS6pah846GsSUdL732AhbgUDruTyWofHpsdwAVlWf6Dl2cDfGOuXIgaXog4bS6PFYIsxT2OMBNxGCevFRSQ__",
      date: "2025-10-03",
      time: "19:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 5,
      name: "종의 기원",
      image: "https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif",
      date: "2025-01-20",
      time: "11:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 6,
      name: "페인터즈",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
      date: "2025-01-20",
      time: "14:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 7,
      name: "페인터즈",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
      date: "2025-01-25",
      time: "14:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 8,
      name: "여신님이 보고계셔",
      image: "https://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
      date: "2025-01-30",
      time: "16:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 9,
      name: "종의 기원",
      image: "https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif",
      date: "2025-01-20",
      time: "11:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 10,
      name: "페인터즈",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
      date: "2025-01-20",
      time: "14:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 11,
      name: "페인터즈",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
      date: "2025-01-25",
      time: "14:00",
      info: "홍익대학교 학생회관 3층 소극장",
    },
    {
      id: 12,
      name: "여신님이 보고계셔",
      image: "https://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
      date: "2025-01-30",
      time: "16:00",
      info: "홍익대학교 학생회관 3층 소극장",
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
        <Container>
         <TicketListTitle>현재 진행중인 소극장 공연
            </TicketListTitle>  
         <TicketListEnroll onClick={() => navigate("/register-musical")} clas>
          {"공연 등록하기"}
        </TicketListEnroll>
        </Container>
        <DropdownWrapper>
        <Dropdown name="region">
          <option value="">지역 선택</option>
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
          <option value="daegu">대구</option>
          <option value="incheon">인천</option>
          <option value="gwangju">광주</option>
          <option value="daejeon">대전</option>
        </Dropdown>
      </DropdownWrapper>
        <TicketList>
          {SmallMusicals.map((musical) => (
           <MusicalItem key={musical.id}>
              <img src={musical.image} alt={musical.name} />
              <div className="details">
               <div className="title">{musical.name}</div>
               <div className="info">{musical.info}</div>
               <div className="datetime">
                  2024.<FormattedDate date={musical.date}/> {musical.time}
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
max-width: 1440px;
  height: 864px;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬을 중앙으로 */
  margin-top: 100px;
  gap: 740px; /* Title과 Enroll 사이 간격 */
`;

const TicketListTitle = styled.div`
  margin-left: 100px;
  font-family: Pretendard;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.72px;
`;

const TicketListEnroll = styled.div`
margin-right: 100px;
 font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; 
color: #FFF; /* 적절한 색상 선택 */

background-color: #A00000;
display: flex;
width: 100px;
height: 28px;
padding: 4px 12px;
justify-content: center;
align-items: center;
gap: 10px;
flex-shrink: 0;
border-radius: 3px;
  cursor: pointer; /* 커서 변경 */
`;


const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 행에 4개씩 배치 */
  gap: 80px; /* 각 사진 간의 간격 */
  justify-content: center; /* 그리드가 중앙 정렬되도록 설정 */
  margin-left: 135px;
  margin-right: 135px;
  margin-top: 93px;
  margin-bottom: 45px;

  }
`;

const MusicalItem = styled.div`
  text-align: left;
  font-family: Pretendard;
  margin-bottom: -25px;
 
  img {
    height: 320px;
    width: 228.571px;
    object-fit: cover; /* 이미지가 박스를 가득 채우고 비율을 유지하도록 설정 */
    margin: 0; /* 이미지 간의 마진을 없앰 */
  }

  .details {
    margin-top: 15px;
    font-size: 0.9rem;

    .title {
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 18px;

      }

      .datetime {
color: #919191;

/* body-16-medium */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
    
      }

      .info {
        color: #000;

      /* body-16-medium */
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 25px; 
    margin-bottom: 4px;
      }
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 100px;
  margin-top: 32px;
`;

const Dropdown = styled.select`
  color: var(--Gray-sub, #919191);

font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
display: flex;
width: 104px;
height: 28px;
padding: 4px 12px;
align-items: center;
gap: 4px;
position: absolute;
border-radius: 2px;
border: 1px solid var(--Gray-sub, #919191);
background: var(--Gray-white-bg, #FFF);
cursor: pointer
`;
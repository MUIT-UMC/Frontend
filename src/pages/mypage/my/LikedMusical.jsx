import React from "react";
import BoardMenu from "../../../components/board/BoardMenu";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Heart from "../../../assets/icons/heart-full.svg"
import useFetch from "../../../hooks/useFetch";
const token = localStorage.getItem("token");

const mockData = [
  {
    id: 1,
    name: "종의 기원",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif",
    during: "2024.12.19 ~2025.03.23",
    location: "링크아트센터드림 드림1관",
   info: "일반예매",
  },
  {
    id: 2,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    during: "2024.12.19 ~2025.03.23",
    location: "링크아트센터드림 드림1관",
   extraInfo: "서대문 전용관",
  },
  {
    id: 3,
    name: "페인터즈",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGxX1Z8cUHHnvtIe87AtR0rFGbi8Q2PRd9Q&s",
    during: "2024.12.19 ~2025.03.23",
    location: "링크아트센터드림 드림1관",
   extraInfo: "광화문 전용관",
  },
  {
    id: 4,
    name: "여신님이 보고계셔",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
    during: "2024.12.19 ~2025.03.23",
    location: "링크아트센터드림 드림1관",
    
  },
  {
    id: 5,
    name: "종의 기원",
    image: "https://ticketimage.interpark.com/Play/image/large/24/24016611_p.gif",
    during: "2024.12.19 ~2025.03.23",
    location: "링크아트센터드림 드림1관",
  },
];



function LikedMusical() {

  const navigate = useNavigate();
  const url = `/member/likeMusicals`;

  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },);
  console.log(data);

  
  return (
    <Container>
      <MusicalList>
        {data?.result?.map((musical) => (
          <Card key={musical.id} onClick={() => navigate(`/detail/${musical.id}`)}>
            <Image src={musical.posterUrl} alt={musical.name} />
            <CardHeader>
              <CardTitle>{musical.name}</CardTitle>
              <LikeButton>
                <img src={Heart} alt="Like" width={24} height={24}/>
              </LikeButton>
            </CardHeader>
            <Theater>{musical.place}</Theater>
            <Period>{musical.duration}</Period>
          </Card>
        ))}
      </MusicalList>
    </Container>
  );
}

export default LikedMusical;

// Styled Components
const Container = styled.div`
  display: flex;
  max-width: 1440px;
  height: 864px;
  margin-top:30px;
`;


const MusicalList = styled.div`
  display: grid;
 grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개 */
  gap: 6px; /* 카드 간 간격 */
  margin-left: -35px;

`;

const Card = styled.div`
  padding: 16px;
  text-align: center;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`;

const Image = styled.img`
display: flex;
width: 228.571px;
height: 320px;
padding: 12px 20px;
flex-direction: column;
align-items: flex-start;
gap: 8px;
flex-shrink: 0;
`;

const CardTitle = styled.h3`
color: #000;
text-align: left;
 margin-left: 20px;
 margin-top: 6px;


/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Theater = styled.p`
color: #000;
text-align: left;
 margin-left: 20px;
  margin-top: -5px;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Period = styled.p`
color: #919191;
text-align: left;
 margin-left: 20px;
  margin-top: -8px;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  margin-top:-13px;
`;

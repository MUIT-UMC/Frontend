import React from "react";
import BoardMenu from "../../../components/board/BoardMenu";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Heart from "../../../assets/icons/heart-full.svg"
import useFetch from "../../../hooks/useFetch";
const token = localStorage.getItem("accessToken");


function LikedMusical() {

  const navigate = useNavigate();
  const url = `/member/likeMusicals`;

  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },[token]);
  console.log(data);

  
  return (
    
    <Container>
          {loading && <div style={{marginTop:'32px'}}>로딩 중...</div>}
          {error && <div style={{marginTop:'32px'}}>에러 발생: {error}</div>}
       {data?.result?.length > 0 ? (
        <MusicalList>
          {data.result.map((musical) => (
            <Card key={musical.id} onClick={() => navigate(`/detail/${musical.id}`)}>
              <Image src={musical.posterUrl} alt={musical.name} />
              <CardHeader>
                <CardTitle>{musical.name}</CardTitle>
                <LikeButton>
                  <img src={Heart} alt="Like" width={24} height={24} />
                </LikeButton>
              </CardHeader>
              <Theater>{musical.place}</Theater>
              <Period>{musical.duration}</Period>
            </Card>
          ))}
        </MusicalList>
      ) : (
        <p style={{marginTop:'32px'}}>좋아요한 뮤지컬이 없습니다.</p>
      )}
    </Container>
  );
}

export default LikedMusical;

// Styled Components
const Container = styled.div`
  display: flex;
  max-width: 1440px;
  
`;


const MusicalList = styled.div`
  display: grid;
 grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개 */
  gap: 6px; /* 카드 간 간격 */
  margin-left: -35px;
margin-top:30px;
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
&:hover {
  transform: scale(1.04);
  transition: transform 0.2s ease;
}
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
 overflow: hidden;
  white-space: nowrap; /* 한 줄로 표시 */
  text-overflow: ellipsis; /* 말줄임(...) 적용 */
  max-width: 180px; /* 최대 너비 설정 (적절히 조절) */
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
 overflow: hidden;
  white-space: nowrap; /* 한 줄로 표시 */
  text-overflow: ellipsis; /* 말줄임(...) 적용 */
  max-width: 226px; /* 최대 너비 설정 (적절히 조절) */
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

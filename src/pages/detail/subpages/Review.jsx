import React from "react";
import styled from "styled-components";
import starFull from '../../../assets/icons/star-full.svg';
import starOutline from '../../../assets/icons/star-outline.svg';
import ReviewContainer from "../../../components/detail/ReviewContainer";
import { RatingStars } from "../../../components/detail/RatingStars";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

function Review({ musicalName }) {

  const navigate = useNavigate();

  const [postType] = useState("REVIEW");
    const [currentPage, setCurrentPage] = useState(0);
    const [size] = useState(5); // 한 페이지당 게시물 수
    const [searchParams, setSearchParams] = useState({
      musicalName: "",
      location: "",
    });
  
    const queryString = new URLSearchParams({
      postType,
      page: currentPage,
      size,
      musicalName: musicalName,
    }).toString();
  
    const url = `/reviews?${queryString}`;

  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  console.log('상세 리뷰 데이터', data?.result?.posts
  );


  const calculateAverageRating = (posts) => {
    if (!posts || posts.length === 0) {
      console.log("포스트가 없습니다.");
      return 0; }
      ;
  
    const totalRating = posts.reduce((sum, post) => sum + post.rating, 0);
    return (totalRating / posts.length).toFixed(1); // 소수점 2자리까지 표시
  };
  
  const reviewAverage = calculateAverageRating(data?.result?.posts);
  
  console.log(reviewAverage);

  return (
    <>
      <Text fontWeight='700'>게시판 운영 규정</Text>
      <Text color="#919191">게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.
        특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가
        주시기 바랍니다. 사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 뮤잇 게시판 작성 권한이 제한됩니다.</Text>
      <Header>
        <Left>
        <Title>관람 평점</Title>
        <RatingWrapper>
          {/*<RatingStars rating={reviewAverage} starSize={36}/>*/}
          <img src={starFull} style={{width: '36px'}}/>
          <Rating>{reviewAverage}</Rating>
        </RatingWrapper>
        </Left>
        <Button onClick={() => navigate(`/board/review/write`)}>후기 작성하기</Button>
      </Header>
      
      <Content>
        {/*
        <Form>
        <select name="language" >
          <option value="korean" selected>최신순</option>
          <option value="english">영어</option>
          <option value="chinese">중국어</option>
          <option value="spanish">스페인어</option>
        </select>
      </Form>
         */}
        {data?.result?.posts?.map((d) => (
            <ReviewContainer data={d} />
        ))}

      </Content>
   </>
    
  );
}

export default Review;

const Header = styled.div`
display: flex;
flex-direction: row;
border-bottom: 1px solid #E6E6E6;
height: 70px;
width: 100%;
justify-content: space-between;
align-items: center;
`

const Title = styled.div`
color: #000;

/* Title-md */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const Text = styled.div`
color: ${(props) => props.color ? props.color : '#000'};

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: ${(props) => props.fontWeight ? props.fontWeight : '500'};
line-height: 25px; /* 156.25% */
`


const Left = styled.div`
display: flex;
align-items:center;
height: 100%;
gap: 20px;
`;

const RightSection = styled.div`
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Rating = styled.div`
  color: var(--Muit-Red-main, #A00000);
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  margin-left: 8px;  /* 이미지와 텍스트 간의 간격 조정 */
`;

const Button = styled.button`
 display: flex;
    height: 28px;
    padding: 5px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 3px;
    background: ${(props) => props.background ? props.background :'#A00000'};
    border: 1px solid var(--Muit-Red-main, #A00000);
    margin: 0px;
    margin-bottom: ${(props) => props.marginBottom? props.marginBottom : '0px' };

    color: ${(props) => props.color ? props.color : '#FFF' };

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;

`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 20px;
`

const Form = styled.form`
  select {
    display: flex;
    width: 92px;
    height: 28px;
    padding: 4px 12px;
    align-items: center;
    gap: 4px;
    border-radius: 3px;
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-white-bg, #FFF);
    color: var(--Gray-sub, #919191);

    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 156.25% */

  option {
        color: var(--Gray-sub, #919191);

    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 156.25% */
      }
  }
`
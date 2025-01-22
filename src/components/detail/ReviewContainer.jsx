import React from "react";
import styled from "styled-components";
import starFull from '../../assets/icons/star-full.svg';
import starOutline from '../../assets/icons/star-outline.svg';
  const ReviewContainer = ({ data }) => {
    const { title, author, date, rating, reviewText } = data;
  
    // 별점 개수 계산
    const fullStars = Math.floor(rating);
    const outlineStars = 5 - fullStars;
  
    return (
      <Container>
        <Top>
          <Title>{title}</Title>
          <Text color="#919191">{`${author} | ${date}`}</Text>
        </Top>
        <RatingWrapper>
          {Array(fullStars)
            .fill()
            .map((_, i) => (
              <img key={`full-${i}`} src={starFull} alt="Star Full Icon" />
            ))}
          {Array(outlineStars)
            .fill()
            .map((_, i) => (
              <img key={`outline-${i}`} src={starOutline} alt="Star Outline Icon" />
            ))}
          <Rating>{`${rating.toFixed(1)}/5.0`}</Rating>
        </RatingWrapper>
        <Text>{reviewText}</Text>
        <Bottom>
          <Text color="#919191">더보기</Text>
        </Bottom>
      </Container>
    );
  };
export default ReviewContainer;

const Container = styled.div`
border-radius: 3px;
border: 1px solid var(--Gray-outline, #E6E6E6);
background: #FFF;
padding: 20px;
width: 780px;
`
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled.div`
color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const Text = styled.div`
color: ${(props) => props.color? props.color: '#000'};

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`

const RatingWrapper = styled.div`
  display:flex; 
  flexDirection: row;
  margin-top:8px;
  margin-bottom: 20px;
`;

const Rating = styled.div`
color: #000;

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px; /* 150% */
margin-left: 4px;
`

const Bottom = styled.div`
display: flex;
justify-content: center;
padding-top: 12px;
padding-bottom: 0px;
`
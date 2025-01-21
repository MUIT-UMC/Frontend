import React from "react";
import styled from "styled-components";
import starFull from '../../../assets/icons/star-full.svg';
import starOutline from '../../../assets/icons/star-outline.svg';
import ReviewContainer from "../../../components/detail/ReviewContainer";

function Review() {
  const reviewData = [
    {
      title: "알라딘 관람 후기",
      author: "최윤경",
      date: "2025-01-05",
      rating: 4.5,
      reviewText:
        "알라딘 뮤지컬은 진짜 꿈같은 시간이었어요. 시작부터 끝까지 눈을 뗄 수 없는 화려한 무대 연출과 배우들의 열정적인 연기가 정말 감동적이었어요. 특히 지니 캐릭터는 예상보다 훨씬 더 유쾌하고 재치 넘쳐서 웃음이 끊이지 않았어요. 'A Whole new ∙∙∙",
    },
    {
      title: "라이온 킹 관람 후기",
      author: "김민수",
      date: "2024-12-25",
      rating: 5.0,
      reviewText:
        "라이온 킹은 어렸을 적 추억을 다시 떠올리게 하는 멋진 공연이었어요. 특히 'Circle of Life' 장면에서는 눈물이 나올 정도로 감동적이었어요. 무대 연출과 음악, 그리고 배우들의 목소리까지 완벽했습니다.",
    },
    {
      title: "위키드 관람 후기",
      author: "이수진",
      date: "2025-01-15",
      rating: 4.0,
      reviewText:
        "위키드는 늘 기대를 저버리지 않는 뮤지컬이에요. 특히 엘파바의 솔로곡에서 나오는 감정은 정말 소름이 돋을 정도였습니다. 다만, 일부 장면에서 음향이 조금 아쉬웠어요.",
    },
  ];
  
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
          <img src={starFull} alt="Star Full Icon" style={{width: '36px', height: '36px'}}/>
          <img src={starFull} alt="Star Full Icon" style={{width: '36px', height: '36px'}}/>
          <img src={starFull} alt="Star Full Icon" style={{width: '36px', height: '36px'}}/>
          <img src={starFull} alt="Star Full Icon" style={{width: '36px', height: '36px'}}/>
          <img src={starOutline} alt="Star Outline Icon" style={{width: '36px', height: '36px'}}/>
          <Rating>4.0</Rating>
        </RatingWrapper>
        </Left>
        <Button>후기 작성하기</Button>
      </Header>
      
      <Content>
      <Form>
        <select name="language" >
          <option value="korean" selected>최신순</option>
          <option value="english">영어</option>
          <option value="chinese">중국어</option>
          <option value="spanish">스페인어</option>
        </select>
      </Form>
        {reviewData.map((data) => (
            <ReviewContainer data={data} />
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
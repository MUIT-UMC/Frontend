import React from "react";
import styled from "styled-components";
import itemImg from "../../assets/images/lost-item-1.png";
import CommentInputArea from "../../components/post/CommentInputArea";
import Comment from "../../components/post/Comment";
import Reply from "../../components/post/Reply";
import Info from "../../components/detail/Info";
import { RatingStars } from "../../components/detail/RatingStars";

function ReviewPost() {

  
  const title = "알라딘 관람 후기";
  const board = "뮤지컬 리뷰";
  const user = "익명";
  const date = "2025-01-05";
  const image = itemImg;
    const details = [
      { label: "뮤지컬명", value: "알라딘"},
      { label: "장소", value: "링크아트센터드림 드림1관" },
      { label: "평점", value: <RatingStars rating={5} starSize={36}/> },
      { label: "특징", value: "알라딘 뮤지컬은 진짜 꿈같은 시간이었어요. 시작부터 끝까지 눈을 뗄 수 없는 화려한 무대 연출과 배우들의 열정적인 연기가 정말 감동적이었어요. 특히 지니 캐릭터는 예상보다 훨씬 더 유쾌하고 재치 넘쳐서 웃음이 끊이지 않았어요. 'A Whole New World' 장면은 라이브로 보니 감동이 배가 되더라고요. 저는 2층 중앙 좌석에서 봤는데, 전체 무대가 한눈에 들어와서 연출을 제대로 감상할 수 있었어요. 가족들과 함께한 시간이 정말 소중하게 느껴졌습니다." },
    ];
  return (
    <>
      <ReviewPostContainer>

        <TitleWrapper>
          <PostTitle>{title}</PostTitle><BoardName>{board}</BoardName>
        </TitleWrapper>

        <SubTitleWrapper>
          <User>{user}</User><PostDate>{date}</PostDate>
        </SubTitleWrapper>

        <Hr marginTop='20px' marginBottom='36px'/>

       
        <Info alt="" details={details} valueWidth='600px'/>

        <Hr marginTop='60px' marginBottom='20px'/>

        {/*댓글 작성부분 - 한 컴포넌트로 묶기 */}
        <PostTitle marginBottom='20px'>댓글 3개</PostTitle>
        <CommentInputArea />
        <CommentWrapper>
          <Comment />
          <div>
            <Comment />
            <Reply />
          </div>
        </CommentWrapper>
                

      </ReviewPostContainer>
    </>
    
  );
}

export default ReviewPost;

const ReviewPostContainer = styled.div`
  margin: 86px 100px;
`

const PostTitle = styled.div`
  color: #000;

  /* Title-semibo */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0px'};
`

const BoardName = styled.div`
color: var(--Muit-Red-main, #A00000);

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
  align-items: flex-end; /* 아래쪽으로 정렬 */
`;

const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

const User = styled.div`
  color: var(--Gray-sub, #919191);

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`

const PostDate = styled.div`
  color: var(--Gray-sub, #919191);

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`

const Hr = styled.hr`
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  border: 0; /* 기본 테두리 제거 */
  border-top: 1px solid var(--Gray-outline, #E6E6E6); /* 선의 스타일 설정 */
  height: 0; /* 불필요한 높이 제거 */
  box-shadow: none; /* 그림자 제거 */
  transform: rotate(0.09deg); /* 회전 설정, 필요 시 유지 */
  flex-shrink: 0;
`;


const CommentWrapper = styled.div`
  padding-top: 20px;
  & > *:not(:last-child) {
    border-bottom: 1px solid #E6E6E6;
  }
`;

const ContentArea = styled.div`
  div {
  color: #000;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
}
`
const Rating = styled.div`
`
import React from "react";
import styled from "styled-components";
import itemImg from "../../../assets/images/lost-item-1.png";
import CommentInputArea from "../../../components/post/CommentInputArea";
import Comment from "../../../components/post/Comment";
import Reply from "../../../components/post/Reply";
import Info from "../../../components/detail/Info";
import { RatingStars } from "../../../components/detail/RatingStars";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
function ReviewPost() {

  const { postId } = useParams();
  console.log(postId);
  const { data, error, loading } = useFetch(`${import.meta.env.VITE_API_URL}/reviews/${postId}`);
  console.log('데이터', data);
  const { data: comment, error: commentError, loading: commentLoading } = useFetch(
    `http://13.209.69.125:8080/comments/${postId}?page=0&size=20`
  );
  
  console.log("코멘트 데이터:", comment);
  console.log("에러:", commentError);
  console.log("로딩:", commentLoading);
  // 로딩 상태 체크
  if (loading) return <div>로딩 중...</div>;

  // 오류 상태 체크
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;

  // 데이터가 없을 경우 처리
  if (!data || !data.result) return <div>데이터가 없습니다.</div>;

  // console.log('데이터', data);
  
  const d = data.result;
  const title = d.title;
  const board = "뮤지컬 리뷰";
  const user = "익명";
  const date = d.createdAt?.split('T')[0];
  const image = d?.imgUrls;

  const listSize = comment?.result?.listSize;
  // console.log('image', image);
  const details = [
    { label: "뮤지컬명", value: d.musicalName},
    { label: "장소", value: d.location },
    { label: "평점", value: <RatingStars rating={d.rating} starSize={36}/> },
    { label: "특징", value: d.content},
  ];

  console.log(d.rating);
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
        <PostTitle marginBottom='20px'>댓글 {listSize}개</PostTitle>
        <CommentInputArea postId={postId}/>
        <CommentWrapper>
        {comment?.result?.comments?.map((data) => (
          <Comment key={data.commentId} data={data} />
        ))}
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
  & > div:not(:last-child) {
    border-bottom: 1px solid #E6E6E6; /* 각 댓글 사이에 구분선 추가 */
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
import React from "react";
import styled from "styled-components";
import itemImg from "../../assets/images/lost-item-1.png";
import CommentInputArea from "../../components/post/CommentInputArea";
import Comment from "../../components/post/Comment";
import Reply from "../../components/post/Reply";
import Info from "../../components/detail/Info";
import ThumbsUp from "../../assets/icons/ThumbsUp.svg";

function AnonymousPost() {

  
  const title = "아이폰 16프로 화이트 티타늄";
  const board = "익명 게시판";
  const user = "익명";
  const date = "2025-01-05";
  const image = itemImg;
  const content = "방금 보고 왔는데 생각보다 재밌었음..."
  const likes = "10"

  return (
    <>
      <AnonymousPostContainer>

        <TitleWrapper>
          <PostTitle>{title}</PostTitle><BoardName>{board}</BoardName>
        </TitleWrapper>

        <SubTitleWrapper>
          <User>{user}</User><PostDate>{date}</PostDate>
        </SubTitleWrapper>

        <Hr marginTop='20px' marginBottom='36px'/>

        <ContentArea>
          <p>{content}</p>
        </ContentArea>
        
        
        <Hr marginTop='60px' marginBottom='20px' />

        {/*댓글 작성부분 - 한 컴포넌트로 묶기 */}
        <CommentSectionTop>
        <PostTitle marginBottom='20px'>댓글 3개</PostTitle>
        <IconWrapper>
          <img src={ThumbsUp} alt="likes" />
          <Text color='#919191'>{likes}</Text>
        </IconWrapper>
        </CommentSectionTop>
        
        <CommentInputArea />
        <CommentWrapper>
          <Comment />
          <div>
            <Comment />
            <Reply />
          </div>
        </CommentWrapper>
                

      </AnonymousPostContainer>
    </>
    
  );
}

export default AnonymousPost;

const AnonymousPostContainer = styled.div`
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
  display: flex;
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

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  height: 24px;
`

const Text = styled.div`
  color: ${(props) => props.color ? props.color: '#000'};

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
`

const PostLikesSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const CommentSectionTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  height: 100%;
  margin-bottom: 20px;
`
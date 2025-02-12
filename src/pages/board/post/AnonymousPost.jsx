import React from "react";
import styled from "styled-components";
import itemImg from "../../../assets/images/lost-item-1.png";
import CommentInputArea from "../../../components/post/CommentInputArea";
import Comment from "../../../components/post/Comment";
import Reply from "../../../components/post/Reply";
import Info from "../../../components/detail/Info";
import ThumbsUp from "../../../assets/icons/ThumbsUp.svg";
import ThumbsUpFill from "../../../assets/icons/thumbsup-fill.svg";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PostMenu from "../../../components/post/PostMenu";
const muit_server = import.meta.env.VITE_APP_SERVER_URL;
import axios from "axios";

function AnonymousPost() {

  const navigate = useNavigate();
  const location = useLocation();

  const {postId} = useParams();
  console.log(postId);

  // 코멘트 입력 시 댓글 자동 재렌더링 - 미완성 
  const [commentTrigger, setCommentTrigger] = useState(0);
  
  // 게시글 데이터 
  const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

  const url = `/posts/${postId}`;
  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  console.log('데이터', data);
  const [isButtonLiked, setIsButtonLiked] = useState(data?.result?.isLiked);
  const [likeCount, setLikeCount] = useState(data?.result?.likeCount);

  useEffect(() => {
    if (data?.result?.isLiked !== undefined) {
      setIsButtonLiked(data.result.isLiked);
      setLikeCount(data.result.likeCount);
    }
  }, [data]);
  
  
  // 🔹 댓글 데이터 (commentTrigger 변경 시 재요청)
  const { data: comment, error: commentError, loading: commentLoading } = useCustomFetch(
    `/comments/${postId}?page=0&size=20`,
    {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  console.log("코멘트 데이터:", comment);
  console.log("에러:", commentError);
  console.log("로딩:", commentLoading);

  console.log('이즈버튼라잌드', isButtonLiked);
  const likeButtonHandler = async () => {
      try {
        const response = await axios.get(`${muit_server}/likes/${postId}`, {
          headers: { 
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
  
        if (response.data.isSuccess) {
          // alert("좋아요 버튼을 클릭했습니다. ");
          setIsButtonLiked(!isButtonLiked);
          if (!isButtonLiked) {
            setLikeCount(likeCount+1);
          } else {
            setLikeCount(likeCount-1);
          }
          console.log('isLiked: ', isButtonLiked);
        } else {
          alert("좋아요 실패: " + response.data.message);
        }
      } catch (error) {
        console.error("좋아요 오류:", error);
        alert("좋아요 중 오류가 발생했습니다.");
      }
  };
  // 로딩, 오류, 데이터가 없을 경우의 처리 
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;
  if (!data || !data.result) return <div>데이터가 없습니다.</div>;

  // 화면 구성에 쓰이는 데이터들 
  const d = data.result;
  const title = d.title;
  const board = "익명 게시판";
  const user = "익명";
  const date = d.createdAt?.split('T')[0];
  const content = d.content;
  const images = d?.imgUrls;
  const commentCount = d?.commentCount;
  const listSize = comment?.result?.listSize;

  // const likeCount = d?.likeCount;

  return (
    <>
      <AnonymousPostContainer>
      <Text 
        style={{textDecoration: 'underline', marginBottom: '20px'}}
        color='#919191' 
        onClick={()=>navigate("/board/item/lost")}>게시글 목록으로 돌아가기...</Text>
        <TopWrapper>
          <TitleWrapper>
            <PostTitle>{title}</PostTitle><BoardName>{board}</BoardName>
          </TitleWrapper>
          <PostMenu />
        
        </TopWrapper>

        <SubTitleWrapper>
          <User>{user}</User><PostDate>{date}</PostDate>
        </SubTitleWrapper>

        <Hr marginTop='20px' marginBottom='36px'/>

        <ContentArea>
          <p>{content}</p>
          <ImagesArea>
          {images.map((url) => (
            <ImageWrapper>
              <img src={url} />
            </ImageWrapper>
            
          ))}
          </ImagesArea>
          
        </ContentArea>
        
        
        <Hr marginTop='60px' marginBottom='20px' />

        {/*댓글 작성부분 - 한 컴포넌트로 묶기 */}
        <CommentSectionTop>
        <PostTitle marginBottom='20px'>댓글 {commentCount}개</PostTitle>
        <IconWrapper onClick={() => likeButtonHandler()}>
        <img src={isButtonLiked ? ThumbsUpFill : ThumbsUp} alt="likes" />
          
          
          <Text color='#919191'>{likeCount}</Text>
        </IconWrapper>
        </CommentSectionTop>
        
        <CommentInputArea postId={postId} setCommentTrigger={setCommentTrigger} commentTrigger={commentTrigger}/>
        <CommentWrapper>
        {comment?.result?.comments?.map((data) => (
          <Comment key={data.commentId} data={data} />
        ))}
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

const CommentSectionTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  height: 100%;
  margin-bottom: 20px;
`


const SelectWrapper = styled.div`
  padding-bottom: 4px;

  select {
    border: none;
    color: var(--Gray-maintext, #000);

    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 156.25% */
  }
    select:focus {
    outline: none;
    }
`
const TopWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

`
const ImagesArea = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`
const ImageWrapper = styled.div`
 width: 100%;
  max-height: 500px;  /* 최대 높이 600px */
  display: flex;

  img {
    max-width: 100%;
    max-height: 500px;  /* 이미지 높이는 600px로 제한 */
    width: auto;        /* 비율에 맞게 너비 조정 */
    height: auto;       /* 비율에 맞게 높이 조정 */
    object-fit: contain; /* 이미지 비율 유지하며 크기 맞춤 */
  }
`;

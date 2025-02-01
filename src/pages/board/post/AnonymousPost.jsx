import React from "react";
import styled from "styled-components";
import itemImg from "../../../assets/images/lost-item-1.png";
import CommentInputArea from "../../../components/post/CommentInputArea";
import Comment from "../../../components/post/Comment";
import Reply from "../../../components/post/Reply";
import Info from "../../../components/detail/Info";
import ThumbsUp from "../../../assets/icons/ThumbsUp.svg";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
const muit_server = import.meta.env.VITE_APP_SERVER_URL;
import axios from "axios";

function AnonymousPost() {

  const navigate = useNavigate();
  const {postId} = useParams();
  console.log(postId);

  // 코멘트 입력 시 댓글 자동 재렌더링 - 미완성 
  const [commentTrigger, setCommentTrigger] = useState(0);
  console.log(commentTrigger);

  // 게시글 데이터 
  const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

  const url = `/posts/${postId}`;
  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `${token}` : "",
    },
  });
  console.log('데이터', data);

  // 🔹 댓글 데이터 (commentTrigger 변경 시 재요청)
  const { data: comment, error: commentError, loading: commentLoading } = useFetch(
    `/comments/${postId}?page=0&size=20`,
    {
    headers: {
      Authorization: token ? `${token}` : "",
    },
  });
  console.log("코멘트 데이터:", comment);
  console.log("에러:", commentError);
  console.log("로딩:", commentLoading);

  // 🔹 댓글이 등록되면 commentTrigger 업데이트
  const handleCommentAdded = () => {
    setCommentTrigger((prev) => prev + 1);
  };
  
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(`${muit_server}/posts/${postId}`, {
          headers: { 
            Authorization: token 
          },
        });
  
        if (response.data.isSuccess) {
          alert("게시글이 삭제되었습니다.");
          navigate("/board/item/lost"); // 삭제 후 홈으로 이동
        } else {
          alert("삭제 실패: " + response.data.message);
        }
      } catch (error) {
        console.error("삭제 오류:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
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
  const image = d?.imgUrls;
  const listSize = comment?.result?.listSize;

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
          <SelectWrapper>
        {/*이후 3도트 눌러서 수정삭제 드롭박스 생기도록 수정*/}
        {/*<BsThreeDotsVertical />*/}
          <select
            onChange={(e) => {
              if (e.target.value === "edit") {
                console.log("editing");
                // navigate("/edit-page"); // 수정 페이지로 이동
              } else if (e.target.value === "delete") {
                console.log("delete");
                // 삭제 로직 실행
                handleDelete();
              }
            }}
            >
            <option value="edit">수정</option>
            <option value="delete">삭제</option>
          </select>
            </SelectWrapper>
        
        </TopWrapper>

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
        <PostTitle marginBottom='20px'>댓글 {listSize}개</PostTitle>
        <IconWrapper>
          <img src={ThumbsUp} alt="likes" />
          <Text color='#919191'></Text>
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

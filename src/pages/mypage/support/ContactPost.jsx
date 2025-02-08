import React from "react";
import styled from "styled-components";
import itemImg from "../../../assets/images/lost-item-1.png";
import CommentInputArea from "../../../components/post/CommentInputArea";
import Comment from "../../../components/post/Comment";
import Reply from "../../../components/post/Reply";
import Info from "../../../components/detail/Info";
import ThumbsUp from "../../../assets/icons/ThumbsUp.svg";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeft from "../../../assets/icons/ChevronLeft.svg";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";

const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

function ContactPost() {

  const navigate = useNavigate();
  const {postId} = useParams();
  console.log(postId);

  const url = `/inquiries/${postId}`;

  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  console.log(data);
  /*
  // 코멘트 입력 시 댓글 자동 재렌더링 - 미완성 
  const [commentTrigger, setCommentTrigger] = useState(0);
  console.log(commentTrigger);

  // 게시글 데이터 
  const { data, error, loading } = useFetch(`http://13.209.69.125:8080/posts/${postId}`)
  
  // 🔹 댓글 데이터 (commentTrigger 변경 시 재요청)
  const { data: comment, error: commentError, loading: commentLoading } = useFetch(
    `http://13.209.69.125:8080/comments/${postId}?page=0&size=20`,
    {},
    [commentTrigger] // 🔹 댓글 트리거 추가 (의존성 배열)
  );
  console.log("코멘트 데이터:", comment);
  console.log("에러:", commentError);
  console.log("로딩:", commentLoading);

  // 🔹 댓글이 등록되면 commentTrigger 업데이트
  const handleCommentAdded = () => {
    setCommentTrigger((prev) => prev + 1);
  };
  
  // 로딩, 오류, 데이터가 없을 경우의 처리 
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;
  if (!data || !data.result) return <div>데이터가 없습니다.</div>;

  // 화면 구성에 쓰이는 데이터들 
  
*/

  const d = data?.result;
  const title = d?.title;
  // const board = "분실";
  const user = d?.nickname ? d.nickname : null;
  const date = d?.createdAt?.split('T')[0];
  const content = d?.content;
  const image = d?.imgUrls;
  

  const comment = {
    id: 1,
    nickname: '관리자',
    content: '안녕하세요, 고객님. [알라딘] 티켓 결제 관련하여 문의 주셔서 감사합니다. 현재 고객님의 결제 내역을 확인하고 있습니다. 결제가 정상적으로 완료되지 않았거나 오류가 발생했을 경우, 추가로 필요한 조치를 안내드리겠습니다. 결제 상태를 확인하는 데 약간의 시간이 소요될 수 있으니 양해 부탁드립니다. 만약 결제 확인 이메일이나 문자를 아직 받지 못하셨다면, 스팸메일함을 한 번 확인해 주시고, 결제 당시 사용하신 결제 수단의 상세 내역(거래일시, 승인번호 등)을 알려주시면 더욱 빠르게 처리할 수 있습니다. 추가적으로 궁금한 사항이 있으시다면 언제든 말씀해 주세요. 빠르게 확인 후 다시 연락드리겠습니다. 감사합니다.',
    createdAt: '2025-01-15',
  }

  const listSize = '?' // comment?.result?.listSize;
  return (
    <>
      <AnonymousPostContainer>
        <Text 
        style={{textDecoration: 'underline', marginBottom: '20px'}}
        color='#919191' 
        onClick={()=>navigate("/mypage/support/contact")}>문의글 목록으로 돌아가기...</Text>
        
        <TitleWrapper>
          <PostTitle>{title}</PostTitle>{/*<BoardName>{board}</BoardName>*/}
        </TitleWrapper>

        <SubTitleWrapper>
          {/*<User></User>*/}<PostDate>{date}</PostDate>
        </SubTitleWrapper>

        <Hr marginTop='20px' marginBottom='36px'/>

        <ContentArea>
          <p>{content}</p>
        </ContentArea>
        
        
        <Hr marginTop='60px' marginBottom='20px' />

        {/*댓글 작성부분 - 한 컴포넌트로 묶기 */}
        <CommentSectionTop>
        <PostTitle marginBottom='20px'>답변 {listSize}개</PostTitle>
        </CommentSectionTop>
        <Hr marginTop='20px' marginBottom='0px' />
        <CommentWrapper>
        <Comment key={comment.id} data={comment} noneCommentIcon={true}/>
        </CommentWrapper>
                

      </AnonymousPostContainer>
    </>
    
  );
}

export default ContactPost;

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
`
const Img = styled.img`
  visibility: ${(props) => props.visibility};
  cursor: ${(props) => (props.visibility === "visible" ? "pointer" : "default")};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`
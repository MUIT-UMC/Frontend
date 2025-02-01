import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentBubble from "../../assets/icons/CommentBubbleIcon.svg";
import ReplyArrow from "../../assets/icons/ReplyArrow.svg";
import Reply from "./Reply";
import { useState } from "react";
import CommentInputArea from "./CommentInputArea";
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const muit_server = import.meta.env.VITE_APP_SERVER_URL;

function Comment({data, noneCommentIcon}) {
  console.log('Comment.jsx', data);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(data.content);
  const [isReplying, setIsReplying] = useState(false);

  const deleteHandler = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
  
    try {
      const response = await fetch(
        `${muit_server}/comments/COMMENT/${data.commentId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": token ? `${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        alert("댓글이 삭제되었습니다.");
        // 필요하면 상태 업데이트 로직 추가
      } else {
        alert(`삭제 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const updateHandler = async () => {
    console.log(editedContent);
    try {
      const response = await fetch(
        `${muit_server}/comments/COMMENT/${data.commentId}`,
        {
          method: "PATCH",
          headers: { 
            "Authorization": token ? `${token}` : "",
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("댓글이 수정되었습니다.");
        setIsEditing(false); // 수정 완료 후 편집 모드 종료
      } else {
        alert(`수정 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("수정 오류:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };
  const replyHandler = () => {
    setIsReplying(true);
  }
  
  return (
    <Wrapper>
    <CommentWrapper>
        <Top>
          <TopLeft>
            <UserName>{data.nickname}</UserName>
            
            <Text>{data.createdAt?.split('T')[0]}</Text>
            <Text>{data.commentId}</Text>
            {/*<Text>신고하기</Text>*/}
          </TopLeft>
          <TopRight>
          {(!noneCommentIcon  && !isEditing) && (
            <div 
            style={{ display: "flex", flexDirection: "row", gap: "4px" }}
            onClick={replyHandler}>
              <img src={CommentBubble} />
              <Text>댓글</Text>
            </div>
          )}
            {isEditing ? (
              <>
                <Text onClick={updateHandler}>저장</Text>
                <Text onClick={() => setIsEditing(false)}>취소</Text>
              </>
            ) : (
              <>
                <Text onClick={() => setIsEditing(true)}>수정</Text>
                <Text onClick={deleteHandler}>삭제</Text>
              </>
            )}
          </TopRight>
          
        </Top>
        <Bottom>
        {isEditing ? (
            <EditInput
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <CommentText>{data.content}</CommentText>
          )}
        </Bottom>
      </CommentWrapper>
      {Array.isArray(data.replies) && data.replies.length > 0 ? (
        <ReplyWrapper>
          {data?.replies?.map((reply) => (
            <Reply key={reply.id} data={reply} />
          ))}
        </ReplyWrapper>
      ) : null}
      {isReplying && (
        <ReplyInputWrapper>
          <img src={ReplyArrow} />
          <div style={{width: '100%'}}>
          <CommentInputArea postId={data.commentId} isReplying={isReplying} setIsReplying={setIsReplying} />
          </div>
          
        </ReplyInputWrapper>
        
      )}
    </Wrapper>
      
  )
}

export default Comment;

const Wrapper = styled.div`
width: 1240px;
`
const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 56px;
  width: 100%;
`
const CommentWrapper = styled.div`
margin-top: 20px;
width: 100%;

`
const UserName = styled.div`
  color: ${(props) => props.color ? props.color : '#000'};

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const Top = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 20px;
`


const TopLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`


const TopRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

const Bottom = styled.div`
margin-bottom: 20px;
`

const Text = styled.div`
color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const CommentText = styled.div`
color: #000;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`
const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ReplyInputWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
margin-bottom: 20px;
align-items: flex-start;
`
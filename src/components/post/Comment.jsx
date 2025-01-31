import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentBubble from "../../assets/icons/CommentBubbleIcon.svg";
import ReplyArrow from "../../assets/icons/ReplyArrow.svg";
import Reply from "./Reply";
function Comment({data, noneCommentIcon}) {
  console.log('Comment.jsx', data);
  return (
    <Wrapper>
    <CommentWrapper>
        <Top>
          <TopLeft>
            <UserName>{data.nickname}</UserName>
            <Text>{data.createdAt?.split('T')[0]}</Text>
            {/*<Text>신고하기</Text>*/}
          </TopLeft>
          <TopRight>
            {noneCommentIcon ? null :
            <div style={{display:'flex', flexDirection: 'row', gap: '4px'}}>
              <img src={CommentBubble} /><Text>댓글</Text>
            </div>
            }
            
            <Text style={{display: 'none'}}>수정</Text><Text style={{display: 'none'}}>삭제</Text>
          </TopRight>
          
        </Top>
        <Bottom>
          <CommentText>{data.content}</CommentText>
        </Bottom>
      </CommentWrapper>
      {Array.isArray(data.replies) && data.replies.length > 0 ? (
        <ReplyWrapper>
          {data.replies.map((reply) => (
            <Reply key={reply.id} data={reply} />
          ))}
        </ReplyWrapper>
      ) : null}
      
    </Wrapper>
      
  )
}

export default Comment;

const Wrapper = styled.div`
width: 1240px;
`
const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
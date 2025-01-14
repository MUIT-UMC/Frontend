import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentBubble from "../../assets/icons/CommentBubbleIcon.svg";
import ReplyArrow from "../../assets/icons/ReplyArrow.svg";
function Comment() {
  return (
      <CommentWrapper>
        <Top>
          <TopLeft>
            <UserName>익명1</UserName>
            <Text>2025-01-05</Text>
            <Text>신고하기</Text>
          </TopLeft>
          <TopRight>
            <div style={{display:'flex', flexDirection: 'row', gap: '4px'}}>
              <img src={CommentBubble} /><Text>댓글</Text>
            </div>
            <Text style={{display: 'none'}}>수정</Text><Text style={{display: 'none'}}>삭제</Text>
          </TopRight>
          
        </Top>
        <Bottom>
          <CommentText>저 이거 화장실에서 떨어져있는거 본거같기두..</CommentText>
        </Bottom>
      </CommentWrapper>
  )
}

export default Comment;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 56px;


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
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentBubble from "../../assets/icons/CommentBubbleIcon.svg";
import ReplyArrow from "../../assets/icons/ReplyArrow.svg";
function Reply() {
  return (
    <ReplyWrapper>
      <div style={{marginTop: '15px'}}>
        <img src={ReplyArrow} />
      </div>
      
      <CommentWrapper>
        <Top>
          <TopLeft>
            <UserName color='#A00000'>작성자</UserName>
            <Text>2025-01-05</Text>
            <Text style={{display: 'none'}}>신고하기</Text>
          </TopLeft>
          <TopRight>
            <div style={{display:'flex', flexDirection: 'row', gap: '4px'}}>
              <img src={CommentBubble} /><Text>댓글</Text>
            </div>
            <Text>수정</Text><Text>삭제</Text>
          </TopRight>
          
        </Top>
        <Bottom>
          <CommentText>헉 정말요? 감사합니다ㅜㅜ</CommentText>
        </Bottom>
      </CommentWrapper>
    </ReplyWrapper>
  )
}

export default Reply;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1184px;


`
const CommentWrapper = styled.div`
margin-top: 15px;
width: 100%;
margin-left: 20px;

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
width: 100%;
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
wdith: 100%;
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
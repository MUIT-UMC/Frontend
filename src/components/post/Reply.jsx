import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentBubble from "../../assets/icons/CommentBubbleIcon.svg";
import ReplyArrow from "../../assets/icons/ReplyArrow.svg";
import { useState } from "react";
import axios from "axios";
const token = localStorage.getItem("token");
const muit_server = import.meta.env.VITE_APP_SERVER_URL;
function Reply({key, data}) {
  console.log(data);
  console.log('리플라이 콘텐츠', data.content);

  const [isWriter, setIsWriter] = useState(data.nickname=='글쓴이');

  const deleteHandler = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
  
    try {
      const response = await fetch(
        `${muit_server}/comments/REPLY/${data.replyId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
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

  const reportHandler = async (commentId) => {
    if (window.confirm("게시글을 신고하시겠습니까?")) {
      try {
        console.log('신고할 답댓글 ', commentId);
        const response = await axios.post(`${muit_server}/reports/${commentId}?commentType=REPLY`, 
          {},
          {
          headers: { 
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
  
        if (response.data.isSuccess) {
          alert("정상적으로 신고 처리 되었습니다.");
          console.log(commentId, "신고 완료");
        } else {
          alert("신고 실패: " + response.data.message);
        }
      } catch (error) {
        console.error("신고 오류:", error);
        alert("신고 중 오류가 발생했습니다.");
      }
    }
  };
  
  return (
    <ReplyWrapper>
      <div style={{marginTop: '15px'}}>
        <img src={ReplyArrow} />
      </div>
      
      <CommentWrapper>
        <Top>
          <TopLeft>
          <UserName isWriter={isWriter}>{data.nickname}</UserName>
            <Text>{data.createdAt?.split('T')[0]}</Text>
            <Text 
            style={{display: data.isMyComment ? "none" : "block"}}
            onClick={() => reportHandler(data.replyId)}
            >신고하기</Text>
          </TopLeft>
          <TopRight>
            <Text onClick={deleteHandler} style={{ display: (data.nickname !== "삭제된 댓글" && data.isMyComment) ? "block" : "none" }}>삭제</Text>
          </TopRight>
          
        </Top>
        <Bottom>
          <CommentText>{data.content}</CommentText>
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
  color: ${(props) => (props.isWriter ? '#A00000' : props.color || '#000')};
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
width: 100%;
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
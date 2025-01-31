import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Camera from '../../assets/icons/Camera.svg';
import Lock from '../../assets/icons/Lock.svg';
import { useState } from "react";
import axios from "axios";

{/* 에러 500 서버오류 의심? */}
function CommentInputArea({ postId }) {
  // console.log('게시글', postId);
  const [memberId, setMemberId] = useState(1);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true); // Default to anonymous
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (comment.trim() === "") return; // Don't submit if comment is empty

    setLoading(true);
    setError(null);
    console.log(comment);
    try {
      console.log('content: ', comment, ' memberId: ', memberId, ' isAnonymous: ', isAnonymous);

      const response = await axios.post(`http://13.209.69.125:8080/comments/${postId}`, {
        content: comment,
        memberId: memberId,  // Replace with actual memberId if available
        isAnonymous: isAnonymous,
      });

      console.log(response);
      if (response.data.isSuccess) {
        alert("댓글이 등록되었습니다.");
        setComment(""); // Clear the comment input after successful submission
      } else {
        setError("댓글 등록에 실패했습니다.");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다.");
      console.log(response);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <CommentInputWrapper> 
        <Text color='#000'>하지희</Text>
        <TextArea 
        id="user-comment" 
        rows="6" cols="22" 
        placeholder="내용을 입력하세요."
        value={comment}
        onChange={handleCommentChange}  />
      </CommentInputWrapper>
      <OptionWrapper>
      <div style={{display:'flex', flexDirection: 'row', gap: '8px', width: '100%'}}>
        {/*<img src={Camera} /><Text marginRight='20px'>사진</Text>*/}
        <img src={Lock} /><Text>익명</Text>
      </div>
      <Button onClick={handleSubmit} disabled={loading}>등록</Button>
      </OptionWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
    </>
  )
}

export default CommentInputArea;

const CommentInputWrapper = styled.div`
  width: ${(props) => props.width ? props.width : '100%'}
  flex-shrink: 0;
  border-radius: 3px 3px 0px 0px;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  padding: 20px 16px;
`

const OptionWrapper = styled.div`
  width: ${(props) => props.width ? props.width : '100%'}
  flex-shrink: 0;
  border-radius: 0px 0px 3px 3px;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  border-top: none;
  padding: 20px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between
`
const Text = styled.div`
  color: ${(props) => props.color ? props.color : "#919191"};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
  margin-right: ${(props) => props.marginRight ? props.marginRight : '0px'};

  display: flex;
  align-items: center;  /* 수직 중앙 정렬 */
`;

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

const TextArea = styled.textarea`
  border: none;
  width: 100%;  
  height: 70px;
  resize: none; /* 사용자가 크기 조절하지 못하도록 설정 */
  outline: none; /* 선택 시 테두리 제거 */
  color: var(--Gray-sub, #000);

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
    margin-top: 12px;
    &::placeholder {
      color: #ccc; /* 플레이스홀더 색상 */
    }
`;

const Button = styled.button`
 display: flex;
    width: 80px;
    height: 28px;
    padding: 5px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 3px;
    background: ${(props) => props.background ? props.background :'#A00000'};
    border: 1px solid var(--Muit-Red-main, #A00000);
    margin: 0px;
    margin-bottom: ${(props) => props.marginBottom? props.marginBottom : '0px' };

    color: ${(props) => props.color ? props.color : '#FFF' };

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;

`
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  font-family: Pretendard;
`
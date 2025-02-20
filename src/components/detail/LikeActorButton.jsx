import React, { useState } from "react";
import styled from "styled-components";
import HeartLine from "../../assets/icons/heart-line.svg";
import HeartFull from "../../assets/icons/heart-full.svg";

function LikeActorButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsLiked((prev) => !prev);
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 200); // 0.2초 후 원래 크기로
  };

  return (
    <Button onClick={handleClick} isClicked={isClicked}>
      <HeartIcon src={isLiked ? HeartFull : HeartLine} alt={isLiked ? "Liked" : "Not Liked"} />
    </Button>
  );
}

export default LikeActorButton;

const Button = styled.button`
  background: #fff;
  width: 28px;
  height: 28px;
  border-radius: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  padding: 1px;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isClicked ? "scale(1.05)" : "scale(1)")}; // 버튼 확대 효과
`;

const HeartIcon = styled.img`
  width: 16px;
  height: 16px;
`;

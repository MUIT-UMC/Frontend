import React, { useState } from "react";
import styled from "styled-components";
import HeartLine from "../../assets/icons/heart-line.svg";
import HeartFull from "../../assets/icons/heart-full.svg";

function LikeActorButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Button onClick={handleClick}>
      <img
        src={isLiked ? HeartFull : HeartLine}
        alt={isLiked ? "Liked" : "Not Liked"}
        style={{width: '24px', height: '24px'}}
      />
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
  padding: 0px;
  
  img {
  position: absolute;
  bottom: 1px;
  }
`;

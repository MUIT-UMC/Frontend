import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HeartFull from "../assets/icons/heart-full.svg";
import HeartLine from "../assets/icons/heart-line.svg";
import { useState } from "react";
const muit_server = import.meta.env.VITE_APP_SERVER_URL;
const token = localStorage.getItem("token");
console.log(token);
const HeartButton = ({liked, setLiked}) => {

  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    // 0.3초 후에 다시 원래 크기로 돌아가게 설정
    setTimeout(() => {
      setIsClicked(false);
    }, 200);  // 0.3초 후
  };

  return (
    <Img
      src={liked ? HeartFull : HeartLine}
      alt="하트 아이콘"
      isClicked={isClicked}
      onClick={() => {setLiked(!liked); handleClick()}}
      style={{ cursor: "pointer" }}
    />
  );
};

export default HeartButton;

const Img = styled.img`
  transition: transform 0.2s ease;  // 부드러운 전환
  transform: ${(props) => (props.isClicked ? 'scale(1.1)' : 'scale(1)')};
`;
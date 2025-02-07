import React from "react";
import styled from "styled-components";
import starFull from "../../assets/icons/star-full.svg";
import starOutline from "../../assets/icons/star-outline.svg";
import { useEffect } from "react";
import { useState } from "react";
  export const InteractiveRatingStars = ({ rating, starSize = 24, onRatingChange }) => {
    const [currentRating, setCurrentRating] = useState(rating);
    console.log(rating);
    console.log("커런트레이팅", currentRating);

    useEffect(() => {
      setCurrentRating(rating);
    }, [rating]);

    const handleClick = (newRating) => {
      setCurrentRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
        console.log(currentRating);
      }
    };
  
    const stars = Array.from({ length: 5 }, (_, index) => index < currentRating);


    return (
      <StarWrapper>
        {stars.map((isFull, index) => (
          <Star
            key={index}
            src={index < currentRating ? starFull : starOutline}
            alt={index < currentRating ? "Full Star" : "Outline Star"}
            size={starSize}
            onClick={() => handleClick(index + 1)}
          />
        ))}
      </StarWrapper>
    );
  };
  
  // Styled Components
  const StarWrapper = styled.div`
    display: flex;
  `;
  
  const Star = styled.img`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    cursor: pointer;
  `;
  
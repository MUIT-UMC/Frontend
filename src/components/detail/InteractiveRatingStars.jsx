import React from "react";
import styled from "styled-components";
import starFull from "../../assets/icons/star-full.svg";
import starOutline from "../../assets/icons/star-outline.svg";
import { useState } from "react";
  export const InteractiveRatingStars = ({ rating = 0, starSize = 24, onRatingChange }) => {
    const [currentRating, setCurrentRating] = useState(rating);
  
    const handleClick = (newRating) => {
      setCurrentRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
        console.log(currentRating);
      }
    };
  
    return (
      <StarWrapper>
        {Array.from({ length: 5 }, (_, index) => (
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
  
import React from "react";
import styled from "styled-components";
import starFull from "../../assets/icons/star-full.svg";
import starOutline from "../../assets/icons/star-outline.svg";

/**
 * A component that displays a set of stars based on the rating provided.
 * @param {number} rating - The current rating value (0-5).
 */
export const RatingStars = ({ rating, starSize = 24 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <StarWrapper>
      {stars.map((isFull, index) => (
        <Star
          key={index}
          src={isFull ? starFull : starOutline}
          alt={isFull ? "Full Star" : "Outline Star"}
          size={starSize}
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
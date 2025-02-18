import React from "react";
import styled from "styled-components";
import starFull from "../../assets/icons/star-full.svg";
import starOutline from "../../assets/icons/star-outline.svg";
import starHalf from "../../assets/icons/star-half.svg"; // half star 아이콘 경로 확인

/**
 * A component that displays a set of stars based on the rating provided.
 * Renders full, half, or empty star based on the decimal value.
 * @param {number} rating - The current rating value (0-5).
 */
export const RatingStars = ({ rating, starSize = 24, gap = 4}) => {
  // 5개의 별을 생성하면서 각 별의 상태를 결정합니다.
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (rating >= index + 1) {
      return "full";
    } else if (rating >= index + 0.5) {
      return "half";
    } else {
      return "empty";
    }
  });

  return (
    <StarWrapper gap={gap}>
      {stars.map((type, index) => (
        <Star
          key={index}
          src={
            type === "full"
              ? starFull
              : type === "half"
              ? starHalf
              : starOutline
          }
          alt={`${type} star`}
          size={starSize}
          
        />
      ))}
    </StarWrapper>
  );
};

// Styled Components
const StarWrapper = styled.div`
  display: flex;
  gap: ${({gap}) => gap}px;
  align-items: center;
`;

const Star = styled.img`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  cursor: pointer;
`;

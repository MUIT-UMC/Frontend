import React from "react";
import styled from "styled-components";
import VisionDetailMain from "../../VisionDetail";
import VisionDetail from "../../vision/VisionDetailLotte";

function Seats({musicalId}) {
  console.log("좌석확인", musicalId)

  return (
    <Container style={{ transform: "scale(0.7)", transformOrigin: "top left" }}>
      <VisionDetailMain theatreId={musicalId}/>
   </Container>
    
  );
};

const Container = styled.div`

`

export default Seats;

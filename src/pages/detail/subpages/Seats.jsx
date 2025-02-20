import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VisionDetailMain from "../../VisionDetail";
import useCustomFetch from "../../../hooks/fetchWithAxios";

function Seats({ musicalId }) {
  const { fetchData } = useCustomFetch();
  const { data: musical, loading: musicalLoading } = useCustomFetch(`/musicals/${musicalId}`);
  console.log(musical?.result?.theatreId);

  return (
    <Container style={{ transform: "scale(0.7)", transformOrigin: "top left" }}>
      <VisionDetailMain theatreId={musical?.result?.theatreId} paddingTop='20px' page='detail'/>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  left: -50px;  /* 왼쪽으로 이동 */
  /* 필요한 만큼 더 조정 */
`;

export default Seats;
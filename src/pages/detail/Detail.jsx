import React from "react";
import styled from "styled-components";
import MainBanner from "../../components/detail/MainBanner";
import useFetch from "../../hooks/useFetch";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import useMoveScroll from "../../hooks/useMoveScroll";
import MainContent from "./MainContent";

const token = localStorage.getItem("token");


function Detail() {

  const {musicalId} = useParams();
  const url = `/musicals/${musicalId}`;

  const { data, error, loading } = useFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },);

  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error || !data.isSuccess) return <div>데이터를 불러오지 못했습니다.</div>;

  const musical = data.result;

  const priceInfoArray = musical.priceInfo[0].split(", ");

  const parsedPriceInfo = priceInfoArray.map(item => {
    const [seat, price] = item.split(" "); // 띄어쓰기로 분리
    return { seat, price };
  });
  
  console.log(parsedPriceInfo);

  const {element, onMoveToElement} = useMoveScroll();
  return (
    <>
      {/*빨간배너 */}
      <MainBanner 
        data={musical} 
        //onMoveToElement={onMoveToElement}
      />
      {/* 본문 */}
      <MainContent 
        data={data} 
        loading={loading} 
        error={error} 
        // ref={element}
      />
   </>
    
  );
}

export default Detail;


import React from "react";
import styled from "styled-components";
import YubinImage from "../../assets/images/amateur-actor/yubin.png";
import HyeokjinImage from "../../assets/images/amateur-actor/hyeokjin.png";
import SeungjaeImage from "../../assets/images/amateur-actor/seungjae.png";
import JihwooImage from "../../assets/images/amateur-actor/jihwoo.png";
import SeungminImage from "../../assets/images/amateur-actor/seungmin.png";
import SeoyeonImage from "../../assets/images/amateur-actor/seoyeon.png";


function CastList() {
  const mockData = [
    {
      id: 1,
      name: "임유빈",
      image: YubinImage,
      info: "학생 1",
    },
    {
      id: 2,
      name: "권혁진",
      image: HyeokjinImage,
      info: "5급",
    },
    {
      id: 3,
      name: "이승재",
      image: SeungjaeImage,
      info: "6급",
    },
    {
      id: 4,
      name: "이지후",
      image: JihwooImage,
      info: "7급",
    },
    {
      id: 5,
      name: "백승민",
      image: SeungminImage,
      info: "학생 2",
    },
    {
      id: 6,
      name: "이서연",
      image: SeoyeonImage,
      info: "학생 2",
    },
  ];

  return (
    <ActorsWrapper>
      {mockData.map((actor) => (
        <Actor key={actor.id}>
          <ProfileWrapper>
            <img src={actor.image} alt={actor.name} />
          </ProfileWrapper>
          <div>{actor.name}</div>
          <div>{actor.info}</div>
        </Actor>
      ))}
    </ActorsWrapper>
  );
}

export default CastList;

const ProfileWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 70%;
  border-bottom-right-radius: 10%;
  overflow: hidden;
  flex-direction: column;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const Actor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /
  gap: 12px;
`;

const ActorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
   align-items: flex-start; /
  
  /* 한 줄에 4개씩 정렬 */
  > div {
    flex: 0 0 calc(25% - 100px); /* 4개씩 배치하고 간격 맞추기 */
    box-sizing: border-box;
  }
`;

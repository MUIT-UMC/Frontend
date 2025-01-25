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
          <ActorName>{actor.name}</ActorName>
          <ActorInfo>{actor.info}</ActorInfo>
        </Actor>
      ))}
    </ActorsWrapper>
  );
}

export default CastList;

const ProfileWrapper = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 70%;
  border-bottom-right-radius: 10%;
  overflow: hidden;
  margin-top:40px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Actor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const ActorName = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const ActorInfo = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #989898;
`;

const ActorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* 간격을 더 좁게 조정 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 수직 방향으로도 정렬 */
  padding: 0; /* 여백을 없애기 */

  > div {
    flex: 0 0 calc(25% - 10px); /* 한 줄에 4개 배치 */
    box-sizing: border-box;
  }
`;


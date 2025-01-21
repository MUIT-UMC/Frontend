import React from "react";
import styled from "styled-components";
import HwangMinsu from "../../../assets/images/actor-pic-hwangminsu.png";
import LikeActorButton from "../../../components/detail/LikeActorButton";
function CastsDetail() {

  return (
    <>
      <CharacterWrapper>
        <h3>리차드</h3>
        <ActorsWrapper>
        <Actor>
        <ProfileWrapper>
          <img src={HwangMinsu} alt="Hwang Minsu" />
          <LikeActorButtonWrapper>
            <LikeActorButton />
          </LikeActorButtonWrapper>
        </ProfileWrapper>
        <div>황민수</div>
        </Actor>
        <Actor>
        <ProfileWrapper>
          <img src={HwangMinsu} alt="Hwang Minsu" />
          <LikeActorButtonWrapper>
            <LikeActorButton />
          </LikeActorButtonWrapper>
        </ProfileWrapper>
        <div>황민수</div>
        </Actor>
        <Actor>
        <ProfileWrapper>
          <img src={HwangMinsu} alt="Hwang Minsu" />
          <LikeActorButtonWrapper>
            <LikeActorButton />
          </LikeActorButtonWrapper>
        </ProfileWrapper>
        <div>황민수</div>
        </Actor>
        <Actor>
        <ProfileWrapper>
          <img src={HwangMinsu} alt="Hwang Minsu" />
          <LikeActorButtonWrapper>
            <LikeActorButton />
          </LikeActorButtonWrapper>
        </ProfileWrapper>
        <div>황민수</div>
        </Actor>
        </ActorsWrapper>
        
      </CharacterWrapper>
   </>
    
  );
}

export default CastsDetail;

const CharacterWrapper = styled.div`
  h3 {
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 20px;
  }

`

const ProfileWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 70%;
  border-bottom-right-radius: 10%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LikeActorButtonWrapper = styled.div`
  position: absolute;
  bottom: 5px; /* 삐죽한 부분에 맞게 조정 */
  right: 5px; /* 버튼 위치 조정 */
  transform: translate(0, 0); /* 필요 시 미세 조정 */
  z-index: 10; /* 이미지 위로 오게 설정 */
`;
const Actor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

const ActorsWrapper = styled.div`
display:flex;
flex-direction: row;
gap: 40px;
`

// 샤롯시어터

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import SearchBar_Mock from "../components/SearchBar_Mock";
import {
    A_Before,
    B_Before,
    C_Before,
    D_Before,
    E_Before,
    F_Before,
    G_Before,
    H_Before,
    I_Before,
    J_Before,
    K_Before,
    L_Before,
    M_Before,
    N_Before,
    O_Before,
    A_After,
    B_After,
    C_After,
    D_After,
    E_After,
    F_After,
    G_After,
    H_After,
    I_After,
    J_After,
    K_After,
    L_After,
    M_After,
    N_After,
    O_After
} from "../../../assets/theaterSeat/charlotte/charlotteSeat"
import TheatreInfo from '../components/TheatreInfo';

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
const token_admin = localStorage.getItem("adminToken");

export default function AdminVisionDetail() {

  const { placeId } = useParams();
  const navigate = useNavigate();
  const [theaterInfo, setTheaterInfo] = useState(null);
  useEffect(() => {
    if (placeId) {
      fetchTheaterDetail(placeId);
    }
  }, [placeId]);
  // 극장 정보 상세 조회 API
  const fetchTheaterDetail = async (placeId) => {
    try {
      const res = await axios.get(`${baseURL}/admin/views/${placeId}`, {
        headers: {
          Authorization: `Bearer ${token_admin}`,
        },
      });
      const data = res.data.result || {};
      const refined = {
        palceId: data.theatreId,
        placeName: data.theatreName,
        address: data.address,

        musicalId: data.musicalId,
        musicalName: data.musicalName,
        theatrePic: data.theatrePic,
        allSeatImg: data.allSeatImg,
      };
      setTheaterInfo(refined);
    } catch (err) {
      console.error("극장 정보 조회 실패:", err);
      alert("해당 극장을 조회할 수 없습니다.");
      navigate("/adminpage/vision"); 
    }
  };

  const [activeFloor, setActiveFloor] = useState(1);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSeatData, setSelectedSeatData] = useState(null);
  const [seatStates, setSeatStates] = useState({
    A: "Before",
    B: "Before",
    C: "Before",
    D: "Before",
    E: "Before",
    F: "Before",
    G: "Before",
    H: "Before",
    I: "Before",
    J: "Before",
    K: "Before",
    L: "Before",
    M: "Before",
    N: "Before",
    O: "Before",
  });
const areaImages = {
  A: { Before: A_Before, After: A_After },
  B: { Before: B_Before, After: B_After },
  C: { Before: C_Before, After: C_After },
  D: { Before: D_Before, After: D_After },
  E: { Before: E_Before, After: E_After },
  F: { Before: F_Before, After: F_After },
  G: { Before: G_Before, After: G_After },
  H: { Before: H_Before, After: H_After },
  I: { Before: I_Before, After: I_After },
  J: { Before: J_Before, After: J_After },
  K: { Before: K_Before, After: K_After },
  L: { Before: L_Before, After: L_After },
  M: { Before: M_Before, After: M_After },
  N: { Before: N_Before, After: N_After },
  O: { Before: O_Before, After: O_After },
};
const handleFloorToggle = (floor) => {
  setActiveFloor(floor);
  setSelectedArea(null);
  setSelectedSeatData(null);
  setSeatStates({
    A: "Before",
    B: "Before",
    C: "Before",
    D: "Before",
    E: "Before",
    F: "Before",
    G: "Before",
    H: "Before",
    I: "Before",
    J: "Before",
    K: "Before",
    L: "Before",
    M: "Before",
    N: "Before",
    O: "Before",
  });
};

const toggleAreaState = async (area) => {
  setSeatStates((prevStates) => {
      const newStates = {};
      Object.keys(prevStates).forEach((key) => {
          newStates[key] = key === area ? "After" : "Before";
      });
      return newStates;
  });
  setSelectedArea(area);

  // 좌석 상세 조회 API 
  try {
    const response = await axios.get(`${baseURL}/admin/views/${placeId}/section?sectionType=${area}`, {
      headers: { Authorization: `Bearer ${token_admin}` }
    });
    const seatData = response.data?.result;
    setSelectedSeatData(seatData); 
  } catch (error) {
    console.error("섹션 정보 조회 실패:", error);
    alert("해당 섹션을 조회할 수 없습니다.");
  }
};




return (
  <Container>
    <Tilte>시야 관리</Tilte>
    <SearchSection>
      <SearchBar_Mock />
    </SearchSection>

    <Button>
      <EditButton to={`/adminpage/vision/detail/${placeId}/update`}>수정하기</EditButton>
    </Button>

    <Subtitle>
      <BackButton onClick={() => navigate(`/adminpage/vision`)}>
        &lt;
      </BackButton>
      &nbsp; {theaterInfo?.placeName}
    </Subtitle>


    <DetailArea>
      <div>
        <SeatArea>
          <div className="Stage">STAGE</div>
          <p className="FloorTag"
              style={{
                background: activeFloor === 1 ? "#A00000" : "#C1C1C1",
              }}>1층</p>
          <Floor>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((area) => (
              <img
                key={area}
                src={areaImages[area][seatStates[area]]} // Before/After에 따라 이미지 변경
                alt={area}
                className={
                  ["A", "D", "G"].includes(area) ? "left-seat-img" :
                    ["B", "E", "H"].includes(area) ? "center-seat-img" :
                      "right-seat-img"
                }
              />
            ))}
          </Floor>
          <p className="FloorTag"
              style={{
                  background: activeFloor === 2 ? "#A00000" : "#C1C1C1",
              }}>2층</p>
          <Floor>
            {["J", "K", "L", "M", "N", "O"].map((area) => (
              <img
                key={area}
                src={areaImages[area][seatStates[area]]}
                alt={area}
                className={
                  ["J", "M"].includes(area) ? "left-seat-img" :
                    ["K", "N"].includes(area) ? "center-seat-img" :
                      "right-seat-img"
                  }
                />
              ))}
          </Floor>
        </SeatArea>
      </div>
      <SeatInfo>
        <TheatreInfo data={theaterInfo}/>

        <AreaBtn>
          <button
            className={`FloorBtn ${activeFloor === 1 ? "active" : ""}`}
            onClick={() => handleFloorToggle(1)}
          >
            1층
          </button>
          <button
            className={`FloorBtn ${activeFloor === 2 ? "active" : ""}`}
            onClick={() => handleFloorToggle(2)}
          >
            2층
          </button>
        </AreaBtn>

        <AreaSelector>
          {activeFloor === 1 &&
            ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((area) => (
              <button
                key={area}
                className={`AreaBtn ${seatStates[area] === "After" ? "active" : ""}`}
                onClick={() => toggleAreaState(area)}
              >
                {area}
              </button>
            ))}

          {activeFloor === 2 &&
            ["J", "K", "L", "M", "N", "O"].map((area) => (
              <button
                key={area}
                className={`AreaBtn ${seatStates[area] === "After" ? "active" : ""}`}
                onClick={() => toggleAreaState(area)}
              >
                {area}
              </button>
            ))}
          </AreaSelector>

          <hr className="hr-line"/>

          <SeatView>
            {selectedSeatData && (
              <AreaInfo>{selectedSeatData?.floor} <br/> {selectedSeatData?.seatRange}</AreaInfo>
            )}
            <ViewImg>
              <img style={{width: "348px", height: "260.31px"}} 
                src={ selectedSeatData ? selectedSeatData.viewPic : theaterInfo?.theatrePic } alt="좌석 시야"/>
            </ViewImg>
            {selectedSeatData && (
              <>
                <ViewChar>특징</ViewChar>
                <ViewText>{selectedSeatData?.viewDetail}</ViewText>
              </>
            )}
          </SeatView>
      </SeatInfo>

    </DetailArea>
  </Container>
);
}


/* ---------------- styled components ---------------- */


const Container = styled.div`
  position: relative;
  width:  1150px;
  height: 916px;
  background-color: ${COLOR_WHITE};
  padding-left: 71px;
  padding-right: 80px;
  box-sizing: border-box;

  display:  flex;
  flex-direction:  column;
`;

const Tilte = styled.div`
  margin-top: 4px;
  font-family:  "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color:  ${COLOR_MUIT_RED};
`;

const SearchSection = styled.div`
  margin-top:  15px;
  display:  flex;
  justify-content:  space-between;
  align-items:  center;
`;

const Subtitle = styled.div`
  margin-top: 30px;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const Button = styled.div`
  margin-top:  -16px;
  display:  flex;
  justify-content:  flex-end;
  align-items:  center;
`;

const EditButton = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color: ${COLOR_MUIT_RED};
  cursor: pointer;
  box-sizing:  border-box;
  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 3px;
  background-color: ${COLOR_WHITE};
  padding:  5px 14px 5px 14px;

  &:hover {
    background-color: ${COLOR_MUIT_RED};
    color: ${COLOR_WHITE};
  }
  `;

const DetailArea = styled.div`
  display: flex;
  gap: 40px;
  margin-left: -25px;
  //align-items: flex-start;
`;

const SeatArea = styled.div`
  width: 580px;
  margin-top: 50px;

  .Stage{
    justify-self: center;
    margin-left: 12px;

    width: 264px;
    height: 20px;
    border-radius: 3.946px;
    border: 0.789px solid ${COLOR_GRAY_SUB};

    text-align: center;
    color: #8F8E94;
    font-family: Pretendard;
    font-size: 12.628px;
    font-style: normal;
    font-weight: 500;
  }
  .FloorTag{
    width: 26px;
    height: 17px;
    border-radius: 1.579px;
    background: ${COLOR_MUIT_RED};

    text-align: center;
    color: #FFF;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .left-seat-img{     
    justify-self: end;
  }
  .center-seat-img{     
    justify-self: center;
  }
  .right-seat-img{     
    justify-self: start;
  }
`;

const Floor = styled.div`
  transform: scale(0.78);
  transform-origin: top left; 
  padding-left: 12px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;

  img {
    width: auto;
    height: auto;
    object-fit: contain;
  }
`;

const SeatInfo = styled.div`
  width: 400px;

  h3{margin:0px;}
  p{margin: 0px;}

  .NowShowing{
    margin-top:25px;
    display: flex;
    align-items: center;
  }
  .ShowTitle{
    font-size: 16px;
    font-weight: 700;
    color: ${COLOR_GRAY_MAINTEXT};      
  }
  .hr-line{
    border : 0px;
    border-top: 1px solid #E6E6E6;
    margin-bottom: 24px;
  }
  .title-B{
    font-size: 24px;
    font-weight: 700;
  }
  .body-M-400{
    font-size: 16px;
    font-weight: 500;
    color: ${COLOR_GRAY_SUB};
  }
  .body-M-500{
    font-size: 16px;
    font-weight: 500;
    color: ${COLOR_GRAY_MAINTEXT};
  }
`;

const AreaBtn = styled.div`
  display: flex;
  gap: 8px;
  margin: 20px 0;

  .FloorBtn {
    font-size: 14px;
    color: ${COLOR_GRAY_SUB};
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    background: none;
    border: none;

    cursor: pointer;

    &.active {
      color: ${COLOR_MUIT_RED};
      border-bottom: solid 2px;
      border-radius: 1px;
      border-color: ${COLOR_MUIT_RED};
    }
  }
`;

const AreaSelector = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;

  .AreaBtn {
    width: 55px;
    height: 32px;
    padding: 3px 15px;
    border-radius: 3px;
    background: #fff;
    border: 1px solid  #E6E6E6;

    cursor: pointer;

    color: ${COLOR_GRAY_SUB};
    text-align: center;
    /* Body-tiny-md */
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;

    &.active {
      background: #FFF;
      color: ${COLOR_MUIT_RED};
      border-color: ${COLOR_MUIT_RED};
    }
  }
`;

const AreaInfo = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color:  ${COLOR_GRAY_MAINTEXT};
`;

const SeatView = styled.div`
  width: 100%;
  display: flex
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ViewImg = styled.div`
  width: 388px;
  height: 280px;
  margin-top: 10px;
`;

const ViewChar = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color:  ${COLOR_GRAY_MAINTEXT};
`;

const ViewText = styled.div`
  margin-top: 8px;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color:  ${COLOR_GRAY_SUB};
`;
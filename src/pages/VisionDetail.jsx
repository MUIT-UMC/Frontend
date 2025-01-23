import React, { useState } from "react";
import styled from "styled-components";
import Seat1 from '../assets/images/Seat1.png'
import bluesquare1723 from '../assets/images/bluesquare1-7-23.png';
import location from '../assets/icons/location.svg';
import ChevronRight from '../assets/icons/ChevronRight.svg';
import Search from '../assets/icons/Search2.svg';
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
    O_After,

} from "../assets/theaterSeat/charlotte/charlotteSeat";

const VisionDetail = () => {
    const [searchValue, setSearchValue] = useState("");
    const [activeFloor, setActiveFloor] = useState(1);
    const [selectedArea, setSelectedArea] = useState(null);
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
    

    const onChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleFloorToggle = (floor) => {
        setActiveFloor(floor);
    };
    const handleAreaSelect = (area) => {
        setSelectedArea(area); 
    };

    return(
        <Container>
            <SearchBar>
                <input className="search-txt"
                    value={searchValue} onChange={onChange}
                    placeholder="뮤지컬이나 공연장을 입력해주세요." />
                <img src={Search}/>
            </SearchBar>

            <DetailArea>
                {/*공연장별로 다 따로 페이지를 만들기?*/}

                <SeatArea>
                    <div className="Stage">STAGE</div>
                    <p className="FloorTag"
                    style={{
                        background: activeFloor === 1 ? "#A00000" : "#C1C1C1",
                    }}>1층</p>
                    <Floor>
                        <img src={A_Before} className="left-seat-img"/>
                        <img src={B_Before} className="center-seat-img"/>
                        <img src={C_Before} className="right-seat-img"/>
                        <img src={D_Before} className="left-seat-img"/>
                        <img src={E_Before} className="center-seat-img"/>
                        <img src={F_Before} className="right-seat-img"/>
                        <img src={G_Before} className="left-seat-img"/>
                        <img src={H_Before} className="center-seat-img"/>
                        <img src={I_Before} className="right-seat-img"/>
                    </Floor>
                    <p className="FloorTag"
                    style={{
                        background: activeFloor === 2 ? "#A00000" : "#C1C1C1",
                    }}>2층</p>
                    <Floor>
                        <img src={J_Before} className="left-seat-img"/>
                        <img src={K_Before} className="center-seat-img"/>
                        <img src={L_Before} className="right-seat-img"/>
                        <img src={M_Before} className="left-seat-img"/>
                        <img src={N_Before} className="center-seat-img"/>
                        <img src={O_Before} className="right-seat-img"/>
                    </Floor>
                </SeatArea>

                <SeatInfo>
                    <TheaterInfo>
                        <img src={location}/>

                        <h3 className="title-B">샤롯데씨어터</h3>    
                        <p className="body-M-500">서울특별시 송파구 올림픽로 240</p>
                        <div className="NowShowing"> 
                            <p className="body-M-400">현재 공연 <span className="ShowTitle">미아 파밀리아</span></p>
                            <img src={ChevronRight}/>
                        </div>
                        <hr className="hr-line"/>
                    </TheaterInfo> 

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
                                    className={`AreaBtn ${
                                        selectedArea === area ? "active" : ""
                                    }`}
                                    onClick={() => handleAreaSelect(area)}
                                >
                                    {area}
                                </button>
                            ))}
                        {activeFloor === 2 &&
                            ["J", "K", "L", "M", "N", "O"].map((area) => (
                                <button
                                    key={area}
                                    className={`AreaBtn ${
                                        selectedArea === area ? "active" : ""
                                    }`}
                                    onClick={() => handleAreaSelect(area)}
                                >
                                    {area}
                                </button>
                            ))}
                    </AreaSelector>
                    <hr className="hr-line"/>

                    <View>
                        <img src={bluesquare1723} className="view-img"/>
                        <p className="body-B-500">특징</p>
                        <div className="feature">
                            <span className="body-M-400">시야 가림 X</span>
                            <span className="body-M-400">오페라글라스 O</span>
                        </div>
                    </View>                  
                </SeatInfo>

            </DetailArea>
        </Container>
    )

}

const Container = styled.div`
    font-family: Pretendard;
    padding: 0px 100px 0px 100px;
`
const SearchBar = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 80px;
  margin-bottom: 40px;

  width: 508px;
  height: 40px;

  border: 1px solid #C1C1C1;
  border-radius: 3px;

  padding: 8px 20px 8px 20px;

  input::placeholder{
    font-size: 16px;
    color: #919191;
  }

  .search-txt{
    border: none;
    width: 420px;
  }

  .search-btn{
    cursor: pointer;
  }
`
const DetailArea = styled.div`
    display: flex;
    gap: 132px;
    //align-items: flex-start;
`
const SeatArea = styled.div`
    width: 580px;

    .Stage{
        justify-self: center;
        margin-left: 12px;

        width: 264px;
        height: 20px;
        border-radius: 3.946px;
        border: 0.789px solid #919191;

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
        background: #A00000;

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
`
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
`
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
        color: #000000;      
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
        color: #919191;
    }
    .body-M-500{
        font-size: 16px;
        font-weight: 500;
        color: #000000;
    }

`
const TheaterInfo = styled.div`

`
const AreaBtn = styled.div`
    display: flex;
    gap: 8px;
    margin: 20px 0;

    .FloorBtn {
        font-size: 14px;
        color: #919191;
        text-align: center;
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        background: none;
        border: none;

        cursor: pointer;

        &.active {
            color: #A00000;
            border-bottom: solid 2px;
            border-radius: 1px;
            border-color: #a00000;
        }
    }
`

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

        color: #919191;
        text-align: center;
        /* Body-tiny-md */
        font-family: "Pretendard Variable";
        font-size: 14px;
        font-style: normal;
        font-weight: 500;

        &.active {
            background: #FFF;
            color: #a00000;
            border-color: #a00000;
        }

    }
`
const View = styled.div`
    .view-img{
        width: 400px;
        margin-bottom: 30px;
    }
    .feature{
        display: flex;
        gap: 10px;
    }
    .body-B-500{
        font-size: 16px;
        font-weight: 700;
        color: #000000;      
    }
    .body-M-400{
        font-size: 16px;
        font-weight: 500;
        color: #919191;
    }
`
export default VisionDetail;

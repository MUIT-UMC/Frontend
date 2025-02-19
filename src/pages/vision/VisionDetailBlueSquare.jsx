import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useCustomFetchAxios from "../../hooks/fetchWithAxios";

import SearchBarDetail from "../../components/vision/detail/SearchBarDetail";
import TheatreInfo from "../../components/vision/detail/TheatereInfo";
import SeatView from "../../components/vision/detail/SeatInfo";
import location from '../../assets/icons/location.svg';
import ChevronRight from '../../assets/icons/ChevronRight.svg';
import Search from '../../assets/icons/Search2.svg';

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
    P_Before,
    Q_Before,
    R_Before,
    S_Before,
    T_Before,
    U_Before,
    V_Before,
    W_Before,
    X_Before,

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
    P_After,
    Q_After,
    R_After,
    S_After,
    T_After,
    U_After,
    V_After,
    W_After,
    X_After,

} from '../../assets/theaterSeat/blueSquare/bluesquareSeat';


const VisionDetailBS = ({theatreId}) => {
    //const { theatreId } = useParams();
    const { data: theatre, error, loading } = useCustomFetch(
        `/theatres/${theatreId}/sectionType?sectionType`
    );
    

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
        P: "Before",
        Q: "Before",
        R: "Before",
        S: "Before",
        T: "Before",
        U: "Before",
        V: "Before",
        W: "Before",
        X: "Before",
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
        P: { Before: P_Before, After: P_After },
        Q: { Before: Q_Before, After: Q_After },
        R: { Before: R_Before, After: R_After },
        S: { Before: S_Before, After: S_After },
        T: { Before: T_Before, After: T_After },
        U: { Before: U_Before, After: U_After },
        V: { Before: V_Before, After: V_After },
        W: { Before: W_Before, After: W_After },
        X: { Before: X_Before, After: X_After },
    };
    const onChange = (e) => {
        setSearchValue(e.target.value);
    }
    const handleFloorToggle = (floor) => {
        setActiveFloor(floor);
        setSelectedArea(null);
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
            P: "Before",
            Q: "Before",
            R: "Before",
            S: "Before",
            T: "Before",
            U: "Before",
            V: "Before",
            W: "Before",
            X: "Before",
        });
    };
    const toggleAreaState = (area) => {
        setSeatStates((prevStates) => {
            const newStates = {};
            Object.keys(prevStates).forEach((key) => {
                newStates[key] = key === area ? "After" : "Before";
            });
            return newStates;
        });
        setSelectedArea(area);
    };
    return(
        <Container>
            
            <DetailArea>
                <div>
                    {/*<SearchBarDetail />*/}

                    <SeatArea>
                        <div className="Stage">STAGE</div>

                        <p className="FloorTag"
                            style={{
                                background: activeFloor === 1 ? "#A00000" : "#C1C1C1",
                            }}>1층</p>
                        <Floor>
                            <div className="columns-6">
                                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((area, index) => (
                                    <img
                                        key={area}
                                        src={areaImages[area][seatStates[area]]}
                                        alt={area}
                                        className={index === 0 || index === 6 ? "left-seat-img" :
                                            index === 5 || index === 11 ? "right-seat-img" :
                                                "center-seat-img"}
                                    />
                                ))}
                            </div>
                        </Floor>

                        <p className="FloorTag"
                            style={{
                                background: activeFloor === 2 ? "#A00000" : "#C1C1C1",
                            }}>2층</p>
                        <Floor>
                            <div className="columns-3">
                                {["M", "N", "O", "P", "Q", "R"].map((area, index) => (
                                    <img
                                        key={area}
                                        src={areaImages[area][seatStates[area]]}
                                        alt={area}
                                        className={index % 3 === 0 ? "left-seat-img" :
                                            index % 3 === 2 ? "right-seat-img" :
                                                "center-seat-img"}
                                    />
                                ))}
                            </div>
                        </Floor>

                        <p className="FloorTag"
                            style={{
                                background: activeFloor === 3 ? "#A00000" : "#C1C1C1",
                            }}>3층</p>
                        <Floor>
                            <div className="columns-3">
                                {["S", "T", "U", "V", "W", "X"].map((area, index) => (
                                    <img
                                        key={area}
                                        src={areaImages[area][seatStates[area]]}
                                        alt={area}
                                        className={index % 3 === 0 ? "left-seat-img" :
                                            index % 3 === 2 ? "right-seat-img" :
                                                "center-seat-img"}
                                    />
                                ))}
                            </div>
                        </Floor>

                    </SeatArea>
                </div>
                <SeatInfo>
                    <TheatreInfo data = {theatre?.result}/>

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
                        <button
                            className={`FloorBtn ${activeFloor === 3 ? "active" : ""}`}
                            onClick={() => handleFloorToggle(3)}
                        >
                            3층
                        </button>
                    </AreaBtn>

                    <AreaSelector>
                        {activeFloor === 1 &&
                            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((area) => (
                                <button
                                    key={area}
                                    className={`AreaBtn ${seatStates[area] === "After" ? "active" : ""}`}
                                    onClick={() => toggleAreaState(area)}
                                >
                                    {area}
                                </button>
                            ))}

                        {activeFloor === 2 &&
                            ["M", "N", "O", "P", "Q", "R"].map((area) => (
                                <button
                                    key={area}
                                    className={`AreaBtn ${seatStates[area] === "After" ? "active" : ""}`}
                                    onClick={() => toggleAreaState(area)}
                                >
                                    {area}
                                </button>
                            ))}

                        {activeFloor === 3 &&
                            [ "S", "T", "U", "V", "W", "X"].map((area) => (
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
                    
                    <SeatView
                    key={selectedArea}
                    theatreId={theatreId}
                    area={selectedArea}/> 
                                                      
                </SeatInfo>

            </DetailArea>
        </Container>
    )
}

const Container = styled.div`
    font-family: Pretendard;
    padding: 0px 100px 0px 100px;
`
const DetailArea = styled.div`
    display: flex;
    gap: 132px;
    //align-items: flex-start;
`
const SeatArea = styled.div`
    width: 580px;
    margin-top: 50px;

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

`
const Floor = styled.div`
    transform: scale(0.78);
    transform-origin: top left;
    padding-left: 12px;

    .columns-6 {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 4px;
    }

    .columns-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
    }

    img {
        width: auto;
        height: auto;
        object-fit: contain;
    }
        
    .left-seat-img {     
        justify-self: end;
    }

    .center-seat-img {     
        justify-self: center;
    }

    .right-seat-img {     
        justify-self: start;
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


export default VisionDetailBS;
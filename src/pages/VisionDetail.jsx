import React, { useState } from "react";
import styled from "styled-components";
import Seat1 from '../assets/images/Seat1.png'
import bluesquare1723 from '../assets/images/bluesquare1-7-23.png';
//import charlotteSeat from "../assets/theaterSeat/charlotte/charlotteSeat";
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
    const onChange = (e) => {
        setSearchValue(e.target.value);
    }

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
                    <p>1층</p>

                    <div className="1st-floor">
                        <img src={A_Before} className="seat-img"/>
                        <img src={B_Before} className="seat-img"/>
                        <img src={C_Before} className="seat-img"/>
                        <img src={D_Before} className="seat-img"/>
                        <img src={E_Before} className="seat-img"/>
                    </div>
                </SeatArea>

                <SeatInfo> 
                    {/*API*/}
                    <img src={location}/>

                    <h3 className="title-B">샤롯데씨어터</h3>    
                    <p className="body-M-500">서울특별시 송파구 올림픽로 240</p>
                    <div className="NowShowing"> 
                        <p className="body-M-400">현재 공연 <span className="ShowTitle">미아 파밀리아</span></p>
                        <img src={ChevronRight}/>
                    </div>

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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 125px;

    .seat-img{
        width: 610px;
        height: 619px;
    }
`
const SeatArea = styled.div`
    .1st-floor {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 3개의 column */
        gap: 16px; /* 이미지 간 간격 */
    }
    img {
        object-fit: contain;
        width: 100%; /* 부모 grid cell 크기에 맞춤 */
        height: auto; /* 비율 유지 */
    }
        
    .seat-img {
        max-height: 100px;
    }
`
const SeatInfo = styled.div`
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
        border-color: #E6E6E6;
        margin-bottom: 30px;
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

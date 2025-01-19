import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";
import Seat1 from '../assets/images/Seat1.png'
import bluesquare1723 from '../assets/images/bluesquare1-7-23.png'

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
                <IoIosSearch
                    className="search-btn"
                    size={28} color="#C1C1C1" />
            </SearchBar>
            <DetailArea>
                {/*API받게 될 부분*/}
                <img src={Seat1} className="seat-img"/>

                <SeatInfo> 
                    <FaLocationDot
                    size={28} color="#A00000"/>

                    <h3 className="title-B">블루스퀘어 신한카드홀</h3>    
                    <p className="body-M-500">서울 용산구 이태원로 294</p>
                    <div className="NowShowing"> 
                        <p className="body-M-400">현재 공연 <span className="ShowTitle">지킬 앤 하이드 </span></p>
                        <GoChevronRight size={21} color="#919191"/> 
                    </div>

                    <hr className="hr-line"/>

                    <p className="body-M-400">좌석을 선택하세요</p>
                    <SeatData>
                        <h3><input/>층 <input/>열 <input/>번 좌석</h3>
                    </SeatData>

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
    padding: 0px 100px 0px 100px;
    width:140px;

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
    gap: 125px;

    .seat-img{
        width: 610px;
        height: 619px;
    }
`
const SeatInfo = styled.div`
    h3{margin:0px;}
    p{margin: 0px;}

    width: 100%;

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
const SeatData = styled.div`
    margin: 30px 0 30px 0;
    display: flex;
    align-items: center;

    font-size: 24px;
    font-weight: 700;
    color: #000000;

    input{
        background: transparent;
        border:0;
        border-style:none;
        border-collapse:collapse;

        border-bottom:solid 1px #C1C1C1; 
        height: 24px;
        width: 28px;

        text-align: center;
        font-size: 24px;
        font-weight: 700;
        color: #000000;
    }
    input:focus {
        outline: none;
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

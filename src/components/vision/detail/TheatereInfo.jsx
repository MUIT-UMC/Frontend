import styled from "styled-components"
import location from '../../../assets/icons/location.svg';
import ChevronRight from '../../../assets/icons/ChevronRight.svg';

const TheatreInfo = (props) => {
    return (
        <Container>
            <TheaterInfo>
                <img src={location} />

                <h3 className="title-B">{props?.data?.theatreName}</h3>
                <p className="body-M-500">{props?.data?.address}</p>
                <div className="NowShowing">
                    <p className="body-M-400">현재 공연 <span className="ShowTitle">{props?.data?.musicalName}</span></p>
                    <img src={ChevronRight} />
                </div>
                <hr className="hr-line" />
            </TheaterInfo>
        </Container>
    )
}

const Container = styled.div`

`
const TheaterInfo = styled.div`
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

export default TheatreInfo;
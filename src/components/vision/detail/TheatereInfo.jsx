import styled from "styled-components"
import location from '../../../assets/icons/location.svg';
import ChevronRight from '../../../assets/icons/ChevronRight.svg';
import { useNavigate } from "react-router-dom";

const TheatreInfo = (props) => {
    const navigate = useNavigate();
    return (
        <Container>
            <TheaterInfo>
                <img src={location} />

                <h3 className="title-B">{props?.data?.theatreName}</h3>
                <p className="body-M-500">{props?.data?.address}</p>

                <Text>
                    <p className="body-M-400">현재 공연</p>
                    <span className="ShowTitle"
                    onClick={()=>{navigate(`/detail/${props?.data?.musicalId}`)}}>{props?.data?.musicalName}
                    <img src={ChevronRight} /></span>
                </Text>
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

 
    .hr-line{
        border : 0px;
        border-top: 1px solid #E6E6E6;
        margin-bottom: 24px;
    }
    .title-B{
        font-size: 24px;
        font-weight: 700;
    }

    .body-M-500{
        font-size: 16px;
        font-weight: 500;
        color: #000000;
    }

`
const Text = styled.div`
    margin-top:25px;
    
    display: flex;
    align-items: center;
    gap: 12px;

    .body-M-400{
        font-size: 16px;
        font-weight: 500;
        color: #919191;
    }

    .ShowTitle{
        font-size: 16px;
        font-weight: 700;
        color: #000000;
        
        display: flex;
        align-items: center;
    }
`

export default TheatreInfo;
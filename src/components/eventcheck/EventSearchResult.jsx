import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import formatDate from "../../utils/formatDate"

const EventSearchResult = (props) => {
    const navigate = useNavigate();
    const ToEventDetail = () => {
        navigate(`/event-check/${props.id}`);
    };
    return(
        <Container  onClick={ToEventDetail}>
            {props.posterUrl ? (
                <img src={props.posterUrl} className="Poster" alt={props.name} />
            ) : (
                <div className="placeholderPic"></div>
            )}
            
            <div>
                <h3 className="body-B-600">{props.name}</h3>
                <p className="body-M-600">{props.place}</p>
                <p className="body-M-500">{props.duration}</p>
            </div>
        </Container>
    )
}

const Container = styled.div`
    font-family: Pretendard;
    display: flex;
    gap: 24px;
    box-sizing: border-box;
    width: 508px;

    padding: 12px;
    align-items: center;

    border-radius: 3px;
    border: 1px solid var(--Gray-disabled, #C1C1C1);
    background: #FFF;

    .Poster{
        width: 140px;
        height: 200px;
    }
    .placeholderPic {
        width: 140px;
        height: 200px;
        background-color: #919191;
    }
    .body-B-600{
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;    
    }
    .body-M-600{
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
    }
    .body-M-500{
        color: #919191;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
    }
`

export default EventSearchResult
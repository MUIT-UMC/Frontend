import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

import EventContent from "./EventContent";


import Heart from "../../assets/icons/heart-line.svg";

import formatDate from "../../utils/formatDate";


const MusicalEvent = (props) => {
    const navigate = useNavigate();
    const cardClick = () => {
        navigate('/event-check/' + props.id, {
            replace: false,
            state: {musicalId: props.id},
        })
    }

    const {data: musicals, error, loading} = useFetch(`/musicals/${props.id}`);

    return(
        <Card>
            <MusicalInfo>
                <img src={musicals?.result?.posterUrl } className="poster" onClick={cardClick}/>
                <MusicalDetail>
                    <div className="detail-text">
                        <h3 className="title-B-600">{props.title}</h3>
                        <div>
                            <p className="body-M-600">{props.theater}</p>
                            <p className="body-M-500">{formatDate(props.begin)}~{formatDate(props.end)}</p>
                        </div>
                    </div>
                    <img className="heart-icon" src={Heart}/>
                </MusicalDetail>
            </MusicalInfo>
            <EventArea>
                {props?.event.map((musical)=>(
                    <EventContent
                    key={musical.id}
                    content={musical.name}
                    startAt={musical.evFrom}
                    finishAt={musical.evTo}
                    />
                ))}
            </EventArea>
        </Card>
    )
}

const Card = styled.div`
    font-family: Pretendard;
    width: 330px;
    
    display: flex;
    flex-direction: column;
    gap: 24px;
`
const MusicalInfo = styled.div`
    display: flex;
    height: 200px;
    gap: 20px;

    .poster{
        width: 140px;
        height: 200px;
    }
`
const MusicalDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .detail-text{
        display: flex;
        flex-direction: column;
        gap: 26px;
    }
    h3{
        margin: 0px;
    }
    p{
        margin: 0px;
    }
    .title-B-600{
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        color: #000;
    }
    .body-M-600{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: #000;       
    }
    .body-M-500{
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        color: #919191;       
    }
    .heart-icon{
        width: 36px;
        position: relative;
        left: 0%;
        bottom: 0%;
    }
`
const EventArea = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    border: 1px, solid, #E6E6E6;
    border-radius: 3px;
    padding: 9px 13px 9px 13px;
`

export default MusicalEvent;
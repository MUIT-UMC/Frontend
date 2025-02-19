import styled from "styled-components";
import formatDateWithDay from "../../../utils/formatDateWithDay";

const EventContent = ({ content, startAt, finishAt}) => {
    return (
        <Container>
            <div className="circle" />
            <EventCard>
                <p className="body-M-600">{formatDateWithDay(startAt)} ~ {formatDateWithDay(finishAt)}</p>
                <p className="S-body-M-600">{content}</p>
            </EventCard>
        </Container>
    );
};

const Container = styled.div`
    font-family: Pretendard;
    display: flex;
    justify-content: start;
    gap: 25px;
    
    .circle {
        margin-top: 20px;
        margin-left: 16px;
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border: 1px solid #919191;
        border-radius: 50%;
    }
`;

const EventCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    width: 60%;
    border-bottom: 1px solid #E6E6E6; 
    padding: 8px 0 8px 0;

    p { margin: 0px; }
    
    .body-M-600 {
        font-size: 16px;
        font-weight: 500;
        color: #000000;
    }
    
    .S-body-M-600 {
        font-size: 14px;
        font-weight: 500;
        color: #000000; 
    }
    hr{

    }
`;

export default EventContent;
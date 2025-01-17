import styled from "styled-components";


const EventContent = (props) => {

    return (
        <Container>
            <div className="circle" />
            <EventCard>
                <p className="body-M-600">{props.startAt}~{props.finishAt}</p>
                <p className="S-body-M-600">{props.content}</p>
            </EventCard>
        </Container>

    )
}

const Container = styled.div`
    font-family: Pretendard;

    display: flex;
    gap: 25px;
    
    .circle{
        width: 20px;
        height: 20px;
        border: 1px, solid, #919191;
        border-radius: 50%;
    }
`
const EventCard = styled.div`
    p{margin:0px;}
    .body-M-600{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: #000;
    }
    .S-body-M-600{
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        color: #000;
    }
`

export default EventContent;
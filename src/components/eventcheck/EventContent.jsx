import styled from "styled-components";
import formatDateWithDay from "../../utils/formatDateWithDay";

const EventContent = ({ content, startAt, finishAt, isSelected }) => {
    return (
        <Container isSelected={isSelected}>
            <div className="circle" />
            <EventCard isSelected={isSelected}>
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
        margin-top: 5px;

        box-sizing: border-box;
        width: ${({ isSelected }) => (isSelected ? "24px" : "20px")};
        height: ${({ isSelected }) => (isSelected ? "24px" : "20px")};
        border:  ${({ isSelected }) => (isSelected ? "5px solid #A00000" : "1px solid #919191")};
        border-radius: 50%;
    }
`;

const EventCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-bottom: 1px solid #E6E6E6;
    padding: 0 0 12px 0;

    p { margin: 0px; }
    
    .body-M-600 {
        font-size: 16px;
        font-weight: 500;
        color: ${({ isSelected }) => (isSelected ? "#A00000" : "#000")};
    }
    
    .S-body-M-600 {
        font-size: 14px;
        font-weight: 500;
        color: ${({ isSelected }) => (isSelected ? "#A00000" : "#000")}; 
    }
    hr{

    }
`;

export default EventContent;
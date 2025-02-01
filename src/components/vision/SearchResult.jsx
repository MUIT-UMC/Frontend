import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchResult = (props) => {
    const navigate = useNavigate();
    const ToVisionDetail = () => {
        console.log(`Navigating to /vision/${props.id}`); 
        navigate(`/vision/${props.id}`);
    };

    return (
        <Container  onClick={ToVisionDetail}>
            {props.theatrePic ? (
                <img src={props.theatrePic} className="theatrePic" alt={props.theatreName} />
            ) : (
                <div className="placeholderPic"></div>
            )}
            
            <div>
                <h3 className="body-B-600">{props.theatreName}</h3>
                <p className="body-M-600">{props.address}</p>
            </div>
        </Container>
    )
}

export default SearchResult;

const Container = styled.div`
    font-family: Pretendard;
    display: flex;
    gap: 24px;
    box-sizing: border-box;
    width: 508px;
    height: 180px;
    padding: 12px;
    align-items: center;

    border-radius: 3px;
    border: 1px solid var(--Gray-disabled, #C1C1C1);
    background: #FFF;

    .theatrePic{
        width: 260px;
    }
    .placeholderPic {
        width: 260px;
        height: 100%;
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
`
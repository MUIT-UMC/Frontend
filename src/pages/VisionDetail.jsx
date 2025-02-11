import VisionDetailCL from "./vision/VisionDetailLotte";
import VisionDetailBS from "./vision/VisionDetailBlueSquare";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const VisionDetailMain = () => {
    const { theatreId } = useParams();
    const id = Number(theatreId);
    return(
        <Container>
            {id === 1 && <VisionDetailBS/>}
            {id === 7 && <VisionDetailCL/>}        
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding-top: 80px;
`

export default VisionDetailMain;
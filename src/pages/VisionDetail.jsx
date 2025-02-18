import VisionDetailCL from "./vision/VisionDetailLotte";
import VisionDetailBS from "./vision/VisionDetailBlueSquare";
import SearchBarDetail from "../components/vision/detail/SearchBarDetail";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const VisionDetailMain = ({theatreId}) => {
    //const { theatreId } = useParams();
    const id = Number(theatreId);
    return(
        <Container>
            <SearchBarDetail/>

            {id === 1 && <VisionDetailBS theatreId={1}/>}
            {id === 7 && <VisionDetailCL theatreId={7}/>}        
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding-top: 80px;
`

export default VisionDetailMain;
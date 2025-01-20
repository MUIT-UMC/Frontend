import styled from "styled-components";
import MuitLogo from "../../components/signup/muitLogo";

const COLOR_MUIT_RED = "#A00000";

function Info() {

    return(
        <Page>
            <MuitLogo />
            <Container>
                <SideMenu>
                    <div> 01 약관 동의 </div>
                    <div  className="nowHere"> 02 정보 입력 </div>
                </SideMenu>

            </Container>

        </Page>

    )
}


const Page = styled.div`
    font-family: Pretendard;
    padding: 120px 100px 0 100px;

    display: flex;
    flex-direction: column;
`
const Container = styled.div`
    display: flex;
    gap: 116px;
    padding-top: 80px;
`
const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    div{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: #919191;

        display:flex;
        align-items: center;

        box-sizing: border-box;
        width: 200px;
        height: 40px;
        padding: 8px 20px;
        border-radius: 3px;
        border: 1px solid #E6E6E6;
    }
    .nowHere{
        border: 1px solid #A00000;
        background: #A00000;
        color: #FFF;
    }
`

export default Info;
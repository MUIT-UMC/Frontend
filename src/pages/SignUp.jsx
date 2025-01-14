import styled from "styled-components";
import { Link } from "react-router-dom";
import MuitElement from '../assets/logos/MuitElement.png';
import Google from '../assets/logos/google.png';
import Kakao from '../assets/logos/kakao.png';
import Naver from '../assets/logos/naver.png';

const COLOR_MUIT_RED = "#A00000";

function SignUp() {

    return(
        <Container>
            <img src={MuitElement} className="MuitElement" />
            <LogoLink>MUIT</LogoLink>
            <h3>회원가입 후 MUIT의 다양한 서비스를 경험해보세요</h3>
            <BtnArea>
                <SignUpBtn bgcolor={COLOR_MUIT_RED} color={'#FFF'}> 개인 회원가입 </SignUpBtn>
                <SignUpBtn bgcolor={'#FDDC3F'} color={'#000'}> <img src={Kakao}/>카카오로 가입 </SignUpBtn>
                <SignUpBtn bgcolor={'#00B818'} color={'#FFF'}><img src={Naver}/> 네이버로 가입 </SignUpBtn>
                <SignUpBtn bgcolor={'#FFF'} border={'#E6E6E6'} color={'#000'}> <img src={Google}/>구글로 가입 </SignUpBtn>
            </BtnArea>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-family: Pretendard;

    padding: 100px 100px 0px 100px;

    .MuitElement{
        width: 90px;
        margin-bottom: 32px;
    }
    h3{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
    }
`
const LogoLink = styled(Link)`
    font-family:  "BelgianoSerif";
    font-size: 80px;
    font-weight: 400;

    margin-bottom: 10px;

    text-decoration: none;
    color: ${COLOR_MUIT_RED};
`
const BtnArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    gap: 20px;
`
const SignUpBtn = styled.button`
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    border-radius: 3px;

    display: flex;
    justify-content:center;
    align-items: center;

    border: 1px solid ${(props) => props.border || props.bgcolor};
    background: ${(props) => props.bgcolor};

    color: ${(props) => props.color};

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;

    img{
        width: 40px;
    }
`


export default SignUp;
import styled from "styled-components";
import { Link } from "react-router-dom";
import MuitElement from '../assets/logos/MuitElement.png';
import Google from '../assets/logos/google.png';
import Kakao from '../assets/logos/kakao.png';
import Naver from '../assets/logos/naver.png';

const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const googleClientSecret = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;
const googleRedirectUrl = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL;


const COLOR_MUIT_RED = "#A00000";

function SignUp() {
    /*const googleLogin = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUrl}&response_type=code&scope=email profile`;

        const loginWindow = window.open(url, "Connect Google Account", "width=700,height=600");

        window.addEventListener(
            "message",
            async (event) => {
                if (event.origin !== window.location.origin) return;
                if (event.data?.code) {
                    console.log("구글 인증 코드:", event.data.code);

                    try {
                        const response = await fetchData("/login/oauth2/code/google", "POST", { code: event.data.code });

                        if (response?.result) {
                            console.log("구글 로그인 성공:", response);
                            localStorage.setItem("accessToken", response.result.accessToken);
                            localStorage.setItem("refreshToken", response.result.refreshToken);
                            navigate("/");
                        }
                    } catch (error) {
                        console.error("구글 로그인 실패:", error);
                    }
                }
            },
            { once: true }
        );
        
    };*/


    return(
        <Container>
            <img src={MuitElement} className="MuitElement" />
            <LogoLink>MUIT</LogoLink>
            <h3>회원가입 후 MUIT의 다양한 서비스를 경험해보세요</h3>
            <BtnArea>
                <SignUpBtn 
                to='/signup/terms' 
                bgcolor={COLOR_MUIT_RED} 
                color={'#FFF'}> 개인 회원가입 </SignUpBtn>

                <SignUpBtn 
                bgcolor={'#FDDC3F'} 
                color={'#000'}> <img src={Kakao}/>카카오로 가입 </SignUpBtn>

                <SignUpBtn bgcolor={'#00B818'} color={'#FFF'}><img src={Naver}/> 네이버로 가입 </SignUpBtn>

                <SignUpBtn
                bgcolor={'#FFF'}
                border={'#E6E6E6'}
                color={'#000'}
                onClick={googleLogin}><img src={Google}/>구글로 가입 </SignUpBtn>
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
const SignUpBtn = styled(Link)`
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    border-radius: 3px;

    display: flex;
    justify-content:center;
    align-items: center;

    cursor: pointer;

    border: 1px solid ${(props) => props.border || props.bgcolor};
    background: ${(props) => props.bgcolor};

    color: ${(props) => props.color};
    text-decoration-line: none;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;

    img{
        width: 38px;
    }
`


export default SignUp;
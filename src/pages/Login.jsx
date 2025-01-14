import styled from "styled-components";
import { Link } from "react-router-dom";
import MuitElement from '../assets/logos/MuitElement.png';
import Google from '../assets/logos/google.png';
import Kakao from '../assets/logos/kakao.png';
import Naver from '../assets/logos/naver.png';

const COLOR_MUIT_RED = "#A00000";

function Login() {
    return(
        <Containter>
            <img src={MuitElement} className="MuitElement"/>
            <LogoLink>MUIT</LogoLink>
            <LoginForm>
                <Input placeholder="아이디"/>
                <Input placeholder="비밀번호"/>
            </LoginForm>
            <OptionArea>
                <div className="keepLogin">
                    <input type="checkbox" className="LoginCheck" id="LoginCheck"/>
                    <label htmlFor="LoginCheck">로그인 상태 유지</label>
                </div>
                <FindInfo>
                    <span>아이디 찾기</span>
                    <span> | </span>
                    <span>비밀번호 찾기</span>
                </FindInfo>
            </OptionArea>
            <BtnArea>
                <LoginBtn>로그인</LoginBtn>
                <SignUpBtn>회원가입</SignUpBtn>
            </BtnArea>
            <SocialLogin>
                <SocialIcon url={Kakao}/>
                <SocialIcon url={Naver}/>
                <SocialIcon url={Google}/>
            </SocialLogin>
        </Containter>
    )
}

const Containter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-family: Pretendard;

    padding: 100px 100px 0px 100px;

    .MuitElement{
        width: 90px;
        margin-bottom: 32px;
    }
`
const LogoLink = styled(Link)`
  font-family:  "BelgianoSerif";
  font-size: 80px;
  font-weight: 400;

  margin-bottom: 60px;

  text-decoration: none;
  color: ${COLOR_MUIT_RED};
`

const LoginForm = styled.form`
    margin-bottom: 20px;    
`
const Input = styled.input`
    box-sizing: border-box;
    display: flex;
    align-items: center;

    width: 500px;
    height: 60px;

    border: 1px solid #C1C1C1;
    border-radius: 3px;
    background: #FFF;

    padding: 8px 20px 8px 20px;
            
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;

    &::placeholder{
        color: #919191; 
    }
`
const OptionArea = styled.div`
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #989898;
    font-size: 14px;
    font-weight: 500;

    .keepLogin{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .LoginCheck{
        appearance: none;
        width: 20px;
        height: 20px;

        border-radius: 50%;
        border: 1px solid #898989;
    }
    .LoginCheck:checked{
        background: ${COLOR_MUIT_RED};
        border: none;
    }
`
const FindInfo = styled.div`

`
const BtnArea = styled.div`
    margin-top: 50px;

    display: flex;
    flex-direction: column;
    gap: 20px;
`
const LoginBtn = styled.button`
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    border-radius: 3px;

    border: 1px solid #A00000;
    background: ${COLOR_MUIT_RED};

    color: #FFF;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
`
const SignUpBtn = styled.button`
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    border-radius: 3px;

    border: 1px solid #E6E6E6;
    background: #FFF;

    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
`
const SocialLogin = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    gap: 60px;    
`
const SocialIcon = styled.button`
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background: url('${(props) => props.url}');
    background-size: cover;
`

export default Login;
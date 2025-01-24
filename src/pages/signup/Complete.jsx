import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Complete() {
    const navigate = useNavigate();
    const toHome = () =>{
        navigate('/');
    };

    return (
        <Container>
            <h3>회원가입 완료!</h3>
            <Button onClick={toHome}>홈 화면으로 이동하기</Button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 340px 100px 340px 100px;

    h3{
    color: #A00000;
    text-align: center;
    /* Title-semibo */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    }
`
const Button = styled.button`
    width: 400px;
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 3px;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: var(--Gray-white-bg, #FFF);
    cursor: pointer;

    color: #000;
    /* Body-me */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
`

export default Complete;
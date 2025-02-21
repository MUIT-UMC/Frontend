import styled, { keyframes } from "styled-components";

const skeleton = keyframes`
    0%{
        opacity: 1;
    }
    30%{
        opacity: 0.7;
    }
    50%{
        opacity: 0.4;
    }
    80%{
        opacity: 0.8;
    }
    100%{
        opacity: 1;
    }

`

const Container = styled.div`
    background: rgb(230, 230, 230);

    display: flex;
    flex-direction: column;
`

const Area = styled.div`
    background: rgb(230, 230, 230);
    width: 400px;
    height: 24px;
    border-radius: 3px;
    animation: ${skeleton} 2s 1s infinite linear alternate;
`

const Info = styled.div`
    background: rgb(230, 230, 230);
    width: 400px;
    height: 24px;
    border-radius: 3px;
    animation: ${skeleton} 2s 1s infinite linear alternate;
`
const Picture = styled.div`
    background: rgb(230, 230, 230);
    width: 200px;
    height: 250px;
    border-radius: 3px;
    animation: ${skeleton} 2s 1s infinite linear alternate;
`

export {Container, Area, Info, Picture}
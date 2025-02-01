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
    display: flex;
    flex-direction: column;
`
const Poster = styled.div`
    width: 140px;
    height: 200px;
    background: rgb(230, 230, 230);
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;

`
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 26px;

`
const Title = styled.div`
    width: 150px;
    height: 36px;
    background: rgb(230, 230, 230);
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;

`
const Detail = styled.div`
    width: 150px;
    height: 24px;
    background: rgb(230, 230, 230);
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;

`
const Events = styled.div`
    width: 347px;
    height: 85px;
    background: rgb(230, 230, 230);
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;

`

export {Container, Poster, TextWrapper, Title, Detail, Events}
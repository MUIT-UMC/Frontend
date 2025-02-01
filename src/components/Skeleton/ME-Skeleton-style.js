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
    width: 345px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    gap: 24px;
`
const InfoWrapper = styled.div`
    display: flex;
    gap: 20px;
`
const Poster = styled.div`
    width: 140px;
    height: 200px;
    background: rgb(230, 230, 230);
    border-radius: 3px;
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;
`
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 200px;
    gap: 4px;
`
const Title = styled.div`
    width: 150px;
    height: 36px;
    margin-bottom: 20px;
    border-radius: 3px;
    background: rgb(230, 230, 230);
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;
`
const Detail = styled.div`
    width: 150px;
    height: 22px;
    border-radius: 3px;
    background: rgb(230, 230, 230);
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;

`
const Events = styled.div`
    width: 347px;
    height: 85px;
    border-radius: 3px;
    background: rgb(230, 230, 230);
    overflow: hidden;
    animation: ${skeleton} 2s 1s infinite linear alternate;

`

export {Container, InfoWrapper, Poster, TextWrapper, Title, Detail, Events}
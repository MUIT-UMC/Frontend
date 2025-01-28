import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

// Step4 - 결제하기기
const Step4 = () => {
const navigate = useNavigate();  // useNavigate 훅 사용  
  
return (
    <Container>
    <Button>결제하기</Button>
    <Button onClick={() => navigate('../step3')}>이전</Button>  {/* 이전 페이지로 이동 */}
    </Container>
  );
};

export default Step4;

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 1440px;
  height: 864px;
  margin: 0 auto;
  position: relative;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;


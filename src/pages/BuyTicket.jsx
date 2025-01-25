import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Step1 from '../components/buy/Step1';
import Step2 from '../components/buy/Step2';
import Step3 from '../components/buy/Step3';

const BuyTicket = () => {
    return (
      <Routes>
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/" element={<Step1 />} />
      </Routes>
    );
  };

export default BuyTicket;

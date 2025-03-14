import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Step1 from '../../components/buy/Step1';
import Step2 from '../../components/buy/Step2';
import Step3 from '../../components/buy/Step3';
import Step4 from '../../components/buy/Step4';
import Step5 from '../../components/buy/Step5';

const BuyTicket = () => {
    return (
      <Routes>
        <Route index element={<Step1 />} />
        <Route path="step2" element={<Step2 />} />
        <Route path="step3" element={<Step3 />} />
        <Route path="step4" element={<Step4 />} />
        <Route path="step5" element={<Step5 />} />
      </Routes>
    );
  };

export default BuyTicket;

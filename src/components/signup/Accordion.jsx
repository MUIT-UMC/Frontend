import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ToggleUp from "../../assets/icons/ToggleUp.svg";
import ToggleDown from "../../assets/icons/ToggleDown.svg";

const COLOR_MUIT_RED = "#A00000";

const TermsAccordion = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [checkedTerms, setCheckedTerms] = useState({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
    term5: false,
  });

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCheckboxChange = (id) => {
    setCheckedTerms((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      updated.all = Object.values(updated).slice(1).every((checked) => checked);
      return updated;
    });
  };

  return (
    <Container>
      {props?.terms.map((term, index) => (
        <Accordion key={term.id}>
          <input
            type="checkbox"
            id={term.id}
            className="agree-chk"
            checked={checkedTerms[term.id]}
            onChange={() => handleCheckboxChange(term.id)}
          />
          <BorderArea>
            <AccordionHeader>
              <label htmlFor={term.id}>{term.title}</label>
              <ToggleButton onClick={() => toggleAccordion(index)}>
                {activeIndex === index ? <img src={ToggleUp}/> : <img src={ToggleDown}/>}
              </ToggleButton>
            </AccordionHeader>

            {activeIndex === index && (
              <AccordionContent>
                <p>{term.content}</p>
              </AccordionContent>
            )}
          </BorderArea>

        </Accordion>
      ))}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  width: 100%;
`;
const Accordion = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: start;

  .agree-chk{
    appearance: none;
    box-sizing: border-box;
    margin-top: 12px;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid #919191;
    }
  .agree-chk:checked{
    background: ${COLOR_MUIT_RED};
    border: 1px solid ${COLOR_MUIT_RED};
  }
`;
const BorderArea = styled.div`
  border-radius: 3px;
  border: 1px solid  #E6E6E6;
  box-sizing: border-box;
  width: 784px;
`
const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 40px;
  padding: 8px 12px;

  cursor: pointer;
  input {
    margin-right: 8px;
  }
  label {
    flex: 1;
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  padding: 12px 8px;
  p {
    margin: 0;
    color: #919191;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
`;
export default TermsAccordion;
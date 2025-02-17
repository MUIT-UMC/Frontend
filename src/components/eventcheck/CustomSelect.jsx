import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChevronDown from "../../assets/icons/ChevronDown_91.svg";

const CustomSelect = ({ options, defaultValue, onChange, width = "auto" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    onChange(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dropdown ref={dropdownRef} width={width}>
      <SelectButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {options.find((opt) => opt.value === selectedOption)?.label || "선택"}
        <Icon src={ChevronDown} isOpen={isOpen} />
      </SelectButton>

      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Dropdown>
  );
};

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ width }) => (width ? `${width}px` : "auto")};
`;

const SelectButton = styled.button`
  font-family: Pretendard;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  
  padding: 4px 12px;
  width:100%;
  height: 35px;

  border: 1px solid #c1c1c1;
  border-radius: 2px;
  background: white;
  color: #919191;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover,
  &:focus {
    background: #f5f5f5;
  }
`;

const Icon = styled.img`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 2px;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #000;

  &:hover {
    background: #f5f5f5;
    color: #000;
  }
`;

export default CustomSelect;

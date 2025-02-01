import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';

import SearchIconBlack from "../../../assets/icons/AdminSearchBlack.svg";
import SearchIconRed from "../../../assets/icons/AdminSearchRed.svg";
import CheckBoxIcon from "../../../assets/icons/AdminCheckbox.svg";
import CheckBoxIconRed from "../../../assets/icons/AdminCheckboxRed.svg";
import DoubleLeftIcon from "../../../assets/icons/DoubleLeft.svg";
import SingleLeftIcon from "../../../assets/icons/SingleLeft.svg";
import SingleRightIcon from "../../../assets/icons/SingleRight.svg";
import DoubleRightIcon from "../../../assets/icons/DoubleRight.svg";

import SearchBar from "../components/SearchBar";
import SearchBar1 from '../components/SearchBar1';

const COLOR_WHITE = "#FFFFFF";
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "#000000";
const COLOR_GRAY_UNSELECTED = "#C1C1C1";
const COLOR_GRAY_SUB = "#919191";

//Musical Mock Data
export const musicalData = [
  { musical: "아스날", date_time: "1889-01-09 / 12:20", price: "VIP석 290,000원 R석 260,000원  S석 230,000원  A석 190,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
  { musical: "알라딘", date_time: "2025-01-09 / 14:50", price: "VIP석 190,000원 R석 160,000원  S석 130,000원  A석 90,000원" },
]
export const colKeys = ["musical", "date_time", "price"];
export const colLabels = ["뮤지컬", "시간/날짜", "가격"];

export default function AdminMusical() {
  
  // 1. 체크박스 기능 ////////////////////////////////////////////////
  const [checkboxes, setCheckboxes] = useState([false, false, false]);
  const toggleCheck = (index) => {
    setCheckboxes((prev) => {
      if (prev[index]) { // 만약 이미 체크되어 있다면 => 전부 해제
        return [false, false, false];
      }                 // 아니라면 => 해당 index만 true, 나머지는 false
      const newState = [false, false, false];
      newState[index] = true;
      return newState;
    });
  };
  const isAnyChecked = checkboxes.some((checked) => checked === true);

  // 2. SearchBar 검색 기능 ////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (inputValue) => {
    // 검색버튼 누르면 SearchBar에서 넘어온 값
    setSearchTerm(inputValue);
    setCurrentPage(1); // 검색 시 1페이지로
  };

  // 3. Table 기능 ////////////////////////////////////////////////////
  let displayedColIndexes = [];
  const checkedIndex = checkboxes.findIndex((val) => val === true);
  if (checkedIndex === -1) {
    // 전부 false => 전체 컬럼
    displayedColIndexes = [0, 1, 2];
  } else {
    // 하나 체크 => 그 컬럼럼만
    displayedColIndexes = [checkedIndex];
  }

  // 4. SearchBar 검색 로직 ////////////////////////////////////////////
  let searchKey = "musical"; // default - 아무것도 체크 안 됐으면 뮤지컬명으로 검색, 체크된 게 있으면 해당 컬럼으로 검색
  if (checkedIndex !== -1) {
    searchKey = colKeys[checkedIndex];
  }
  const filteredData = musicalData.filter((musical) => {
    if (!searchTerm) return true; // 아무것도 안쳤다면 전체
    const fieldValue = (musical[searchKey] ?? "").toString().toLowerCase();
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  // 5. 페이지네이션 기능 ////////////////////////////////////////////////////
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // 5페이지 단위로 그룹핑
    const groupIndex = Math.floor((currentPage - 1) / 5);
    const groupStart = groupIndex * 5 + 1;
    const groupEnd = Math.min(groupStart + 4, totalPages);
    // 현재그룹에서 표시할 페이지 번호들
    const displayedPages = [];
    for (let p = groupStart; p <= groupEnd; p++) {
      displayedPages.push(p);
    }
    // 현재 페이지에서 보여줄 데이터
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentData = filteredData.slice(startIdx, endIdx);
    // 페이지 이동 함수
    const goToPage = (pageNum) => {
      if (pageNum >= 1 && pageNum <= totalPages) {
        setCurrentPage(pageNum);
      }
    };
    // “<<” 버튼: 이전 그룹의 마지막 페이지로 이동
    const handleDoubleLeft = () => {
      if (groupIndex > 0) {
        const prevGroupLast = (groupIndex - 1) * 5 + 5;
        goToPage(prevGroupLast);
      }
    };
    // “>>” 버튼: 다음 그룹의 첫 페이지로 이동
    const handleDoubleRight = () => {
      if (groupEnd < totalPages) {
        goToPage(groupEnd + 1);
      }
    };

  return (
    <Container>
      <Tilte>뮤지컬 관리</Tilte>
      <SearchSection>
        <SearchBar1 onSearch={handleSearch}/>
        <CheckBoxes>
          {colLabels.map((label, idx) => (
            <CheckBoxWrapper key={label}>
              <CheckBox onClick={() => toggleCheck(idx)}>
                <img
                  src={checkboxes[idx] ? CheckBoxIconRed : CheckBoxIcon}
                  alt="CheckBox Icon"
                />
              </CheckBox>
              <CheckText>{label}</CheckText>
            </CheckBoxWrapper>
          ))}
          <CheckSearchIcon><img src={isAnyChecked ? SearchIconRed : SearchIconBlack} alt="Search Icon" /></CheckSearchIcon>
        </CheckBoxes>
      </SearchSection>

      <Data>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                {/* 선택된 컬럼들만 thead에 표시 */}
                {displayedColIndexes.map((i) => (
                  <th key={colKeys[i]}>{colLabels[i]}</th>
                ))}
                {/* "관리" 열은 항상 */}
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((musical, index) => (
                <tr key={index}>
                  {/* 선택된 컬럼들만 td */}
                  {displayedColIndexes.map((i) => (
                    <td key={colKeys[i]}>{musical[colKeys[i]]}</td>
                  ))}
                  {/* 상세페이지버튼 */}
                  <td>
                    <DetailButton to={`/adminpage/musical/detail/${musical.musical}`}>상세</DetailButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </Data>

      <Pagination>
        <PageArrow
          disabled={groupIndex === 0}
          onClick={handleDoubleLeft}
        >
          <img src={DoubleLeftIcon} alt="Double Left" />
        </PageArrow>
        <PageArrow
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <img src={SingleLeftIcon} alt="Single Left" />
        </PageArrow>

        {displayedPages.map((page) => (
          <PageNumber
            key={page}
            $active={page === currentPage}
            onClick={() => goToPage(page)}
          >
            {page}
          </PageNumber>
        ))}

        <PageArrow
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <img src={SingleRightIcon} alt="Single Right" />
        </PageArrow>
        <PageArrow
          disabled={groupEnd >= totalPages}
          onClick={handleDoubleRight}
        >
          <img src={DoubleRightIcon} alt="Double Right" />
        </PageArrow>
      </Pagination>
    </Container>
  );  
}


/* --------- Styled Components --------- */

const Container = styled.div`
  position: relative;
  width:  1150px;
  height: 916px;
  background-color: #fff;
  padding-left: 71px;
  padding-right:  131px;
  box-sizing: border-box;

  display:  flex;
  flex-direction: column;
  justify-content:  flex-start;
`;

const Tilte = styled.div`
  margin-top: 4px;
  font-family:  "Pretendard";
  font-size: 24px;
  font-weight: 500;
  color:  ${COLOR_MUIT_RED};
`;

const SearchSection = styled.div`
  margin-top:  15px;
  display:  flex;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBoxes = styled.div`
  display:  flex;
  gap:  18px;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBoxWrapper = styled.div`
  display:  flex;
  gap:  15px;
  justify-content:  space-between;
  align-items:  center;
`;

const CheckBox = styled.button`
  border: none;
  cursor: pointer;
  width: 19px;
  height: 19px;
  background-color: transparent;
`;

const CheckText = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR_GRAY_MAINTEXT};
`;

const CheckSearchIcon = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Data = styled.div`
  margin-top: 40px;
  width:  100%;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: 691px; 
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;  /* 겹치지 않게 */

  th, td {
    line-height: 30px;
    border: 1px solid ${COLOR_GRAY_MAINTEXT};
    text-align: center;
    font-size: 14px;
    font-family: "Pretendard";
    font-weight: 500;
  }
  th {
    background-color: #eee;
    font-weight: 500;
  }
`;

const DetailButton = styled(Link)`
  text-decoration: none;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 500;
  color:  #555555;
  border: 1px solid #D9D9D9;
  background-color: #D9D9D9;
  cursor: pointer;

  &:hover {
    border-color: ${COLOR_MUIT_RED};
    color: ${COLOR_MUIT_RED};
  }
`;

const Pagination = styled.div`
  width:  948px;;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const PageArrow = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  img {
    width: 100%;
    height: auto;
  }
`;

const PageNumber = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  font-size: ${({ $active }) => ($active ? "16px" : "14px")};
  font-weight: 500;
  color: ${({ $active }) => ($active ? COLOR_GRAY_MAINTEXT : COLOR_GRAY_SUB)};

  &:hover {
    color: ${COLOR_GRAY_MAINTEXT};
  }
`;
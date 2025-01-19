import React from 'react';

// 날짜 포맷팅 함수 
function formatDate(dateString) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = days[date.getDay()];

  return `${month}.${day} (${dayOfWeek})`;
}

// 재사용 가능한 컴포넌트
const FormattedDate = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;

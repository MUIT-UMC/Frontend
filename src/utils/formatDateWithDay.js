export default function formatDateWithDay(dateString) {
    if (!dateString) return ''; 
    
    const date = new Date(dateString);
    const options = { weekday: "short" }; // 요일을 짧은 형식(예: '토')으로 가져옴
    const dayOfWeek = new Intl.DateTimeFormat("ko-KR", options).format(date);
  
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월(0부터 시작이므로 +1)
    const day = String(date.getDate()).padStart(2, "0"); // 일
  
    return `${month}/${day}(${dayOfWeek})`;
  }
  
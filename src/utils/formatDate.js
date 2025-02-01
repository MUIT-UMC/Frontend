export default function formatDate(dateString) {
    if (!dateString) return ""; // 빈 값 처리
    return dateString.replace(/-/g, ".");
}

  
  
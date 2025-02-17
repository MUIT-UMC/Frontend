const kakaoRestApi = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;
const kakaoRedirectUri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;

export default function kakaoSignup() {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApi}&redirect_uri=${kakaoRedirectUri}&response_type=code`;

    const loginWindow = window.open(url, "Connect Kakao Account", "width=700,height=600");

    if (!loginWindow) {
        window.location.href = url;
        return;
    }

    const checkPopup = setInterval(() => {
        if (loginWindow.closed) {
            clearInterval(checkPopup);
            console.log("카카오 로그인 팝업이 닫혔습니다.");
            // 인증 코드 처리 로직 추가 필요
        }
    }, 1000);
}
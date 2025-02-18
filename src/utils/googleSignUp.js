const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const googleClientSecret = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;
const googleRedirectUri = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;

export default function googleLogin() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=email profile`;

    const loginWindow = window.open(url, "Connect Google Account", "width=700,height=600");

    window.addEventListener(
        "message",
        async (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data?.code) {
                console.log("구글 인증 코드:", event.data.code);
                const parsedHash = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = parsedHash.get("access_token");
                console.log(accessToken)

                try {
                    const response = await fetchData("/login/oauth2/code/google", "POST", { code: event.data.code });

                    if (response?.result) {
                        console.log("구글 로그인 성공:", response);
                        localStorage.setItem("accessToken", response.result.accessToken);
                        localStorage.setItem("refreshToken", response.result.refreshToken);
                        navigate("/");
                    }
                } catch (error) {
                    console.error("구글 로그인 실패:", error);
                }
            }
        },
        { once: true }
    );
    
};

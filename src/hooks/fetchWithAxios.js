import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

const useCustomFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!url) return; // URL이 비어있으면 요청 안 보냄

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(url);
                setData(response.data); // response 전체가 아니라 response.data 저장
                setError(false); // 에러 초기화
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useCustomFetch;
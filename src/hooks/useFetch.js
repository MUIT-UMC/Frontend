import { useEffect, useState } from 'react';
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const muit_server = serverUrl + url;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(muit_server, options);
        if (!response.ok) {
          throw new Error('네트워크 응답 실패');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetch;

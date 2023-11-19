import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = 'ffjhjhgjhgjkghjkghjg';
    const sendRequest = useCallback(async (requestConfig, applyData, applyError) => {
        // if (token || requestConfig.url.includes('regist_guest')) {
        setIsLoading(true);
        setError(null);
        // let contentTypeHeader = requestConfig.method === 'POST' ? { 'Content-Type': 'application/json' } : {};
        // let langHeader = { 'lang': 'ar' };
        // let tokenHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
        let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        try {
            const response = await fetch(
                requestConfig.url,
                {
                    method: requestConfig.method,
                    headers: { ...requestConfig.headers },
                    body: JSON.stringify(requestConfig.body)
                }
            );
            if (!response.ok) {
                if (response.status === 401) {
                }
                throw new Error('Request Failed!');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(`${data.message}  ${data.errors ? ('(' + data.errors.join(', ') + ')') : ''}`);
            }
            applyData(data);
        } catch (err) {
            setError(err.message);
            applyError(err.message);
        }
        setIsLoading(false);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;
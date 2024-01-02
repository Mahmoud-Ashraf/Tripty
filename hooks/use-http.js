import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react"

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const lang = useSelector(state => state.lang.globalLang);
    const router = useRouter();

    const sendRequest = useCallback(async (requestConfig, applyData, applyError) => {
        const baseUrl = window.location.origin;
        const session = await getSession();
        const token = session?.token;
        console.log('token useHttp(): ', token);
        setIsLoading(true);
        setError(null);
        let url = requestConfig.url;
        let contentTypeHeader = requestConfig.method === 'POST' ? { 'Content-Type': 'application/json' } : {};
        let tokenHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
        if (requestConfig.method === 'GET') {
            const newUrl = new URL(baseUrl + url);
            newUrl.searchParams.set(`locale`, `${router.locale || 'ar'}`);
            url = newUrl.toString();
        }
        try {
            const response = await fetch(
                url,
                {
                    method: requestConfig.method,
                    headers: { ...tokenHeader, ...contentTypeHeader, ...requestConfig.headers },
                    body: JSON.stringify(requestConfig.body)
                }
            );
            if (!response.ok) {
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                } else {
                    throw new Error('Request Failed');
                }
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
    }, [lang]);
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;
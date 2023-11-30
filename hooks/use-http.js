import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const lang = useSelector(state => state.lang.globalLang);
    const router = useRouter();
    const { data: session } = useSession();

    // const token = 'ffjhjhgjhgjkghjkghjg';
    const sendRequest = useCallback(async (requestConfig, applyData, applyError) => {
        // if (token || requestConfig.url.includes('regist_guest')) {
        const token = session?.token;
        const baseUrl = window.location.origin;
        setIsLoading(true);
        setError(null);
        let url = requestConfig.url;
        let contentTypeHeader = requestConfig.method === 'POST' ? { 'Content-Type': 'application/json' } : {};
        // let langHeader = { 'lang': 'ar' };
        let tokenHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
        // let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
            // console.log(await response.json());
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
    }, [session?.token]);
    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHTTP;
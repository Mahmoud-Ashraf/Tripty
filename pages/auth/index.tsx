import router from "next/router";
import { useEffect } from "react";

const Auth = () => {
    useEffect(() => {
        router.push('/auth/login');
    }, []);
}

export default Auth;
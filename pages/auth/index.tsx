import { Slider } from '@/interfaces/slider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/auth/login');
    }, []);

    return (
        <>
        </>
    )
}

export default Auth;
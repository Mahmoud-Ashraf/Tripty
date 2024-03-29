import Link from 'next/link';
import classes from './auth.module.scss';
import Head from 'next/head';
import { useEffect, useLayoutEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react"
import { Button, Form } from 'react-bootstrap';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import AuthLayout from '@/components/layout/AuthLayout/AuthLayout';
import { useRouter } from 'next/router';
import Loader from '@/components/UI/Loader/Loader';

const Login = (props: any) => {
    const { sliders } = props;
    const { translate } = useTranslate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        }).then(data => {
            if (data?.error) {
                setLoginError('errors.wrongCredentials');
            } else {
                setLoginError('');
            }
            setIsLoading(false);
        });

    };

    useLayoutEffect(() => {
        if (session) {
            router.push('/home');
        }
    }, [session, router]);

    if (session) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Tripty - Login</title>
            </Head>
            <AuthLayout sliders={sliders}>
                <Form>
                    <h1><Translate id='auth.login' /></h1>
                    <input className={classes.input} disabled={isLoading} type="email" placeholder={translate('placeholder.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className={classes.input} disabled={isLoading} type="password" placeholder={translate('placeholder.password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                    {loginError && <p className={classes.loginError}><Translate id={loginError} /></p>}
                    <Form.Group className="d-flex justify-content-between">
                        <Link href={'/auth/forget-password'}><Translate id='auth.forgetPassword' /></Link>
                    </Form.Group>
                    <div className={`d-grid gap-2 ${classes.submit}`}>
                        <Button variant="main" type="button" onClick={handleSignIn} disabled={isLoading}>
                            {isLoading ? <Loader /> : <Translate id='buttons.login' />}
                        </Button>
                    </div>
                </Form>
                <div className={classes.socialLogin}>
                    <p><Translate id='auth.loginBy' /></p>
                    <div className={classes.loginOptions}>
                        <button className={classes.loginOption} disabled={isLoading} onClick={() => signIn('google', { callbackUrl: '/home' })}><i className="fa-brands fa-google"></i></button>
                        <button className={classes.loginOption} disabled={isLoading} onClick={() => signIn('facebook', { callbackUrl: '/home' })}><i className="fa-brands fa-facebook-f"></i></button>
                        <button className={classes.loginOption} disabled={isLoading} onClick={() => signIn('twitter', { callbackUrl: '/home' })}><i className="fa-brands fa-x-twitter"></i></button>
                        <button className={classes.loginOption} disabled={isLoading} onClick={() => signIn('apple', { callbackUrl: '/home' })}><i className="fa-brands fa-apple"></i></button>
                    </div>
                </div>
                <Link href={'/auth/register'} className={classes.register}><Translate id='auth.registerWithMail' /></Link>
            </AuthLayout>
        </>
    )
}

export async function getServerSideProps() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        const slidersReq = await fetch(`${baseUrl}sliders`);
        const slidersData = await slidersReq.json();

        return {
            props: {
                sliders: slidersData.data,
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                sliders: [] // Adjust based on the expected sliders data structure
            }
        };
    }
}

export default Login;
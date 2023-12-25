import Link from 'next/link';
import classes from './auth.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { signIn } from "next-auth/react"
import { Button, Form } from 'react-bootstrap';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import AuthLayout from '@/components/layout/AuthLayout/AuthLayout';

const ForgetPassword = (props: any) => {
    const { sliders } = props;
    const { translate } = useTranslate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const handleSignIn = async () => {
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
        });

    };
    return (
        <>
            <Head>
                <title>Tripty - Forget Password</title>
            </Head>
            <AuthLayout sliders={sliders}>
                <Form>
                    <h1><Translate id='auth.enterEmail' /></h1>
                    <input className={classes.input} type="email" placeholder={translate('placeholder.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                    {/* {loginError && <p className={classes.loginError}><Translate id={loginError} /></p>} */}
                    {/* <Form.Group className="d-flex justify-content-between">
                        <Link href={'/home'}><Translate id='auth.forgetPassword' /></Link>
                    </Form.Group> */}
                    <div className={`d-grid gap-2 ${classes.submit}`}>
                        <Button variant="main" type="button" onClick={handleSignIn}>
                            <Translate id='buttons.send' />
                        </Button>
                    </div>
                </Form>
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

export default ForgetPassword;
import Link from 'next/link';
import classes from './auth.module.scss';
import Head from 'next/head';
import { useState } from 'react';
// import { signIn } from "next-auth/react"
import { Button, Form } from 'react-bootstrap';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import AuthLayout from '@/components/layout/AuthLayout/AuthLayout';
import useHTTP from '@/hooks/use-http';
import Loader from '@/components/UI/Loader/Loader';

const ForgetPassword = (props: any) => {
    const { sliders } = props;
    const { translate } = useTranslate();
    const { isLoading, error, sendRequest } = useHTTP();
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [loginError, setLoginError] = useState('');
    const handleForgetPassword = async () => {
        if (email) {
            sendRequest(
                {
                    url: '/api/user/forgetPassword',
                    method: 'POST',
                    body: { email }
                },
                (data: any) => console.log(data),
                (err: any) => console.error(err)
            )
        }
    };
    return (
        <>
            <Head>
                <title>Tripty - Forget Password</title>
            </Head>
            <AuthLayout sliders={sliders}>
                <Form>
                    <h1><Translate id='auth.enterEmail' /></h1>
                    <input disabled={isLoading} className={classes.input} type="email" placeholder={translate('placeholder.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className={`d-grid gap-2 ${classes.submit}`}>
                        <Button variant="main" type="button" onClick={handleForgetPassword} disabled={isLoading}>
                            {isLoading ? <Loader /> : <Translate id='buttons.send' />}
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
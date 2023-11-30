import classes from './auth.module.scss';
import Head from 'next/head';
import { Slider } from '@/interfaces/slider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from "next-auth/react"
import { Button, Form } from 'react-bootstrap';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import AuthLayout from '@/components/layout/AuthLayout/AuthLayout';

interface Props {
    sliders: Slider[]
}

const Register = (props: Props) => {
    const { sliders } = props;
    const router = useRouter();
    const { translate } = useTranslate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { data: session } = useSession();
    const handleSignIn = async () => {
        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        });
    };

    useEffect(() => {
        if (session) {
            router.push('/home');
        }
    }, [session, router]);
    return (
        <>
            <Head>
                <title>Tripty - Register</title>
            </Head>
            <AuthLayout sliders={sliders}>
                <Form className={classes.registerForm}>
                    <h1><Translate id='auth.registerWithMail' /></h1>
                    <div>
                        <input className={classes.input} type="text" placeholder={translate('placeholder.name')} value={name} onChange={(e) => setName(e.target.value)} />
                        <input className={classes.input} type="phone" placeholder={translate('placeholder.mobile')} value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <input className={classes.input} type="email" placeholder={translate('placeholder.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className={classes.input} type="password" placeholder={translate('placeholder.password')} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input className={classes.input} type="password" placeholder={translate('placeholder.confirmPassword')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className={`d-grid gap-2 ${classes.submit}`}>
                        <Button variant="main" type="submit" onClick={handleSignIn}>
                            <Translate id='buttons.register' />
                        </Button>
                    </div>
                </Form>
                {/* <div className={classes.socialLogin}>
                            <p><Translate id='auth.loginBy' /></p>
                            <div className={classes.loginOptions}>
                                <button className={classes.loginOption} onClick={() => signIn('google')}><i className="fa-brands fa-google"></i></button>
                                <button className={classes.loginOption} onClick={() => signIn('facebook')}><i className="fa-brands fa-facebook-f"></i></button>
                                <button className={classes.loginOption} onClick={() => signIn('twitter')}><i className="fa-brands fa-x-twitter"></i></button>
                                <button className={classes.loginOption} onClick={() => signIn('apple')}><i className="fa-brands fa-apple"></i></button>
                            </div>
                        </div> */}
                {/* <Link href={'/auth/register'} className={classes.register}><Translate id='auth.registerWithMail' /></Link> */}
            </AuthLayout>

        </>
    )
}

export async function getStaticProps() {
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

export default Register;
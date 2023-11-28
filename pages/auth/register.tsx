import Link from 'next/link';
import classes from './auth.module.scss';
import Image from 'next/image';
import Head from 'next/head';
import Carousel from 'react-bootstrap/Carousel';
import { Slider } from '@/interfaces/slider';
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from "next-auth/react"
import { Button, Form } from 'react-bootstrap';
import logo from '@/public/assets/images/logo.svg';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';

interface Props {
    sliders: Slider[]
}

const Register = (props: Props) => {
    const { sliders } = props;
    const router = useRouter();
    const { translate } = useTranslate();
    const [index, setIndex] = useState(0);
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
    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        if (session) {
            router.push('/home');
        }
    }, [session, router]);
    return (
        <>
            <Head>
                <title>Tripty - Login</title>
            </Head>
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <div className={`${classes.carousel} login-slider`}>
                        <Carousel controls={false} activeIndex={index} onSelect={handleSelect}>
                            {
                                sliders?.map(slider => {
                                    return (
                                        <Carousel.Item key={slider.id}>
                                            <Image fill src={slider.image} alt="slider" />
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                    <div className={classes.formContainer}>
                        <Form className={classes.registerForm}>
                            <Link href={'/home'} className={classes.logo}>
                                <Image loading='lazy' alt='Tripty Logo' src={logo} />
                            </Link>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    try {
        const slidersReq = await fetch('http://18.133.139.168/api/v1/front/sliders');
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
import Link from 'next/link';
import classes from './auth.module.scss';
import Image from 'next/image';
import logo from '@/public/assets/images/logo.svg';
import Head from 'next/head';
import { Button, Form, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Slider } from '@/interfaces/slider';
import { SetStateAction, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Props {
    sliders: Slider[]
}
const Login = (props: Props) => {
    const { sliders } = props;
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data: session } = useSession();
    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    const handleSignIn = async () => {
        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        });
        console.log(result);
    };

    useEffect(() => {
        if (session?.user) {
            router.push('/')
        }
    }, [session])
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
                        <Link href={'/home'} className={classes.logo}>
                            <Image loading='lazy' alt='Tripty Logo' src={logo} />
                        </Link>
                        <Form>
                            <h1>Login</h1>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex justify-content-between">
                                {/* <Form.Check type="checkbox" label="Remember me" /> */}
                                <Link href={'/home'}>Forget Password</Link>
                            </Form.Group>
                            {/* <div className="row">
                                <div className="col-12"> */}
                            <div className={`d-grid gap-2 ${classes.submit}`}>
                                <Button variant="main" type="submit" onClick={handleSignIn}>
                                    login
                                </Button>
                            </div>
                            {/* </div>
                            </div> */}
                        </Form>
                        <div className={classes.socialLogin}>
                            <p>Or</p>
                            <div className={classes.loginOptions}>
                                <button className={classes.loginOption}><i className="fa-brands fa-google" onClick={() => signIn('google')}></i> Google</button>
                                <button className={classes.loginOption}><i className="fa-brands fa-facebook-f" onClick={() => signIn('facebook')}></i> Facebook</button>
                                <button className={classes.loginOption}><i className="fa-brands fa-x-twitter" onClick={() => signIn('twitter')}></i> Twitter</button>
                                <button className={classes.loginOption}><i className="fa-brands fa-apple" onClick={() => signIn('apple')}></i> Apple</button>
                            </div>
                            <Link href={'/auth/register'} className={classes.register}>New Registeration</Link>
                        </div>
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

export default Login;
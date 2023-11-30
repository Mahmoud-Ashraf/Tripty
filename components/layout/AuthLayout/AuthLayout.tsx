import Link from 'next/link';
import classes from '@/pages/auth/auth.module.scss';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import { Slider } from '@/interfaces/slider';
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import logo from '@/public/assets/images/logo.svg';

const AuthLayout = ({ sliders, children, className }: any) => {
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const { data: session } = useSession();

    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        if (session?.user) {
            if (Object.values(session.user).some(value => value === null)) {
                router.push('/auth/complete-data');
            }
        }
    }, [session?.user, router.pathname]);
    return (
        <>
            <div className={`${classes.container} ${className}`}>
                <div className={classes.innerContainer}>
                    <div className={`${classes.carousel} login-slider`}>
                        <Carousel controls={false} activeIndex={index} onSelect={handleSelect}>
                            {
                                sliders?.map((slider: Slider) => {
                                    return (
                                        <Carousel.Item key={slider.id}>
                                            <img src={slider.image} alt="slider" />
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
                        {children}
                    </div>
                </div>
            </div>
        </>
    )

}

export default AuthLayout;
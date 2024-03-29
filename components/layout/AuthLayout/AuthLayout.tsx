import Link from 'next/link';
import classes from '@/pages/auth/auth.module.scss';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import { Slider } from '@/interfaces/slider';
import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { useSession } from "next-auth/react"
import logo from '@/public/assets/images/logo.svg';
// import useHTTP from '@/hooks/use-http';

const AuthLayout = ({ sliders, children, className }: any) => {
    const router = useRouter();
    const [index, setIndex] = useState(0);
    // const { data: session }: any = useSession();
    const [newSliders, setNewSliders] = useState(sliders);
    // const { isLoading, error, sendRequest } = useHTTP();

    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    // const getSliders = () => {
    //     sendRequest(
    //         {
    //             url: '/api/sliders',
    //             method: 'GET'
    //         },
    //         (data: any) => {
    //             setNewSliders(data);
    //         },
    //         (err: any) => console.error(err)
    //     )
    // }

    // useEffect(() => {
    //     if (session?.user) {
    //         if (session.user.name === null || session.user.gender === null || session.user.city === null) {
    //             router.push('/auth/complete-data');
    //         } else {
    //             router.push('/home');
    //         }
    //     }
    // }, [session?.token]);
    return (
        <>
            <div className={`${classes.container} ${className}`}>
                <div className={classes.innerContainer}>
                    <div className={`${classes.carousel} login-slider`}>
                        {newSliders?.length > 0 && <Carousel controls={false} activeIndex={index} onSelect={handleSelect}>
                            {
                                newSliders?.map((slider: Slider) => {
                                    return (
                                        <Carousel.Item key={slider.id}>
                                            <img src={slider.image} alt="slider" />
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>}
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
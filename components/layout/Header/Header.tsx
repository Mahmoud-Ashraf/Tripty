import Link from 'next/link';
import classes from './header.module.scss';
import logo from '@/public/assets/images/logo.svg';
import userIcon from '@/public/assets/images/user_icon.svg';
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import useHTTP from '@/hooks/use-http';
import { useEffect, useState } from 'react';
import { Lang } from '@/interfaces/lang';
import { useRouter } from 'next/router';
import Translate from '@/components/helpers/Translate/Translate';
import { langActions } from '@/store/Lang/Lang';
import useTranslate from '@/hooks/use-translate';
import { signOut, useSession } from 'next-auth/react';
import { authActions } from '@/store/Auth/Auth';
import Loader from '@/components/UI/Loader/Loader';
// import { Dropdown } from 'react-bootstrap';
import Search from '@/components/UI/Search/Search';
import { subscriptionActions } from '@/store/Subscription/Subscription';
import Dropdown from '@/components/UI/Dropdown/Dropdown';


const Header = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const { data: session }: any = useSession();
    const dispatch = useDispatch();
    const [langs, setLangs] = useState<Lang[]>([]);
    const router = useRouter();
    const [selectedLang, setSlectedLang] = useState(router.locale);
    const [showUserDialog, setShowUserDialog] = useState(false);
    const [subscription, setSubscription] = useState();
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const openModal = async () => {
        if (session?.token) {
            const subscription: any = await getSubscriptionStatus();
            if (subscription?.status === 'valid') {
                dispatch(tripActions.openShowTripModal());
            } else {
                // dispatch(subscriptionActions.changeSubscribtionCheck('trip'));
                dispatch(subscriptionActions.openStartSubscriptionModal());
            }
        } else {
            dispatch(authActions.openShowAuthModal());
        }
    }

    const getSubscriptionStatus = async () => {
        let subscription = null;
        await sendRequest(
            {
                url: '/api/subscription/check',
                method: 'GET'
            },
            (data: any) => subscription = data.subscription,
            (err: any) => console.error(err)
        )
        return subscription;
    }

    const getLanguages = () => {
        sendRequest(
            {
                url: '/api/langs',
                method: 'GET'
            },
            (data: any) => setLangs(data),
            (err: any) => console.log(err)
        )
    }

    const changeLanguage = async (lang: string) => {
        console.log(lang);
        try {
            const replace = await router.replace(router.asPath, router.asPath, { locale: lang });
            console.log(replace);
            dispatch(langActions.translation({ lang: lang }));
            if (replace) {
                router.reload();
            }
        } catch (err) {
            console.log(err)
        }
        // .then(
        //     data => {
        //     }
        // )
    };

    useEffect(() => {
        setSlectedLang(router.locale);
    }, [router.locale])

    useEffect(() => {
        getLanguages();
    }, []);

    const toggleUserDialog = () => {
        setShowUserDialog(prev => !prev);
    }
    const handleLogout = async () => {
        await signOut().then(() => {
            router.push('/auth/login');
        });
    }

    const handleGoToProfile = () => {
        toggleUserDialog();
        router.push('/account/profile');
    }
    return (
        <header className={classes.container}>
            {isLoading && <Loader full />}

            <div className={classes.start}>
                <Link href={'/home'} className={classes.logo}>
                    <Image loading='lazy' alt='Tripty Logo' src={logo} />
                </Link>
            </div>
            <div className={classes.nav}>
                <Link href={'/home'}><Translate id={'header.home'} /></Link>
                <Link href={'/about'}><Translate id={'header.about'} /></Link>
                <Link href={'/places'}><Translate id={'header.places'} /></Link>
                <Link href={'/tourism-packages'}><Translate id={'header.tourismPackages'} /></Link>
                <Link href={''} onClick={openModal}><Translate id='buttons.startTrip' /></Link>
                <Dropdown align={'start'} trigger={<i className="fa-solid fa-bars fa-xl text-main"></i>}>
                    {/* <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <i className="fa-solid fa-bars fa-xl text-main"></i>
                    </Dropdown.Toggle> */}
                    {/* <Dropdown.Menu> */}
                    <Link href="/home">
                        {/* <Link href={'/home'}> */}
                        <Translate id={'header.home'} />
                        {/* </Link> */}
                    </Link>
                    <Link href="/about">
                        {/* <Link href={'/about'}> */}
                        <Translate id={'header.about'} />
                        {/* </Link> */}
                    </Link>
                    <Link href="/places">
                        {/* <Link href={'/places'}> */}
                        <Translate id={'header.places'} />
                        {/* </Link> */}
                    </Link>
                    <Link href="/tourism-packages">
                        {/* <Link href={'/tourism-packages'}> */}
                        <Translate id={'header.tourismPackages'} />
                        {/* </Link> */}
                    </Link>
                    <Link href="" onClick={openModal}>
                        {/* <Link href={''} onClick={openModal}> */}
                        <Translate id='buttons.startTrip' />
                        {/* </Link> */}
                    </Link>
                    {/* </Dropdown.Menu> */}
                </Dropdown>
            </div>
            <div className={classes.user}>
                <Search />
                <select className={classes.lang} value={selectedLang} onChange={(e) => changeLanguage(e.target.value)}>
                    {
                        langs?.map(lang => {
                            return (
                                <option value={lang.code} key={lang.code}>{lang.code}</option>
                            )
                        })
                    }
                </select>
                {
                    session &&
                    <Dropdown direction={'ste'} trigger={<Image loading='lazy' alt='user' src={userIcon} />} >
                        <Image loading='lazy' alt='user' src={userIcon} />
                        <p><Translate id='header.dialog.hi' />, {session?.user?.name}</p>
                        <button onClick={handleGoToProfile} className="btn btn-outline-main w-100"><Translate id='header.dialog.manage' /></button>
                        <button className="btn btn-outline-main w-100" onClick={handleLogout}><Translate id='header.dialog.signout' /> <i className="fa-solid fa-right-from-bracket"></i></button>
                    </Dropdown>
                    // <div className={classes.userDialog}>
                    //     <Image onClick={toggleUserDialog} loading='lazy' alt='user' src={userIcon} />
                    //     {
                    //         showUserDialog &&
                    //         <div className={`ar-right ${classes.userDialogContent}`}>
                    //             <Image loading='lazy' alt='user' src={userIcon} />
                    //             <p><Translate id='header.dialog.hi' />, {session?.user?.name}</p>
                    //             <button onClick={handleGoToProfile} className="btn btn-outline-main"><Translate id='header.dialog.manage' /></button>
                    //             <button className="btn btn-outline-main" onClick={handleLogout}><Translate id='header.dialog.signout' /> <i className="fa-solid fa-right-from-bracket"></i></button>
                    //         </div>
                    //     }
                    // </div>
                }
            </div>
        </header>
    )
}

export default Header;
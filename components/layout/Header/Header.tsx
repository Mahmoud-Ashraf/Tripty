import Link from 'next/link';
import classes from './header.module.scss';
import logo from '@/public/assets/images/logo.svg';
import userIcon from '@/public/assets/images/user_icon.svg';
import Image from "next/image";

const Header = () => {
    return <header className={classes.container}>
        <div className={classes.logo}>
            <Image loading='lazy' alt='Tripty Logo' src={logo} />
        </div>
        <div className={classes.nav}>
            <Link href={'/home'}>Home</Link>
            <Link href={'/about'}>About</Link>
            <Link href={'/places'}>places</Link>
        </div>
        <div className={classes.user}>
            <button className={classes.user_startTrip}>Start you trip</button>
            <Image loading='lazy' alt='user' src={userIcon} />
        </div>
    </header>
}

export default Header;
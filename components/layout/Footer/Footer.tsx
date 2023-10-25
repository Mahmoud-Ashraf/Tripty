import classes from './footer.module.scss';
import logo from '@/public/assets/images/logo_white.svg';
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return <footer className={classes.container}>
        <div className={classes.logo}>
            <Image loading='lazy' alt='Tripty Logo' src={logo} />
            <p className='mb-0'>Copyright © 2023 Tripty. All rights reserved</p>
        </div>
        <div className={classes.nav}>
            <Link href={'/home'}>Home</Link>
            <Link href={'/about'}>About</Link>
            <Link href={'/places'}>places</Link>
        </div>
        <div className={classes.social}>
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-square-instagram"></i>
        </div>
    </footer>
}

export default Footer;
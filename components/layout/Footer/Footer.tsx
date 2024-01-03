import Translate from '@/components/helpers/Translate/Translate';
import classes from './footer.module.scss';
import logo from '@/public/assets/images/logo_white.svg';
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return <footer className={classes.container}>
        <div className={classes.data}>
            <div className={classes.logo}>
                <Image loading='lazy' alt='Tripty Logo' src={logo} />
            </div>
            <div className={classes.nav}>
                <Link href={'/home'}><Translate id={'header.home'} /></Link>
                <div className='d-flex flex-column'>
                    <Link href={'/about'}><Translate id={'header.about'} /></Link>
                    <Link href={'/termsandconditions'}><Translate id={'footer.termsAndConditions'} /></Link>
                    <Link href={'/privacypolicy'}><Translate id={'footer.privacyPolicy'} /></Link>
                </div>
                <Link href={'/places'}><Translate id={'header.places'} /></Link>
                <Link href={'/tourism-packages'}><Translate id={'header.tourismPackages'} /></Link>
            </div>
            <div className={classes.social}>
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-square-instagram"></i>
            </div>
        </div>
        <div className={classes.copyRights}>
            <p className='mb-0'><Translate id={'footer.copyRights'} /></p>
        </div>
    </footer>
}

export default Footer;
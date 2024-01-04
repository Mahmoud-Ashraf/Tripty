import Image from 'next/image';
import classes from './home-trip.module.scss';
import img from '@/public/assets/images/travel-bus.jpg';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import logo from '@/public/assets/images/logo_white.svg';
import { useSession } from 'next-auth/react';
import { authActions } from '@/store/Auth/Auth';
import Translate from '../helpers/Translate/Translate';

const HomeTrip = () => {
    const dispatch = useDispatch();
    const { data: session }: any = useSession();
    const openModal = () => {
        if (session?.token) {
            dispatch(tripActions.openShowTripModal());
        } else {
            dispatch(authActions.openShowAuthModal());
        }
    }
    return (
        <div className={classes.container}>
            <div className="row">
                <div className="col-md-6">
                    <div className={classes.details}>
                        <div className={classes.title}>
                            <h3><Translate id="trip.start"/></h3>
                            <h3><Translate id="trip.experience"/></h3>
                        </div>
                        <div className={classes.btn}>
                            <button onClick={openModal} className='btn btn-main'><Translate id="trip.startNow"/></button>
                        </div>
                        <div className={classes.desc}>
                            <p><Translate id="trip.text"/></p>
                            <p><Translate id="trip.text1"/></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={classes.photo}>
                        <div className={classes.logo}>
                            <Image loading='lazy' alt='Tripty Logo' src={logo} />
                        </div>
                        <Image src={img} alt='photo' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTrip;
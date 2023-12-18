import Image from 'next/image';
import classes from './home-trip.module.scss';
import img from '@/public/assets/images/travel-bus.jpg';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import logo from '@/public/assets/images/logo_white.svg';

const HomeTrip = () => {
    const dispatch = useDispatch();
    return (
        <div className={classes.container}>
            <div className="row">
                <div className="col-md-6">
                    <div className={classes.details}>
                        <div className={classes.title}>
                            <h3>Start New</h3>
                            <h3>Experience</h3>
                        </div>
                        <div className={classes.btn}>
                            <button onClick={() => dispatch(tripActions.openShowTripModal())} className='btn btn-main'>START YOUR TRIP NOW</button>
                        </div>
                        <div className={classes.desc}>
                            <p>Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture.</p>
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
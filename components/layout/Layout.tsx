import { PropsWithChildren, useEffect, useState } from 'react';
import classes from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CustomModal from '../UI/CustomModal/CustomModal';
import TripModal from '../TripModal/TripModal';
import { tripActions } from '@/store/Trip/Trip';
import LoginModal from '../LoginModal/LoginModal';
import { authActions } from '@/store/Auth/Auth';
import { RootState } from '@/store';
import { subscriptionActions } from '@/store/Subscription/Subscription';
import StartSubscriptionModal from '../StartSubscriptionModal/StartSubscriptionModal';

const Layout = (props: PropsWithChildren) => {
    const dispatch = useDispatch();
    const showTripModal = useSelector((state: any) => {
        return state.trip.showTripModal;
    });
    const showAuthModal = useSelector((state: any) => {
        return state.auth.showAuthModal;
    });
    const showSubscriptionModal = useSelector((state: RootState) => {
        return state.subscription.showStartSubscriptionModal;
    })

    useEffect(() => {
        // Check if the Geolocation API is supported by the browser
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Retrieve the latitude and longitude from the position object
                    console.log('coords: ', position.coords);
                    const { latitude, longitude } = position.coords;
                    dispatch(authActions.setCoords({ latitude, longitude }));
                    // setLocation({ latitude, longitude });
                },
                (error) => {
                    // Handle any errors that occur while retrieving the location
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div className={classes.layout}>
            {
                showTripModal &&
                <CustomModal onClose={() => dispatch(tripActions.closeShowTripModal())} onOutsideClick={() => { }}>
                    <TripModal />
                </CustomModal>
            }
            {
                showAuthModal &&
                <CustomModal size='sm' onOutsideClick={() => { dispatch(authActions.closeShowAuthModal()) }}>
                    <LoginModal />
                </CustomModal>
            }
            {
                showSubscriptionModal &&
                <CustomModal size='sm'
                    onOutsideClick={() => { dispatch(subscriptionActions.closeStartSubscriptionModal()) }}
                    onClose={() => { dispatch(subscriptionActions.closeStartSubscriptionModal()) }}>
                    <StartSubscriptionModal />
                </CustomModal>
            }
            <div className="container-lg container-fluid">
                <Header />
                {props.children}
                <Footer />
            </div>
        </div>
    )
}

export default Layout;
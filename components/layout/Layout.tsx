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

const Layout = (props: PropsWithChildren) => {
    const dispatch = useDispatch();
    const showTripModal = useSelector((state: any) => {
        return state.trip.showTripModal;
    });
    const showAuthModal = useSelector((state: any) => {
        return state.auth.showAuthModal;
    });

    return (
        <div className={classes.layout}>
            {showTripModal && <CustomModal onOutsideClick={() => { }}>
                <TripModal />
            </CustomModal>}
            {showAuthModal && <CustomModal onOutsideClick={() => { dispatch(authActions.closeShowAuthModal()) }}>
                <LoginModal />
            </CustomModal>}
            <div className="container">
                <Header />
                {props.children}
                <Footer />
            </div>
        </div>
    )
}

export default Layout;
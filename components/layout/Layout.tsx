import { PropsWithChildren, useEffect, useState } from 'react';
import classes from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { langActions } from '@/store/Lang/Lang';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CustomModal from '../UI/CustomModal/CustomModal';
import TripModal from '../TripModal/TripModal';

const Layout = (props: PropsWithChildren) => {
    const showTripModal = useSelector((state: any) => {
        return state.trip.showTripModal;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        const localLang = localStorage.getItem('lang');
        if (localLang) {
            dispatch(langActions.translation({ lang: localLang }));
        }
    }, []);

    return (
        <div className={classes.layout}>
            {showTripModal && <CustomModal>
                <TripModal />
            </CustomModal>}
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout;
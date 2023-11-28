import { PropsWithChildren, useEffect, useState } from 'react';
import classes from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CustomModal from '../UI/CustomModal/CustomModal';
import TripModal from '../TripModal/TripModal';
import { tripActions } from '@/store/Trip/Trip';

const Layout = (props: PropsWithChildren) => {
    const dispatch = useDispatch();
    const showTripModal = useSelector((state: any) => {
        return state.trip.showTripModal;
    });
    

    return (
        <div className={classes.layout}>
            {showTripModal && <CustomModal onOutsideClick={() => {dispatch(tripActions.closeShowTripModal());}}>
                <TripModal />
            </CustomModal>}
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout;
import { PropsWithChildren, useEffect, useState } from 'react';
import classes from './layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { langActions } from '@/store/Lang/Lang';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = (props: PropsWithChildren) => {
    let rootEle: HTMLElement | null;
    const globalLang = useSelector((state: any) => {
        return state.lang.globalLang;
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
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout;
import useHTTP from '@/hooks/use-http';
import classes from './offer-modal.module.scss';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import Translate from '../helpers/Translate/Translate';
import barcode from '@/public/assets/images/barcode.png';
import Image from 'next/image';
const OfferModal = ({ offer }: { offer: any }) => {

    useEffect(() => {
        console.log('place offer', offer);
    }, [offer])
    return (
        <div className={classes.container}>
            <div className="row justify-content-center">
                <div className="col-9 col-sm-6">
                    <div className={classes.content}>
                        <div className={classes.offer}>
                            <span>{offer.amount}{offer.type === "percentage" && '%'}</span> <Translate id='place.getDiscount' />
                        </div>
                        <div className={classes.barcode}>
                            <Image src={barcode} alt='offer barcodes' />
                        </div>
                        <div className={classes.conditions} dangerouslySetInnerHTML={{ __html: offer?.conditions }}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferModal;
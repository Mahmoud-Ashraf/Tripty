import classes from './offer-modal.module.scss';
import { useEffect, useState } from 'react';
import Translate from '../helpers/Translate/Translate';
import { QRCodeSVG } from 'qrcode.react';
import useHTTP from '@/hooks/use-http';

const OfferModal = ({ offer }: { offer: any }) => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [canGetOffer, setCanGetOffer] = useState(false);
    useEffect(() => {
        console.log('place offer', offer);
    }, [offer]);

    const getSubscriptionStatus = async () => {
        let subscription: any = null;
        await sendRequest(
            {
                url: '/api/subscription/check',
                method: 'GET'
            },
            (data: any) => subscription = data.subscription,
            (err: any) => console.error(err)
        )
        if (subscription?.status === 'valid' && subscription?.can_get_offer) {
            setCanGetOffer(true);
        }
    }

    useEffect(() => {
        getSubscriptionStatus();
    }, [])
    return (
        <>
            {
                canGetOffer ?
                    <div className={classes.container}>
                        <div className="row justify-content-center">
                            <div className="col-9 col-sm-6">
                                <div className={classes.content}>
                                    <div className={classes.offer}>
                                        <span>{offer.amount}{offer.type === "percentage" && '%'}</span> <Translate id='place.getDiscount' />
                                    </div>
                                    <div className={classes.barcode}>
                                        <QRCodeSVG value={offer.code} />,
                                        {/* <Image src={barcode} alt='offer barcodes' /> */}
                                    </div>
                                    <div className={classes.conditions} dangerouslySetInnerHTML={{ __html: offer?.conditions }}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={classes.container}>
                        <p className='fs-5 text-center'><Translate id="subscribe.finished" /></p>
                    </div>
            }
        </>
    )
}

export default OfferModal;
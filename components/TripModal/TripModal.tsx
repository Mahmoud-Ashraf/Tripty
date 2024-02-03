import TripModalFooter from './TripModalFooter';
import TripModalHeader from './TripModalHeader';
import classes from './trip-modal.module.scss';
import TripSteps from '../TripSteps/TripSteps';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import useHTTP from '@/hooks/use-http';
import Translate from '../helpers/Translate/Translate';

const TripModal = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [canCreateTrip, setCanCreateTrip] = useState(false);
    const step = useSelector((state: RootState) => state.trip.currentStep);

    const getSubscriptionStatus = async () => {
        let subscription: any = null;
        await sendRequest(
            {
                url: '/api/subscription/check',
                method: 'GET'
            },
            (data: any) => { subscription = data.subscription; console.log(data) },
            (err: any) => console.error(err)
        )
        if (subscription?.status === 'valid' && subscription?.can_create_trip) {
            setCanCreateTrip(true);
        }
    }

    useEffect(() => {
        getSubscriptionStatus();
    }, [])
    return (
        <>
            {canCreateTrip ?
                <div className={classes.container}>
                    <TripModalHeader />
                    <div className={classes.steps}>
                        <TripSteps />
                    </div>
                    {step !== 5 && <TripModalFooter />}
                </div>
                :
                <div className={classes.container}>
                    <p className='fs-5 text-center'><Translate id="subscribe.finished" /></p>
                </div>
            }
        </>
    )
}

export default TripModal;
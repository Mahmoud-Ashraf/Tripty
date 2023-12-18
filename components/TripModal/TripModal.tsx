import TripModalFooter from './TripModalFooter';
import TripModalHeader from './TripModalHeader';
import classes from './trip-modal.module.scss';
import TripSteps from '../TripSteps/TripSteps';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const TripModal = () => {
    const step = useSelector((state: RootState) => state.trip.currentStep);

    return (
        <div className={classes.container}>
            <TripModalHeader />
            <div className={classes.steps}>
                <TripSteps />
            </div>
            {step !== 5 && <TripModalFooter />}
        </div>
    )
}

export default TripModal;
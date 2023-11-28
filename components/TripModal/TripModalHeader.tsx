import { ProgressBar } from 'react-bootstrap';
import classes from './trip-modal.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index'; // Adjust the path based on your project structure
import Translate from '../helpers/Translate/Translate';

const TripModalHeader = () => {

    const step = useSelector((state: RootState) => state.trip.currentStep);
    return (
        <div className={classes.header}>
            <h4><Translate id='tripModal.create' /></h4>
            <h3><Translate id='tripModal.trip' /></h3>
            <ProgressBar style={{ backgroundColor: '#c4c4c4', height: '.625rem' }} variant="main" now={(step / 4) * 100} />
        </div>
    )
}

export default TripModalHeader;
import { ProgressBar } from 'react-bootstrap';
import classes from './trip-modal.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index'; // Adjust the path based on your project structure

const TripModalHeader = () => {

    const step = useSelector((state: RootState) => state.trip.currentStep);
    return (
        <div className={classes.header}>
            <h4>Create Your</h4>
            <h3>TRIP</h3>
            <ProgressBar style={{ backgroundColor: '#c4c4c4', height: '.625rem' }} variant="main" now={(step / 4) * 100} />
        </div>
    )
}

export default TripModalHeader;
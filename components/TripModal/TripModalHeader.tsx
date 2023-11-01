import { ProgressBar } from 'react-bootstrap';
import classes from './trip-modal.module.scss';
const TripModalHeader = () => {
    return (
        <div className={classes.header}>
            <h4>Create Your</h4>
            <h3>TRIP</h3>
            <ProgressBar style={{ backgroundColor: '#c4c4c4', height: '.625rem' }} variant="main" now={60} />
        </div>
    )
}

export default TripModalHeader;
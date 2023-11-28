import TripModalFooter from './TripModalFooter';
import TripModalHeader from './TripModalHeader';
import classes from './trip-modal.module.scss';
import TripSteps from '../TripSteps/TripSteps';

const TripModal = () => {

    return (
        <div className={classes.container}>
            <TripModalHeader />
            <div className={classes.steps}>
                <TripSteps />
            </div>
            <TripModalFooter />
        </div>
    )
}

export default TripModal;
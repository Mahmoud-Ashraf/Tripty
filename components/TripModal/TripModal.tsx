import LocationStep from '../TripSteps/LocationStep';
import TripModalFooter from './TripModalFooter';
import TripModalHeader from './TripModalHeader';
import classes from './trip-modal.module.scss';
const TripModal = () => {
    return (
        <div className={classes.container}>
            <TripModalHeader />
            <div className={classes.steps}>
                <LocationStep />
            </div>
            <TripModalFooter />
        </div>
    )
}

export default TripModal;
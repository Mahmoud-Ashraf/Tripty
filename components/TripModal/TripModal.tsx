import TripModalFooter from './TripModalFooter';
import TripModalHeader from './TripModalHeader';
import classes from './trip-modal.module.scss';
const TripModal = () => {
    return (
        <div className={classes.container}>
            <TripModalHeader />
            <TripModalFooter />
        </div>
    )
}

export default TripModal;
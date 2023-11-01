import TripModalHeader from './TripModalHeader';
import classes from './trip-modal.module.scss';
const TripModal = () => {
    return(
        <div className={classes.container}>
            <TripModalHeader />
        </div>
    )
}

export default TripModal;
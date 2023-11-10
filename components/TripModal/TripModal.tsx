import BudgetStep from '../TripSteps/BudgetStep';
import DetailsStep from '../TripSteps/DetailsStep';
import LocationStep from '../TripSteps/LocationStep';
import TagsStep from '../TripSteps/TagsStep';
import TripModalFooter from './TripModalFooter';
import TripModalHeader from './TripModalHeader';
import classes from './trip-modal.module.scss';
const TripModal = () => {
    return (
        <div className={classes.container}>
            <TripModalHeader />
            <div className={classes.steps}>
                {/* <LocationStep /> */}
                {/* <BudgetStep /> */}
                {/* <TagsStep /> */}
                <DetailsStep />
            </div>
            <TripModalFooter />
        </div>
    )
}

export default TripModal;
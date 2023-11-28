import Translate from '../helpers/Translate/Translate';
import classes from './trip-modal.module.scss';
const TripModalHeading = ({ text }: { text: string }) => {
    return (
        <h3 className={classes.heading}><Translate id={`tripModal.${text}`} /></h3>
    )
}

export default TripModalHeading;
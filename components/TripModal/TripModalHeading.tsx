import classes from './trip-modal.module.scss';
const TripModalHeading = ({ text }: { text: string }) => {
    return (
        <h3 className={classes.heading}>{text}</h3>
    )
}

export default TripModalHeading;
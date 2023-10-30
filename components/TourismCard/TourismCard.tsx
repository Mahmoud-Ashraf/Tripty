import classes from './tourism-card.module.scss';
interface Props {
    img: string,
    children?: any,
    big?: boolean
}
const TourismCard = (props: Props) => {
    const { img, children, big } = props;
    const cardClass = big ? `${classes.container} ${classes.big}` : classes.container;

    return (
        <div className={cardClass} style={{ backgroundImage: `url(${img})` }}>
            {children}
        </div>
    )
}

export default TourismCard;
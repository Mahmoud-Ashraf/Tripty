import classes from './tourism-card.module.scss';
interface Props {
    img: string,
    children?: any,
    big?: boolean,
    onClick?: () => void
}
const TourismCard = ({ img, children, big, onClick }: Props) => {
    const cardClass = big ? `${classes.container} ${classes.big}` : classes.container;

    return (
        <div className={cardClass} onClick={onClick} style={{ backgroundImage: `url(${img})` }}>
            {children}
        </div>
    )
}

export default TourismCard;
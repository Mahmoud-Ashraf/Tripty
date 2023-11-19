import Image from 'next/image';
import classes from './replace-card.module.scss';

const ReplaceCard = ({ place, onSelectPlace }: any) => {
    return (
        <div className={classes.container}>
            <div className={classes.cover}>
                <Image fill src={place?.featured_image} alt={`${place.name} cover`} />
                <div className={classes.details}>
                    <div className={classes.desc}>
                        <h4>{place.name}</h4>
                        <span className={classes.rate}><i className="fa-solid fa-star"></i> {place.rating.toFixed(1)}</span>
                        <span className={classes.distance}><i className="fa-solid fa-location-dot"></i> {place.distance} KM</span>
                    </div>
                    {place.category.parent &&
                        <div className={classes.cuisine}>
                            <i className="fa-solid fa-utensils"></i> {place.category.name} : ''
                        </div>
                    }
                    <div className={classes.dots}>
                        <i className="fa-solid fa-ellipsis-vertical fa-2xl"></i>
                    </div>
                </div>
            </div>
            <div className={classes.actions}>
                <a href={`/place/${place.id}`} target='_blank'>More Details</a>
                <button onClick={onSelectPlace}><i className="fa-solid fa-plus"></i></button>
            </div>
        </div>
    )
}

export default ReplaceCard;
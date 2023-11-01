import Image from 'next/image';
import classes from './card.module.scss';
import cover from '@/public/assets/images/card_cover.png';
import Link from 'next/link';
import { Place } from '@/interfaces/place';
const Card = ({ place }: { place: Place }) => {
    return (
        place && <Link href={`/place/${place.id}`} className={classes.container}>
            <Image className={classes.cover} src={cover} alt='card-image' />
            <div className={classes.data}>
                <div className={classes.caption}>
                    <h3 className={classes.name}>{place?.name}</h3>
                    <p className={classes.desc}>{place?.about}</p>
                </div>
                <div className={classes.specs}>
                    <div className={classes.details}>
                        <span className={classes.rate}><i className="fa-solid fa-star"></i> {place.rating.toFixed(1)}</span>
                        {place.category.parent ? <span className={classes.cuisine}><i className="fa-solid fa-utensils"></i> {place.category.name}</span> : ''}
                        <span className={classes.price}>{place.min_price} SAR - {place.max_price} SAR</span>
                    </div>
                    <div className={classes.recomended}>
                        <span className={classes.distance}>{Number(place.distance).toFixed(1)} Km</span>
                        {place.is_recommended && <span className={classes.recomendedText}>Recommended</span>}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;
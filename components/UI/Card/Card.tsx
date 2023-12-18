import classes from './card.module.scss';
import Link from 'next/link';
import { Place } from '@/interfaces/place';
import Image from 'next/image';
import Translate from '@/components/helpers/Translate/Translate';
const Card = ({ place }: { place: Place | undefined }) => {

    const cutAboutWords = (text: string, wordsCount: number) => {
        if (!text) {
            return
        }
        const splitedText = text.split(' ', wordsCount);
        let newText;
        if (splitedText.length < wordsCount) {
            newText = text;
        } else {
            newText = splitedText.join(' ') + ' ...';
        }
        return newText;
    }

    return (
        place && <Link href={`/place/${place.id}`} className={classes.container}>
            <div className={classes.cover}>
                <img src={place?.featured_image} alt='card-image' />
                {place.offer && <div className={classes.offer}>
                    <span>{place.offer.amount}%</span> <Translate id='place.getDiscount' />
                </div>}
            </div>
            <div className={classes.data}>
                <div className={classes.caption}>
                    <h3 className={classes.name}>{place?.name}</h3>
                    <p className={classes.desc}>{cutAboutWords(place?.about, 12)}</p>
                </div>
                <div className={classes.specs}>
                    <div className={classes.details}>
                        <span className={classes.rate}><i className="fa-solid fa-star"></i> {place.rating.toFixed(1)}</span>
                        {place.category.parent ? <span className={classes.cuisine}><i className="fa-solid fa-utensils"></i> {place.category.name}</span> : ''}
                        <span className={classes.distance}>{Number(place.distance).toFixed(1)} <Translate id='common.km' /></span>
                        {place.is_recommended && <span className={classes.recomendedText}><Translate id='common.recomended' /></span>}
                    </div>
                    <div className={classes.recomended}>
                        <span className={classes.price}>{Number(place.min_price).toFixed(0)} <Translate id='currencies.sar' /> - {Number(place.max_price).toFixed(0)} <Translate id='currencies.sar' /></span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;
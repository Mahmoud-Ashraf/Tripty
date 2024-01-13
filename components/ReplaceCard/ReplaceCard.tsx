import Image from 'next/image';
import classes from './replace-card.module.scss';
import Translate from '../helpers/Translate/Translate';

const ReplaceCard = ({ place, onSelectPlace }: any) => {
    return (
        <div className={classes.container}>
            <div className={classes.cover}>
                <img src={place?.featured_image} alt={`${place.name} cover`} />
                <div className={classes.details}>
                    <div className={classes.desc}>
                        <h4>{place.name}</h4>
                        <span className={classes.rate}><i className="fa-solid fa-star"></i> {place.rating.toFixed(1)}</span>
                        <span className={classes.distance}><i className="fa-solid fa-location-dot"></i> {place.distance} <Translate id='common.km' /></span>
                    </div>
                    {
                        place?.category?.name || place?.sub_cats?.length > 0 ?
                            <span className={classes.cuisine}> {(place?.category?.icon || place?.sub_cats[0]?.icon) && <img src={place?.sub_cats && place?.sub_cats[0]?.icon ? place?.sub_cats[0]?.icon : place?.category?.icon} />} {place?.sub_cats && place?.sub_cats[0]?.name ? place?.sub_cats[0]?.name : place?.category?.name}</span>
                            :
                            ''
                    }
                    <div className={classes.dots}>
                        <i className="fa-solid fa-ellipsis-vertical fa-2xl"></i>
                    </div>
                </div>
            </div>
            <div className={classes.actions}>
                <a href={`/place/${place.id}`} target='_blank'><Translate id='buttons.moreDetails' /></a>
                <button onClick={onSelectPlace}><i className="fa-solid fa-plus"></i></button>
            </div>
        </div>
    )
}

export default ReplaceCard;
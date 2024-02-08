import classes from './card.module.scss';
import Link from 'next/link';
import { Place } from '@/interfaces/place';
import Translate from '@/components/helpers/Translate/Translate';
const Card = ({ place, isTourism = false }: { place: Place | undefined, isTourism?: boolean }) => {

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
        place && <Link href={isTourism ? `tourism-package/${place.id}` : `/place/${place.id}`} className={classes.container}>
            <div className={classes.cover}>
                <img src={place?.featured_image} alt='card-image' />
                {
                    !isTourism &&
                    <div className={classes.placeStatus}>
                        {
                            place?.is_open ?
                                <span style={{ color: '#1fa200' }}><Translate id='common.open' /></span>
                                :
                                <span className='text-error' style={{ color: '#1fa200' }}><Translate id='common.openAt' /> {place?.open_at?.slice(0, 5)}</span>
                        }
                    </div>
                }
                {place.offer && <div className={classes.offer}>
                    <span>{place.offer.amount}%</span> <Translate id='place.getDiscount' />
                </div>}
            </div>
            <div className={classes.data}>
                <div className={classes.caption}>
                    <h3 className={classes.name}>{isTourism ? place.title : place?.name}</h3>
                    <p className={classes.desc}>{cutAboutWords(place?.about, 12)}</p>
                </div>
                <div className={classes.specs}>
                    <div className={classes.details}>
                        <span className={classes.rate}><i className="fa-solid fa-star"></i> {Number(place.rating).toFixed(1)}</span>
                        {
                            place?.category?.name || place?.sub_cats?.length > 0 ?
                                <span className={classes.cuisine}> {(place?.category?.icon || place?.sub_cats[0]?.icon) && <img src={place?.sub_cats && place?.sub_cats[0]?.icon ? place?.sub_cats[0]?.icon : place?.category?.icon} />} {place?.sub_cats && place?.sub_cats[0]?.name ? place?.sub_cats[0]?.name : place?.category?.name}</span>
                                :
                                ''
                        }
                        {place.distance && !isTourism && window?.innerWidth > 768 && <span className={classes.distance}>{place.distance}</span>}
                    </div>
                    <div className={classes.recomended}>
                        {
                            isTourism ?
                                <span className={classes.price}>{Number(place.price).toFixed(0)} <Translate id='currencies.sar' /></span>
                                :
                                <span className={classes.price}>{Number(place.min_price).toFixed(0)} <Translate id='currencies.sar' /> - {Number(place.max_price).toFixed(0)} <Translate id='currencies.sar' /></span>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;
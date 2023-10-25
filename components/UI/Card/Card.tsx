import Image from 'next/image';
import classes from './card.module.scss';
import cover from '@/public/assets/images/card_cover.png';
const Card = () => {
    return (
        <div className={classes.container}>
            <Image className={classes.cover} src={cover} alt='card-image' />
            <div className={classes.data}>
                <div className={classes.caption}>
                    <h3 className={classes.name}>Name here</h3>
                    <p className={classes.desc}>Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture.</p>
                </div>
                <div className={classes.specs}>
                    <div className={classes.details}>
                        <span className={classes.rate}><i className="fa-solid fa-star"></i> 5.0</span>
                        <span className={classes.cuisine}><i className="fa-solid fa-utensils"></i> Italian</span>
                        <span className={classes.price}>120 SAR - 150 SAR</span>
                    </div>
                    <div className={classes.recomended}>
                        <span className={classes.distance}>1000 Kms</span>
                        <span className={classes.recomendedText}>Recommended</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
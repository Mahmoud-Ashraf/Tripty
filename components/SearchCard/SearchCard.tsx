import Image from 'next/image';
import classes from './search-card.module.scss';

const SearchCard = ({ place }: any) => {
    return (
        <div className={classes.container}>
            <div className={classes.cover}>
                <Image fill src={place?.featured_image} alt={`${place.name} Cover`} />
            </div>
            <p>{place.about}</p>
        </div>
    )
}

export default SearchCard;
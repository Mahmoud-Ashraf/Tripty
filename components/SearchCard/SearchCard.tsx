import Image from 'next/image';
import classes from './search-card.module.scss';

const SearchCard = () => {
    return (
        <div className={classes.container}>
            <div className={classes.cover}>
                <Image fill src={''} alt='Place Cover' />
            </div>
        </div>
    )
}

export default SearchCard;
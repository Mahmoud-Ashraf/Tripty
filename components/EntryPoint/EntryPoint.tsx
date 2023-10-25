import classes from './entry-point.module.scss';
import icon from '@/public/assets/images/discounts.svg';
import Image from 'next/image';

const EntryPoint = () => {
    return (
        <div className={classes.container}>
            <div className={classes.iconContainer}>
                <Image alt="entry point" src={icon} />
            </div>
            <h4 className={classes.title}>Trend now</h4>
        </div>
    )
}

export default EntryPoint;
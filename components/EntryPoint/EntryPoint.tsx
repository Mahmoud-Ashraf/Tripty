import Link from 'next/link';
import classes from './entry-point.module.scss';
// import icon from '@/public/assets/images/discounts.svg';
import Image from 'next/image';

interface Props {
    icon: any,
    text: string,
    url: string
}
const EntryPoint = (props: Props) => {
    const { icon, text, url } = props;
    return (
        <Link href={url} className={classes.container}>
            <div className={classes.iconContainer}>
                <Image alt={text} src={icon} />
            </div>
            <h4 className={classes.title}>{text}</h4>
        </Link>
    )
}

export default EntryPoint;
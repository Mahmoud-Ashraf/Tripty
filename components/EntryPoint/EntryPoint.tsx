import Link from 'next/link';
import classes from './entry-point.module.scss';
// import icon from '@/public/assets/images/discounts.svg';
import Image from 'next/image';
import Translate from '../helpers/Translate/Translate';

interface Props {
    icon: any,
    text: string,
    url: string
}
const EntryPoint = (props: Props) => {
    const { icon, text, url } = props;
    return (
        <Link href={url} className={classes.container}>
            <h4 className={classes.title}><Translate id={`entries.${text}`} /></h4>
            <div className={classes.iconContainer}>
                <Image alt={text} src={icon} />
            </div>
        </Link>
    )
}

export default EntryPoint;
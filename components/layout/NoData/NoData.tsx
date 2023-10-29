import Link from 'next/link';
import classes from './no-data.module.scss';

interface Props {
    text: string
}
const NoData = (props: Props) => {
    const { text } = props;
    return (
        <div className={classes.noData}>
            <p>Sorry, {text}</p>
            <Link href={'/home'} className='btn btn-main'>Go To Home</Link>
        </div>
    )
}

export default NoData;

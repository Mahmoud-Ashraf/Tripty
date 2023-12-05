import Link from 'next/link';
import classes from './no-data.module.scss';
import Translate from '@/components/helpers/Translate/Translate';

interface Props {
    text: string
    showHomeBtn?: boolean
}
const NoData = (props: Props) => {
    const { text, showHomeBtn } = props;
    return (
        <div className="col-12">
            <div className={classes.noData}>
                <p><Translate id="noData.sorry" />, {text}</p>
                {showHomeBtn && <Link href={'/home'} className='btn btn-main'>Go To Home</Link>}
            </div>
        </div>
    )
}

export default NoData;

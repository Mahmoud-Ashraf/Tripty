import { useState } from 'react';
import classes from './rate-modal.module.scss';
import Rate from 'rc-rate';
import Translate from '../helpers/Translate/Translate';
import { useRouter } from 'next/router';
import useHTTP from '@/hooks/use-http';

const RateModal = ({ placeId, closeModal, type }: { placeId: number, closeModal: () => void, type: 'places' | 'tourism-packages' }) => {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    const router = useRouter();
    const { isLoading, error, sendRequest } = useHTTP();
    const saveRate = () => {
        if (!comment || !rate) {
            return;
        }
        sendRequest(
            {
                url: `/api/${type}/${placeId}/rating`,
                method: 'POST',
                body: { comment, stars: rate }
            },
            (data: any) => {
                closeModal();
            },
            (err: any) => console.error(err)
        )
    }
    return (
        <div className={classes.container}>
            <div className={classes.inputGroup}>
                <label><Translate id="rate.yourRate" /></label>
                <Rate
                    defaultValue={4.5}
                    onChange={(v) => setRate(v)}
                    style={{ fontSize: 20 }}
                    allowHalf
                    direction={router.locale === 'ar' ? 'rtl' : 'ltr'}
                    character={<i className="anticon anticon-star" />}
                />
            </div>
            <div className={classes.inputGroup}>
                <label><Translate id="rate.comments" /></label>
                <textarea value={comment} rows={5} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <div className="row justify-content-end">
                <div className="col-4">
                    <button disabled={!comment || !rate} className='btn btn-main w-100' onClick={saveRate}><Translate id="buttons.send" /></button>
                </div>
            </div>
        </div>
    )
}

export default RateModal;
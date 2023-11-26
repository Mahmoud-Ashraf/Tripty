import { useState } from 'react';
import classes from './rate-modal.module.scss';
import Rate from 'rc-rate';

const RateModal = ({ placeId }: { placeId: number }) => {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    const onChange = (v: number) => {
        setRate(v);
    }
    const saveRate = () => {
        console.log(placeId, rate, comment);
    }
    return (
        <div className={classes.container}>
            <div className={classes.inputGroup}>
                <label>Your rate</label>
                <Rate
                    defaultValue={4.5}
                    onChange={onChange}
                    style={{ fontSize: 20 }}
                    allowHalf
                    character={<i className="anticon anticon-star" />}
                />
            </div>
            <div className={classes.inputGroup}>
                <label>Comments</label>
                <textarea value={comment} rows={5} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <div className="row justify-content-end">
                <div className="col-4">
                    <button className='btn btn-main w-100' onClick={saveRate}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default RateModal;
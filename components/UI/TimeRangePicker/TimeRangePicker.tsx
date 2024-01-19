import { useState } from 'react';
import classes from './trp.module.scss';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';

const TimeRangePicker = () => {
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const [hours, setHours] = useState(Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0')));
    const [minutes, setMinutes] = useState(Array.from({ length: 6 }, (_, index) => (index * 10).toString().padStart(2, '0')));
    const [meridiems, setMeridiems] = useState([translate('time.am'), translate('time.pm')]);
    const [fromHour, setFromHour] = useState('');
    const [fromMinute, setFromMinute] = useState('');
    const [fromMeridiem, setFromMeridiem] = useState('');

    const [toHour, setToHour] = useState('');
    const [toMinute, setToMinute] = useState('');
    const [toMeridiem, setToMeridiem] = useState('');

    const [inputValue, setInputValue] = useState('');

    const formatTime24 = (time12: string) => {
        const meridiems = time12.split(' ')[1];
        if (meridiems === translate('time.pm')) {
            const hours12 = time12.slice(0, 2);
            const hours24 = Number(hours12) + 12;
            console.log(`${hours24}:${time12.slice(3, 5)}`);
            return `${hours24}:${time12.slice(3, 5)}`
        } else {
            console.log(`${time12.slice(0, 2)}:${time12.slice(3.5)}`);
            return `${time12.slice(0, 2)}:${time12.slice(3.5)}`;
        }
    }
    const handleInputChange = () => {
        const fromTime = `${fromHour}:${fromMinute} ${fromMeridiem}`;
        const toTime = `${toHour}:${toMinute} ${toMeridiem}`;

        // Update the input or perform any other actions with the selected time range
        const timeRange = `${translate('common.from')} ${fromTime} ${translate('common.to')} ${toTime}`;
        setInputValue(timeRange);
        // formatTime24(fromTime);
        dispatch(tripActions.setTripData({ start_at: formatTime24(fromTime), end_at: formatTime24(toTime) }))
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <input readOnly className={classes.input} type='text' value={inputValue} placeholder={translate('placeholder.selectTripTime')} />
            </div>
            <div className={classes.dropdownWrapper}>
                <div className={classes.optionsContainer}>
                    <div className={classes.optionsFrom}>
                        <p className={classes.optionsTitle}><Translate id="common.from" /></p>
                        <div className={classes.optionsWrapper}>
                            <div className={classes.options}>
                                {
                                    hours?.map(hour => {
                                        return (
                                            <div onClick={() => setFromHour(hour)} key={hour} className={`${classes.option} ${fromHour === hour ? classes.selected : ''}`}>{hour}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.options}>
                                {
                                    minutes?.map(minute => {
                                        return (
                                            <div onClick={() => setFromMinute(minute)} key={minute} className={`${classes.option} ${fromMinute === minute ? classes.selected : ''}`}>{minute}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.options}>
                                {
                                    meridiems?.map(meridiem => {
                                        return (
                                            <div onClick={() => setFromMeridiem(meridiem)} key={meridiem} className={`${classes.option} ${fromMeridiem === meridiem ? classes.selected : ''}`}>{meridiem}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={classes.optionsTo}>
                        <p className={classes.optionsTitle}><Translate id="common.to" /></p>
                        <div className={classes.optionsWrapper}>
                            <div className={classes.options}>
                                {
                                    hours?.map(hour => {
                                        return (
                                            <div onClick={() => setToHour(hour)} key={hour} className={`${classes.option} ${toHour === hour ? classes.selected : ''}`}>{hour}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.options}>
                                {
                                    minutes?.map(minute => {
                                        return (
                                            <div onClick={() => setToMinute(minute)} key={minute} className={`${classes.option} ${toMinute === minute ? classes.selected : ''}`}>{minute}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.options}>
                                {
                                    meridiems?.map(meridiem => {
                                        return (
                                            <div onClick={() => setToMeridiem(meridiem)} key={meridiem} className={`${classes.option} ${toMeridiem === meridiem ? classes.selected : ''}`}>{meridiem}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.actionsWrapper}>
                    <button onClick={handleInputChange} className='btn btn-main btn-sm'>Done</button>
                </div>
            </div>
        </div>
    )
}

export default TimeRangePicker;
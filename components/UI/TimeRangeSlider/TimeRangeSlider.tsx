import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import classes from './time-range-slider.module.scss';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import Translate from '@/components/helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';

const TimeRangeSlider = () => {
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const step = 10; // 10 minutes step
    const totalHours = 24; // 24 hours

    const [value, setValue] = useState([0, (totalHours * 60)]); // Default range from 00:00 to 23:59
    const [marks, setMarks] = useState<any>({ 0: '00:00', [(totalHours * 60)]: '24:00' });
    const formatTime24 = (minutes: any) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const paddedHours = String(hours).padStart(2, '0');
        const paddedMinutes = String(mins).padStart(2, '0');
        return `${paddedHours}:${paddedMinutes}`;
    };

    const formatTime12 = (minutes: any) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const amPm = hours >= 12 ? translate('time.pm') : translate('time.am');
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        const paddedHours = String(displayHours).padStart(2, '0');
        const paddedMinutes = String(mins).padStart(2, '0');
        return `${paddedHours}:${paddedMinutes} ${amPm}`;
    };

    const handleChange = (newValue: any) => {
        setValue(newValue);
        // console.log()
        // let newMarks;
        // if (newValue[0] === 0) {

        // }
        const newMarks = {
            [newValue[0]]: newValue[0] === 0 ? '' : formatTime12(newValue[0]),
            [newValue[1]]: newValue[1] === totalHours * 60 ? '' : formatTime12(newValue[1])
        };

        setMarks(newMarks);
        dispatch(tripActions.setTripData({ start_at: formatTime24(newValue[0]), end_at: formatTime24(newValue[1]) }))
    };

    useEffect(() => {
        handleChange(value);
    }, [])
    return (
        <div className={classes.container}>
            <span className={classes.initialTime}>12:00 <Translate id="time.am" /></span>
            <Slider
                range
                min={0}
                max={(totalHours * 60)}
                value={value}
                step={step}
                onChange={handleChange}
                marks={marks}
            />
            <span className={classes.initialTime}>12:00 <Translate id="time.am" /></span>
        </div>
    );
};

export default TimeRangeSlider;

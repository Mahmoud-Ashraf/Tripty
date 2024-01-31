import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import classes from './time-range-slider.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import { useRouter } from 'next/router';
import { useFormatTime } from '@/hooks/formatTime';
import { RootState } from '@/store';
import { timeSliderActions } from '@/store/TimeSlider/TimeSlider';
import { MINTUES_IN_HOUR, TIME_SLIDER_AFTER_HOURS } from '@/config/constants';

const TimeRangeSlider = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const tripData = useSelector((state: RootState) => state.trip.tripData);
    const timeSliderData = useSelector((state: RootState) => state.timeSlider.timeSliderData);
    const step = 10; // 10 minutes step
    const { formatTime12, formatTime24, formatDateToYYYYMMDD } = useFormatTime();

    const [marks, setMarks] = useState<any>();

    const handleChange = (newValue: any) => {
        dispatch(
            tripActions.setTripData({
                start_at: newValue[0],
                end_at: newValue[1],
            })
        );
    };

    useEffect(() => {
        const newMarks = {
            [tripData.start_at]: formatTime12(tripData.start_at),
            [tripData.end_at]: formatTime12(tripData.end_at),
        };
        setMarks(newMarks);
    }, [tripData.start_at, tripData.end_at])

    useEffect(() => {
        if (formatDateToYYYYMMDD(new Date(tripData.date)) === formatDateToYYYYMMDD(new Date())) {
            const currentHour = new Date().getHours();
            const currentMinutes = new Date().getMinutes();
            if (currentHour >= TIME_SLIDER_AFTER_HOURS) {
                dispatch(timeSliderActions.changeTimeSliderData({ min: ((currentHour + 1) * MINTUES_IN_HOUR) + currentMinutes + (10 - currentMinutes % 10) }));
            } else {
                dispatch(timeSliderActions.resetTimeSliderData());
            }
        } else {
            dispatch(timeSliderActions.resetTimeSliderData());
        }
    }, [tripData.date]);

    useEffect(() => {
        dispatch(tripActions.setTripData({ start_at: timeSliderData.min, end_at: timeSliderData.max }));
    }, [timeSliderData.min])

    return (
        <div className={classes.container}>
            <span className={classes.initialTime}>{formatTime12(timeSliderData.min)}</span>
            <Slider
                reverse={router.locale === 'ar'}
                range
                min={timeSliderData.min}
                max={timeSliderData.max}
                value={[Number(tripData?.start_at), Number(tripData?.end_at)]}
                step={step}
                onChange={handleChange}
                marks={marks}
            />
            <span className={classes.initialTime}>{formatTime12(timeSliderData.max)}</span>
        </div>
    );
};

export default TimeRangeSlider;

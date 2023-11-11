import { forwardRef, useEffect, useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import DatePicker from 'react-datepicker'
import TimeRangeSlider from '../UI/TimeRangeSlider/TimeRangeSlider';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';

interface CustomDateButtonProps {
    value?: string;
    onClick?: () => void;
}

const DateCustomButton = forwardRef<HTMLButtonElement, CustomDateButtonProps>(
    ({ value, onClick }, ref) => (
        <button className={classes.customDateButton} onClick={onClick} ref={ref}>
            {value}
        </button>
    )
);
const DetailsStep = () => {
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [howComing, setHowComing] = useState<string[]>(['Solo', 'Family', 'Friends']);
    const [selectedComing, setSelectedComing] = useState<string>('');
    const [adultsCount, setAdultsCount] = useState<number>();
    const [childrenCount, setChildrenCount] = useState<number>();

    function formatDateToYYYYMMDD(date: Date | null) {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return null;
    }

    const handleChangeDate = (date: Date | null) => {
        setSelectedDate(date);
    }

    const handleSetComing = (item: string) => {
        setSelectedComing(item);
    }

    useEffect(() => {
        setSelectedDate(new Date());
        setSelectedComing(howComing[0]);
        setAdultsCount(1);
        setChildrenCount(0);
    }, []);

    useEffect(() => {
        setChildrenCount(0);
        setAdultsCount(1);
        dispatch(tripActions.setTripData({ family: selectedComing === 'Family' ? 1 : 0 }));
    }, [selectedComing]);

    useEffect(() => {
        dispatch(tripActions.setTripData({ adults: adultsCount }));
    }, [adultsCount]);

    useEffect(() => {
        dispatch(tripActions.setTripData({ children: childrenCount }));
    }, [childrenCount]);

    useEffect(() => {
        dispatch(tripActions.setTripData({ date: formatDateToYYYYMMDD(selectedDate) }));
    }, [selectedDate]);



    return (
        <div className={classes.details}>
            <div className="row">
                <div className="col-md-6">
                    <TripModalHeading text='Date' />
                    <DatePicker
                        selected={selectedDate}
                        dateFormat={'dd MMM yy'}
                        onChange={(date) => handleChangeDate(date)}
                        customInput={<DateCustomButton />}
                    />
                    <TripModalHeading text='Trip Duration' />
                    <TimeRangeSlider />
                </div>
                <div className="col-md-6">
                    <TripModalHeading text='Who’s coming with you?' />
                    <div className={classes.coming}>
                        <div className="row justify-content-between">
                            {
                                howComing.map(
                                    item => {
                                        return (
                                            <div key={item} className="col-auto">
                                                <div onClick={() => handleSetComing(item)} className={`${classes.selection} ${selectedComing === item ? classes.selected : ''}`}>
                                                    <span>{item}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                        <div className={classes.comingCount}>
                            <div className="row mt-3 g-3">
                                {
                                    (selectedComing === 'Family' || selectedComing === 'Friends') &&
                                    <div className="col-12">
                                        <div className={classes.counter}>
                                            <span onClick={() => setAdultsCount(prev => (prev && (prev > 1)) ? --prev : 1)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{adultsCount} Adults</span>
                                            <span onClick={() => setAdultsCount(prev => (prev && (prev < 10)) ? ++prev : 10)} className={classes.counterInc}>+</span>
                                        </div>
                                    </div>}
                                {
                                    selectedComing === 'Family' &&
                                    <div className="col-12">
                                        <div className={classes.counter}>
                                            <span onClick={() => setChildrenCount(prev => (prev && (prev > 0)) ? --prev : 0)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{childrenCount} Children</span>
                                            <span onClick={() => setChildrenCount(prev => (prev?.toString() && (prev < 5)) ? ++prev : 5)} className={classes.counterInc}>+</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsStep;
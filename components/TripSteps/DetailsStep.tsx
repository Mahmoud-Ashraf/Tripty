import { forwardRef, useEffect, useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import DatePicker, { registerLocale } from 'react-datepicker'
import TimeRangeSlider from '../UI/TimeRangeSlider/TimeRangeSlider';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import Translate from '../helpers/Translate/Translate';
import ar from 'date-fns/locale/ar';
import { useRouter } from 'next/router';
registerLocale('ar', ar);

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
    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [howComing, setHowComing] = useState<string[]>(['solo', 'family', 'friends']);
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
                    <TripModalHeading text='date' />
                    <DatePicker
                        selected={selectedDate}
                        locale={router.locale}
                        dateFormat={'dd MMM yy'}
                        minDate={new Date()}
                        onChange={(date) => handleChangeDate(date)}
                        customInput={<DateCustomButton />}
                    />
                    <TripModalHeading text='tripDuration' />
                    <TimeRangeSlider />
                </div>
                <div className="col-md-6">
                    <TripModalHeading text='WhoComing' />
                    <div className={classes.coming}>
                        <div className="row justify-content-between">
                            {
                                howComing?.map(
                                    item => {
                                        return (
                                            <div key={item} className="col-auto">
                                                <div onClick={() => handleSetComing(item)} className={`${classes.selection} ${selectedComing === item ? classes.selected : ''}`}>
                                                    <span><Translate id={`tripModal.${item}`} /></span>
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
                                    (selectedComing === 'family' || selectedComing === 'friends') &&
                                    <div className="col-12">
                                        <div className={classes.counter}>
                                            <span onClick={() => setAdultsCount(prev => (prev && (prev > 1)) ? --prev : 1)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{adultsCount} <Translate id='tripModal.adults' /></span>
                                            <span onClick={() => setAdultsCount(prev => (prev && (prev < 10)) ? ++prev : 10)} className={classes.counterInc}>+</span>
                                        </div>
                                    </div>}
                                {
                                    selectedComing === 'family' &&
                                    <div className="col-12">
                                        <div className={classes.counter}>
                                            <span onClick={() => setChildrenCount(prev => (prev && (prev > 0)) ? --prev : 0)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{childrenCount} <Translate id='tripModal.children' /></span>
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
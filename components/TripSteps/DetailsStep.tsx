import { forwardRef, useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import DatePicker from 'react-datepicker'
import TimeRangeSlider from '../UI/TimeRangeSlider/TimeRangeSlider';

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
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [howComing, setHowComing] = useState<string[]>(['Solo', 'Family', 'Friends']);
    const [selectedComing, setSelectedComing] = useState<string>('Solo');
    const [adultsCount, setAdultsCount] = useState<number>(1);
    const [childrenCount, setChildrenCount] = useState<number>(0);

    return (
        <div className={classes.details}>
            <div className="row">
                <div className="col-md-6">
                    <TripModalHeading text='Date' />
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
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
                                                <div onClick={() => setSelectedComing(item)} className={`${classes.selection} ${selectedComing === item ? classes.selected : ''}`}>
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
                                            <span onClick={() => setAdultsCount(prev => prev > 1 ? --prev : 1)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{adultsCount} Adults</span>
                                            <span onClick={() => setAdultsCount(prev => prev < 10 ? ++prev : 10)} className={classes.counterInc}>+</span>
                                        </div>
                                    </div>}
                                {
                                    selectedComing === 'Family' &&
                                    <div className="col-12">
                                        <div className={classes.counter}>
                                            <span onClick={() => setChildrenCount(prev => prev > 0 ? --prev : 0)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{childrenCount} Children</span>
                                            <span onClick={() => setChildrenCount(prev => prev < 5 ? ++prev : 5)} className={classes.counterInc}>+</span>
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
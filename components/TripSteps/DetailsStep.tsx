import { forwardRef, useEffect, useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import DatePicker, { registerLocale } from 'react-datepicker'
import TimeRangeSlider from '../UI/TimeRangeSlider/TimeRangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import Translate from '../helpers/Translate/Translate';
import ar from 'date-fns/locale/ar';
import { useRouter } from 'next/router';
import useTranslate from '@/hooks/use-translate';
import TimeRangePicker from '../UI/TimeRangePicker/TimeRangePicker';
import { RootState } from '@/store';
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
    const { translate } = useTranslate();
    const [howComing, setHowComing] = useState<string[]>(['solo', 'family', 'friends']);
    const tripData = useSelector((state: RootState) => state.trip.tripData);

    const handleChangeDate = (date: Date | null) => {
        // console.log(date?.toISOString());
        dispatch(tripActions.setTripData({ date: date?.toISOString() }));
        // setSelectedDate(date);
    }

    const handleSetComing = (item: string) => {
        dispatch(tripActions.setTripData({ howsComing: item, children: 0, adults: 1 }));
    }

    const handleNameChange = (name: string) => {
        dispatch(tripActions.setTripData({ name }));
    }

    const handleAdultsCount = (count: number) => {
        dispatch(tripActions.setTripData({ adults: count }));
    }

    const handleChildrenCount = (count: number) => {
        dispatch(tripActions.setTripData({ children: count }));
    }

    return (
        <div className={classes.details}>
            <div className="row">
                <div className="col-md-6">
                    <TripModalHeading text='tripName' />
                    <input placeholder={translate('placeholder.tripName')} className={classes.input} value={tripData?.name} onChange={(e) => handleNameChange(e.target.value)} />
                    <TripModalHeading text='date' />
                    <DatePicker
                        selected={new Date(tripData.date)}
                        locale={router.locale}
                        dateFormat={'dd MMM yy'}
                        minDate={new Date()}
                        onChange={(date) => handleChangeDate(date)}
                        customInput={<DateCustomButton />}
                    />
                    <TripModalHeading text='tripDuration' />
                    <TimeRangeSlider />
                    {/* <TimeRangePicker /> */}
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
                                                <div onClick={() => handleSetComing(item)} className={`${classes.selection} ${tripData.howsComing === item ? classes.selected : ''}`}>
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
                                    (tripData.howsComing === 'family' || tripData.howsComing === 'friends') &&
                                    <div className="col-12">
                                        <div className={classes.counter}>
                                            <span onClick={() => handleAdultsCount((tripData?.adults > 1) ? (tripData?.adults - 1) : 1)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{tripData?.adults} <Translate id='tripModal.adults' /></span>
                                            <span onClick={() => handleAdultsCount((tripData?.adults < 10) ? (tripData.adults + 1) : 10)} className={classes.counterInc}>+</span>
                                        </div>
                                    </div>}
                                {
                                    tripData.howsComing === 'family' &&
                                    <div className="col-12">
                                        <div className={classes.counter}>
                                            <span onClick={() => handleChildrenCount((tripData?.children > 0) ? (tripData.children - 1) : 0)} className={classes.counterDec}>-</span>
                                            <span className={classes.count}>{tripData?.children} <Translate id='tripModal.children' /></span>
                                            <span onClick={() => handleChildrenCount((tripData.children < 5) ? (tripData?.children + 1) : 5)} className={classes.counterInc}>+</span>
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
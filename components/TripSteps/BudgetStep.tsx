import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';
import Translate from '../helpers/Translate/Translate';
import useTranslate from '@/hooks/use-translate';
import { RootState } from '@/store';

const BudgetStep = () => {
    const dispatch = useDispatch();
    const tripData = useSelector((state: RootState) => state.trip.tripData);
    const { translate } = useTranslate();

    const handleHaveBudgetChange = (haveBudget: boolean) => {
        dispatch(tripActions.setTripData({ haveBudget }));
    }

    const handleBudgetChange = (budget: string) => {
        dispatch(tripActions.setTripData({ budget: (tripData?.haveBudget && budget) ? budget : '0' }));
    }

    return (
        <div className={classes.budget}>
            <div className="row">
                <div className="col-md-6">
                    <TripModalHeading text='doYouHaveBudget' />
                    <div className="row">
                        <div className="col-4">
                            <div onClick={() => handleHaveBudgetChange(false)} className={`${classes.selection} ${!tripData?.haveBudget ? classes.selected : ''}`}>
                                <span><Translate id='common.no' /></span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div onClick={() => handleHaveBudgetChange(true)} className={`${classes.selection} ${tripData?.haveBudget ? classes.selected : ''}`}>
                                <span><Translate id='common.yes' /></span>
                            </div>
                        </div>
                    </div>
                </div>
                {tripData?.haveBudget && <div className="col-md-6">
                    <TripModalHeading text='howMuchBudget' />
                    <div className="row">
                        <div className="col-md-7">
                            <input className={classes.input} onChange={(e: any) => handleBudgetChange(e.target.value)} value={tripData.budget} placeholder={translate('tripModal.yourBudget')} />
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default BudgetStep;
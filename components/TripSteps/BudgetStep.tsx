import { useEffect, useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';
import { useDispatch } from 'react-redux';
import { tripActions } from '@/store/Trip/Trip';

const BudgetStep = () => {
    const dispatch = useDispatch();
    const [haveBudget, setHaveBudget] = useState<Boolean>();
    const [budget, setBudget] = useState<string>('');

    useEffect(() => {
        setHaveBudget(true);
    }, []);
    useEffect(() => {
        dispatch(tripActions.setTripData({ budget: (haveBudget && budget) ? budget : '0' }))
    }, [haveBudget, budget]);
    return (
        <div className={classes.budget}>
            <div className="row">
                <div className="col-md-6">
                    <TripModalHeading text='Do you have Budget?' />
                    <div className="row">
                        <div className="col-4">
                            <div onClick={() => setHaveBudget(true)} className={`${classes.selection} ${haveBudget ? classes.selected : ''}`}>
                                <span>Yes</span>
                            </div>
                        </div>
                        <div className="col-4">
                            <div onClick={() => setHaveBudget(false)} className={`${classes.selection} ${!haveBudget ? classes.selected : ''}`}>
                                <span>No</span>
                            </div>
                        </div>
                    </div>
                </div>
                {haveBudget && <div className="col-md-6">
                    <TripModalHeading text='How much your Budget?' />
                    <div className="row">
                        <div className="col-md-7">
                            <input className={classes.input} onChange={(e: any) => setBudget(e.target.value)} value={budget} placeholder='Your Budget?' />
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default BudgetStep;
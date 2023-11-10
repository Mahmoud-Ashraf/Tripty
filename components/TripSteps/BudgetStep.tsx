import { useState } from 'react';
import TripModalHeading from '../TripModal/TripModalHeading';
import classes from './trip-steps.module.scss';

const BudgetStep = () => {
    const [haveBudget, setHaveBudget] = useState<Boolean>(true);
    const [budget, setBudget] = useState<string>('');

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
                <div className="col-md-6">
                    <TripModalHeading text='How much your Budget?' />
                    <div className="row">
                        <div className="col-md-7">
                            <input className={classes.input} onChange={(e: any) => setBudget(e.target.value)} value={budget} placeholder='Your Budget?' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetStep;
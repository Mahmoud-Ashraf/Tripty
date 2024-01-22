import useHTTP from "@/hooks/use-http";
import { RootState } from "@/store";
import { tripActions } from "@/store/Trip/Trip";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Translate from "../helpers/Translate/Translate";
import { authActions } from "@/store/Auth/Auth";
import Loader from "../UI/Loader/Loader";

const TripModalFooter = () => {
    const dispatch = useDispatch();
    // const router = useRouter();
    const step = useSelector((state: RootState) => state.trip.currentStep);
    // const stepsCount = useSelector((state: RootState) => state.trip.numberOfSteps);
    const tripData = useSelector((state: RootState) => state.trip.tripData);
    const [stepError, setStepError] = useState('');
    const { isLoading, error, sendRequest } = useHTTP();

    const nextStep = () => {
        if (step === 2 && !tripData?.name) {
            setStepError('errors.tripNameRequiredError');
        }
        else if (step === 4 && (!tripData?.tags || !(tripData.tags.length > 0))) {
            setStepError('errors.tagsError')
        } else if (step === 4) {
            // if (session?.token) {
            sendRequest(
                {
                    url: '/api/trip/create',
                    method: 'POST',
                    body: { ...tripData }
                },
                (data: any) => {
                    dispatch(tripActions.setCurrentTrip(data));
                    // router.push('/create-trip');
                    // dispatch(tripActions.closeShowTripModal());
                    dispatch(tripActions.nextStep());
                },
                (err: any) => {
                    if (err === 'The name has already been taken.') {
                        setStepError('errors.tripNameTakenError')
                    }
                    console.log(err)
                }
            )
            // } else {
            //     dispatch(authActions.openShowAuthModal());
            // }
        } else {
            dispatch(tripActions.nextStep());
            setStepError('');
        }
    }

    useEffect(() => {
        setStepError('');
    }, [step])

    const prevStep = () => {
        dispatch(tripActions.prevStep());
    }
    return (
        <div>
            {stepError && <div className="row">
                <div className="col-12">
                    <p className="fs-5 text-error"><Translate id={stepError} /></p>
                </div>
            </div>}
            <div className="row justify-content-between mt-5">
                <div className="col-4">
                    {(step > 1 || step > 4) && <button onClick={prevStep} className="btn btn-main btn-lg w-100" disabled={isLoading}><Translate id='common.prev' /></button>}
                </div>
                <div className="col-4">
                    <button onClick={nextStep} className="btn btn-main btn-lg w-100" disabled={isLoading}>{isLoading ? <Loader /> : <Translate id='common.next' />}</button>
                </div>
            </div>
        </div>
    )
}

export default TripModalFooter;
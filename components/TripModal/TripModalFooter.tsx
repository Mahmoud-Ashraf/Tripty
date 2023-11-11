import { RootState } from "@/store";
import { tripActions } from "@/store/Trip/Trip";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TripModalFooter = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const step = useSelector((state: RootState) => state.trip.currentStep);
    const stepsCount = useSelector((state: RootState) => state.trip.numberOfSteps);
    const tripData = useSelector((state: RootState) => state.trip.tripData);
    const [error, setError] = useState('');

    const nextStep = () => {
        console.log(step);
        if (step === 4 && (!tripData?.tags || !(tripData.tags.length > 0))) {
            setError('Please Select Tags First')
        } else if (step === stepsCount) {
            router.push('/create-trip');
        } else {
            dispatch(tripActions.nextStep());
        }
    }

    const cancel = () => {
        dispatch(tripActions.closeShowTripModal());
    }
    return (
        <div>
            {error && <div className="row">
                <div className="col-12">
                    <p className="fs-5 text-error">{error}</p>
                </div>
            </div>}
            <div className="row justify-content-end mt-5">
                <div className="col-4">
                    <button onClick={cancel} className="btn btn-main btn-lg w-100">Cancel</button>
                </div>
                <div className="col-4">
                    <button onClick={nextStep} className="btn btn-main btn-lg w-100">Next</button>
                </div>
            </div>
        </div>
    )
}

export default TripModalFooter;
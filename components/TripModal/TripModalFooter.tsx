import useHTTP from "@/hooks/use-http";
import { RootState } from "@/store";
import { tripActions } from "@/store/Trip/Trip";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Translate from "../helpers/Translate/Translate";
import { useSession } from "next-auth/react";
import { authActions } from "@/store/Auth/Auth";

const TripModalFooter = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const step = useSelector((state: RootState) => state.trip.currentStep);
    const stepsCount = useSelector((state: RootState) => state.trip.numberOfSteps);
    const tripData = useSelector((state: RootState) => state.trip.tripData);
    const [stepError, setStepError] = useState('');
    const { isLoading, error, sendRequest } = useHTTP();
    const { data: session }: any = useSession();

    const nextStep = () => {
        if (step === 4 && (!tripData?.tags || !(tripData.tags.length > 0))) {
            setStepError('errors.tagsError')
        } else if (step === 4) {
            // if (session?.token) {
            sendRequest(
                {
                    url: '/api/trip/create',
                    method: 'POST',
                    body: { ...tripData, name: `trip ${tripData?.date} from ${tripData?.start_at} to ${tripData?.end_at} @ ${tripData?.city_id}` }
                },
                (data: any) => {
                    dispatch(tripActions.setCurrentTrip(data));
                    // router.push('/create-trip');
                    // dispatch(tripActions.closeShowTripModal());
                    dispatch(tripActions.nextStep());
                },
                (err: any) => console.error(err)
            )
            // } else {
            //     dispatch(authActions.openShowAuthModal());
            // }
        } else {
            dispatch(tripActions.nextStep());
        }
    }

    const cancel = () => {
        dispatch(tripActions.closeShowTripModal());
    }
    return (
        <div>
            {stepError && <div className="row">
                <div className="col-12">
                    <p className="fs-5 text-error"><Translate id={stepError} /></p>
                </div>
            </div>}
            <div className="row justify-content-end mt-5">
                <div className="col-4">
                    <button onClick={cancel} className="btn btn-main btn-lg w-100"><Translate id='common.cancel' /></button>
                </div>
                <div className="col-4">
                    <button onClick={nextStep} className="btn btn-main btn-lg w-100"><Translate id='common.next' /></button>
                </div>
            </div>
        </div>
    )
}

export default TripModalFooter;
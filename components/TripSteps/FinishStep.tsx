import useHTTP from "@/hooks/use-http";
import { RootState } from "@/store";
import { tripActions } from "@/store/Trip/Trip";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FinishStep = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const tripData = useSelector((state: RootState) => state.trip.tripData);
    const { isLoading, error, sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest(
            {
                url: '/api/trip/create',
                method: 'POST',
                body: { ...tripData, name: 'test from web4' }
            },
            (data: any) => {
                dispatch(tripActions.closeShowTripModal());
                router.push('/create-trip');
            },
            (err: any) => console.error(err)
        )
    }, [tripData])
    return (
        <div></div>
    )
}

export default FinishStep;
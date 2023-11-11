import { tripActions } from "@/store/Trip/Trip";
import { useDispatch } from "react-redux";

const TripModalFooter = () => {
    const dispatch = useDispatch();

    const nextStep = () => {
        dispatch(tripActions.nextStep());
    }

    const cancel = () => {
        dispatch(tripActions.closeShowTripModal());
    }
    return (
        <div>
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
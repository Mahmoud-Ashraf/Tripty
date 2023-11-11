import { Trip } from '@/interfaces/trip';
import { createSlice } from '@reduxjs/toolkit';

interface TripState {
    showTripModal: boolean
    tripData: Trip | null,
    numberOfSteps: number,
    currentStep: number
}

// const initialTripData = null;
const initialTripState: TripState = { showTripModal: false, tripData: null, numberOfSteps: 4, currentStep: 1 }

const tripSlice = createSlice({
    name: 'trip',
    initialState: initialTripState,
    reducers: {
        openShowTripModal(state) {
            state.showTripModal = true;
        },
        closeShowTripModal(state) {
            state.showTripModal = false;
            state.currentStep = 1;
            state.tripData = null;
        },
        setTripData(state, action) {
            state.tripData = { ...state.tripData, ...action.payload };
        },
        nextStep(state) {
            state.currentStep = ++state.currentStep;
        }

    }
})



export const tripActions = tripSlice.actions;

export default tripSlice.reducer;
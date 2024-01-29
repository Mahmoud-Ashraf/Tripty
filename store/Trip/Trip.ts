import { TIME_SLIDER_MAX_HOUR, TIME_SLIDER_MIN_HOUR } from '@/config/constants';
import { Trip } from '@/interfaces/trip';
import { createSlice } from '@reduxjs/toolkit';

interface TripState {
    showTripModal: boolean
    tripData: Trip,
    numberOfSteps: number,
    currentStep: number,
    currentTrip: Trip | null
}

const initialTripData: Trip = {
    adults: 1,
    haveBudget: false,
    budget: "",
    children: 0,
    city: null,
    date: new Date().toISOString(),
    end_at: TIME_SLIDER_MAX_HOUR,
    family: 0,
    name: '',
    start_at: TIME_SLIDER_MIN_HOUR,
    tags: [],
    otherTags: [],
    howsComing: 'solo'
};
const initialTripState: TripState = { showTripModal: false, tripData: initialTripData, numberOfSteps: 5, currentStep: 1, currentTrip: null }

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
            state.tripData = initialTripData;
        },
        setTripData(state, action) {
            state.tripData = { ...state.tripData, ...action.payload };
        },
        nextStep(state) {
            state.currentStep = ++state.currentStep;
        },
        prevStep(state) {
            state.currentStep = --state.currentStep;
        },
        setCurrentTrip(state, action) {
            state.currentTrip = action.payload;
        },
        clearCurrentTrip(state) {
            state.currentTrip = null;
        }

    }
})



export const tripActions = tripSlice.actions;

export default tripSlice.reducer;
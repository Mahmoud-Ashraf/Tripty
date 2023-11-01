import { createSlice } from '@reduxjs/toolkit';

interface TripState {
    showTripModal: boolean
}
const initialTripState: TripState = { showTripModal: false }

const tripSlice = createSlice({
    name: 'trip',
    initialState: initialTripState,
    reducers: {
        openShowTripModal(state) {
            state.showTripModal = true;
        },
        closeShowTripModal(state) {
            state.showTripModal = false;
        }
    }
})



export const tripActions = tripSlice.actions;

export default tripSlice.reducer;
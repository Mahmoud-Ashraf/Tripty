import { TIME_SLIDER_MAX_HOUR, TIME_SLIDER_MIN_HOUR } from '@/config/constants';
import { createSlice } from '@reduxjs/toolkit';

interface TripState {
    timeSliderData: any
}

const initialTimeSliderData: any = {
    min: TIME_SLIDER_MIN_HOUR,
    max: TIME_SLIDER_MAX_HOUR
};
const initialTimeSliderState: TripState = { timeSliderData: initialTimeSliderData }

const timeSliderSlice = createSlice({
    name: 'timeSlider',
    initialState: initialTimeSliderState,
    reducers: {
        changeTimeSliderData(state, action) {
            state.timeSliderData = { ...state.timeSliderData, ...action.payload };
        },
        resetTimeSliderData(state) {
            state.timeSliderData = initialTimeSliderData;
        }
    }
})



export const timeSliderActions = timeSliderSlice.actions;

export default timeSliderSlice.reducer;
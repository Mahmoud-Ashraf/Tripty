import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import tripReducer from "./Trip/Trip";
import authReducer from "./Auth/Auth";
import timeSliderReducer from "./TimeSlider/TimeSlider";
import subscriptionReducer from "./Subscription/Subscription";

const store = configureStore({
    reducer: { lang: langReducer, trip: tripReducer, auth: authReducer, timeSlider: timeSliderReducer, subscription: subscriptionReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
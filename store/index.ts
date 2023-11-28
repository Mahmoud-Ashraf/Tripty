import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import tripReducer from "./Trip/Trip";

const store = configureStore({
    reducer: { lang: langReducer, trip: tripReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
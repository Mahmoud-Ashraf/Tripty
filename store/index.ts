import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import tripReducer from "./Trip/Trip";
import authReducer from "./Auth/Auth";

const store = configureStore({
    reducer: { lang: langReducer, trip: tripReducer, auth: authReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
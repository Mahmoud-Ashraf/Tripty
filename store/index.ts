import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";
import tripReducer from "./Trip/Trip";

const store = configureStore({
    reducer: { lang: langReducer, trip: tripReducer }
});

export default store;
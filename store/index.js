import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./Lang/Lang";

const store = configureStore({
    reducer: { lang: langReducer }
});

export default store;
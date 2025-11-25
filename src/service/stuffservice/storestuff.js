import { configureStore } from "@reduxjs/toolkit";
import { stuffApi } from "./stuffapi";

export const store = configureStore({
    reducer: {
        [stuffApi.reducerPath]: stuffApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(stuffApi.middleware),
});

//test commit
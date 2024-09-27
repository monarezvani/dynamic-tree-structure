import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../services/fetchTreeData";
import { treeReducer } from "./treeReducer";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // The RTK Query API slice, responsible for handling API calls

        dynamicTree: treeReducer.reducer, // The treeReducer slice,  managing tree structure, theme, and highlighting
    },
    // Customizing the middleware to include the RTK Query middleware
    // This middleware handles API caching, automatic refetching, and error handling
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Set up RTK Query listeners for features like refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

// TypeScript type for the root state of the store, which will be used to type-check the global state
export type RootState = ReturnType<typeof store.getState>;

// TypeScript type for the app's dispatch function, ensuring that dispatched actions are correctly typed
export type AppDispatch = typeof store.dispatch;

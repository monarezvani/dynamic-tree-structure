import { TreeData } from "features/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Defining the API slice using RTK Query
export const apiSlice = createApi({
    reducerPath: "fetchTreeData", // The name for the slice in the Redux store, used to store API-related state
    baseQuery: fetchBaseQuery({ baseUrl: "https://ubique.img.ly" }), // Base URL for API requests

    // Defining API endpoints using builder functions
    endpoints: builder => ({
        // Fetch the entire tree data structure
        fetchTreeData: builder.query<TreeData, void>({
            query: () => "/frontend-tha/data.json",
            // Keep cache for one day so it will not fetch data on every re-render
            keepUnusedDataFor: 24 * 3600,
        }),
    }),
});

export const { useFetchTreeDataQuery } = apiSlice;

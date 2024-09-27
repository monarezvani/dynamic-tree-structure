import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITreeNode } from "./types";

// Defining the API slice using RTK Query
export const apiSlice = createApi({
    reducerPath: "fetchTreeData", // The name for the slice in the Redux store, used to store API-related state
    baseQuery: fetchBaseQuery({ baseUrl: "https://ubique.img.ly" }), // Base URL for API requests

    // Defining API endpoints using builder functions
    endpoints: builder => ({
        // Fetch the entire tree data structure
        fetchTreeData: builder.query<ITreeNode[], void>({
            query: () => "/frontend-tha/data.json",
        }),
    }),
});

export const { useFetchTreeDataQuery } = apiSlice;

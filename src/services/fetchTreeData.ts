import { setTree } from "features/treeReducer";
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
            //when query is started, set tree data into state

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; // Wait for the query to be fulfilled
                    dispatch(setTree(data)); // Dispatch the action to set tree data in the store
                } catch (err) {
                    console.error("Failed to fetch tree data", err);
                }
            },
        }),
    }),
});

export const { useFetchTreeDataQuery } = apiSlice;

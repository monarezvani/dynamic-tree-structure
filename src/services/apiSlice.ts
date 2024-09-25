import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "fetchTreeData",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ubique.img.ly" }),
    endpoints: builder => ({
        fetchTreeData: builder.query({
            query: () => "/frontend-tha/data.json",
        }),
        fetchEntryData: builder.query({
            query: (id: number) => `/frontend-tha/entries/${id}.json`,
        }),
    }),
});

export const { useFetchTreeDataQuery, useFetchEntryDataQuery } = apiSlice;

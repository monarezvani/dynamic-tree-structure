import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILeafNode, ITreeNode } from "./types";

export const apiSlice = createApi({
    reducerPath: "fetchTreeData",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ubique.img.ly" }),
    endpoints: builder => ({
        fetchTreeData: builder.query<ITreeNode[], void>({
            query: () => "/frontend-tha/data.json",
        }),
        fetchEntryData: builder.query<ILeafNode, string>({
            query: (id: string) => `/frontend-tha/entries/${id}.json`,
        }),
    }),
});

export const { useFetchTreeDataQuery, useLazyFetchEntryDataQuery } = apiSlice;

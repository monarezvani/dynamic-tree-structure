import { fetchLeafData } from "services/fetchLeafData";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { DefaultTheme, State, Themes } from "./types";

const initialState: State = {
    tree: [],
    theme: DefaultTheme, // Default theme : light
    highlightedTreeNode: null, //Track the currently highlighted tree node(null if none is selected)
    leafData: null,
    leafDataStatus: "idle",
};
// Create a Redux slice using createSlice, which automatically generates action creators and action types
export const treeReducer = createSlice({
    name: "treeSlice",
    initialState,
    reducers: {
        // Reducer to toggle between light and dark themes
        changeTheme: state => {
            state.theme =
                state.theme.background === Themes.light.background ? Themes.dark : Themes.light;
        },
        // Reducer to highlight a specific tree node
        hightlightTreeNode: (state, action) => {
            state.highlightedTreeNode = action.payload;
        },
        // Reducer to set leaf data in state
        setLeafData: (state, action) => {
            state.leafData = action.payload;
        },
    },
    //Based on returned promise given by fetch leaf data redux thunk function, set the state and display a UI based on the status
    extraReducers: builder => {
        builder.addCase(fetchLeafData.pending, state => {
            state.leafDataStatus = "loading";
        });
        builder.addCase(fetchLeafData.fulfilled, (state, action) => {
            state.leafDataStatus = "succeeded";
            state.leafData = action.payload;
        });
        builder.addCase(fetchLeafData.rejected, state => {
            state.leafDataStatus = "failed";
        });
    },
});

// Selector to get the tree data from the Redux state
export const state = (state: RootState) => state.dynamicTree;

export const { changeTheme, hightlightTreeNode, setLeafData } = treeReducer.actions;

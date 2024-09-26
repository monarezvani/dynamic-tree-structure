import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { DefaultTheme, State, Themes } from "./types";

const initialState: State = {
    tree: [],
    theme: DefaultTheme,
    highlightedTreeNode: null,
};

export const treeReducer = createSlice({
    name: "treeSlice",
    initialState,
    reducers: {
        changeTheme: state => {
            state.theme =
                state.theme.background === Themes.light.background ? Themes.dark : Themes.light;
        },
        setTree: (state, action) => {
            state.tree = action.payload;
        },
        hightlightTreeNode: (state, action) => {
            state.highlightedTreeNode = action.payload;
        },
    },
});

export const treeData = (state: RootState) => state.dynamicTree.tree;
export const currentTheme = (state: RootState) => state.dynamicTree.theme;
export const { changeTheme, setTree, hightlightTreeNode } = treeReducer.actions;

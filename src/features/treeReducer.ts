import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { DefaultTheme, Themes } from "./types";

const initialState = {
    tree: [],
    theme: DefaultTheme,
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
    },
});

export const treeData = (state: RootState) => state.dynamicTree.tree;
export const currentTheme = (state: RootState) => state.dynamicTree.theme;
export const { changeTheme, setTree } = treeReducer.actions;

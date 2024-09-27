import { fetchLeafData } from "services/fetchLeafData";
import { addNode, removeNode } from "utils/dragUtils";
import { isNode } from "utils/isNode";
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
        toggleTheme: state => {
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
        setTree: (state, action) => {
            state.tree = action.payload;
        },
        moveNode: (state, action) => {
            const { draggedNode, targetNode } = action.payload;

            // Logic for handling different cases (TreeNode vs LeafNode)
            if (isNode(draggedNode)) {
                // 1. Remove the dragged TreeNode from its current parent
                const updatedTreeData = removeNode([...state.tree], draggedNode.label);

                // 2. Add the dragged TreeNode under the target node
                const finalTreeData = addNode(updatedTreeData, targetNode.label, draggedNode);

                // 3. Update the tree state immutably
                state.tree = finalTreeData;
            } else {
                // 1. Remove the dragged LeafNode from its current parent
                const updatedTreeData = removeNode([...state.tree], draggedNode.id);

                // 2. Add the dragged LeafNode under the target node
                const finalTreeData = addNode(updatedTreeData, targetNode.label, draggedNode);

                // 3. Update the tree state immutably
                state.tree = finalTreeData;

                console.log("New tree structure:", JSON.stringify(state.tree, null, 2));
            }
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

export const { toggleTheme, hightlightTreeNode, setLeafData, setTree, moveNode } =
    treeReducer.actions;

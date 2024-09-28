import React from "react";
import { ReactComponent as FileIcon } from "assets/icons/file.svg";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "features/treeActions";
import { highlightTreeNode } from "features/treeReducer";
import { Leaf } from "features/types";
import { fetchLeafData } from "services/fetchLeafData";
import { moveNode } from "utils/dragUtils";
import { useIsNodeHighlighted } from "utils/isNodeHighlighted";
import { useIsLightTheme } from "utils/useIsLightTheme";
import styles from "./LeafNode.module.css";

interface LeafNodeProps {
    node: Leaf;
}

// Functional component to display additional details about a leaf node
export const LeafNode: React.FC<LeafNodeProps> = ({ node }) => {
    const { highlightedTreeNode } = useAppSelector(state => state.dynamicTree);
    const { isLightTheme } = useIsLightTheme();
    const dispatch = useAppDispatch();
    const { isNodeHighlighted } = useIsNodeHighlighted();

    const handleLeafClick = (node: Leaf) => {
        // Handler for when a tree node is clicked

        // If the clicked node is already highlighted, unhighlight it (second click behavior)

        if (node === highlightedTreeNode) {
            dispatch(highlightTreeNode(null));
        } else {
            dispatch(highlightTreeNode(node)); // Highlight the clicked node
        }

        // If the node has no children and has an ID, fetch its leaf data
        if (node.id) {
            dispatch(fetchLeafData(node.id));
        }
    };

    //  This event is fired when the user starts dragging a leaf

    const handleDragStart = (event: React.DragEvent, node: Leaf) => {
        event.stopPropagation();
        event.dataTransfer.setData("node", JSON.stringify(node)); // Only pass the current leaf
    };

    // This event is fired when leaf node is dropped on a target node

    const handleDrop = (event: React.DragEvent, targetNode: Leaf) => {
        event.preventDefault();
        event.stopPropagation();
        const draggedNode = JSON.parse(event.dataTransfer.getData("node")) as Leaf;
        moveNode(dispatch, draggedNode, targetNode);
    };

    return (
        <li
            key={node.id}
            draggable
            onDrop={event => handleDrop(event, node)}
            onDragStart={event => handleDragStart(event, node)}
            onDragOver={event => event.preventDefault()} // Allow dropping
        >
            <div
                className={clsx(styles.leafNode, {
                    [styles.lightThemeHighlighted]: isNodeHighlighted(node) && isLightTheme,
                    [styles.darkThemeHighlighted]: isNodeHighlighted(node) && !isLightTheme,
                    [styles.notHighlighted]: !isNodeHighlighted(node),
                })}
                onClick={() => handleLeafClick(node)}>
                {/*  Display a file icon For Leaf nodes */}
                <>
                    <FileIcon width={20} />
                    <p
                        className={clsx(styles.title, {
                            [styles.darkTitle]: !isLightTheme && !isNodeHighlighted(node),
                            [styles.darkHighlightedTitle]: !isLightTheme && isNodeHighlighted(node),
                        })}>
                        {node.label}
                    </p>
                </>
            </div>
        </li>
    );
};

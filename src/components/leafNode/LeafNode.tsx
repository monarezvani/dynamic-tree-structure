import React from "react";
import { ReactComponent as FileIcon } from "assets/icons/file.svg";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "features/treeActions";
import { hightlightTreeNode } from "features/treeReducer";
import { fetchLeafData } from "services/fetchLeafData";
import { ITreeNode } from "services/types";
import { useIsNodeHighlighted } from "utils/isNodeHighlighted";
import styles from "./LeafNode.module.css";

interface LeafNodeProps {
    node: ITreeNode;
}

// Functional component to display additional details about a leaf node
export const LeafNode: React.FC<LeafNodeProps> = ({ node }) => {
    const { highlightedTreeNode } = useAppSelector(state => state.dynamicTree);
    const dispatch = useAppDispatch();

    const { isNodeHighlighted } = useIsNodeHighlighted();

    const handleLeafClick = (node: ITreeNode) => {
        // Handler for when a tree node is clicked

        // If the clicked node is already highlighted, unhighlight it (second click behavior)

        if (node === highlightedTreeNode) {
            dispatch(hightlightTreeNode(null));
        } else {
            dispatch(hightlightTreeNode(node)); // Highlight the clicked node
        }

        // If the node has no children and has an ID, fetch its leaf data
        if (node.id) {
            dispatch(fetchLeafData(node.id));
        }
    };

    return (
        <li key={node.id ?? node.label}>
            <div
                className={clsx(styles.leafNode, {
                    [styles.active]: isNodeHighlighted(node), // Apply "active" style if the node is highlighted
                    [styles.notActive]: !isNodeHighlighted(node),
                })}
                onClick={() => handleLeafClick(node)}>
                {/*  Display a folder icon For Tree nodes */}
                <>
                    <FileIcon width={20} />
                    <p className={styles.title}>{node.label}</p>
                </>
            </div>
        </li>
    );
};

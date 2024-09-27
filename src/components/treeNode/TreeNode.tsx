import React from "react";
import { ReactComponent as FolderIcon } from "assets/icons/folder.svg";
import clsx from "clsx";
import { NestedTreeNodes } from "components/nestedTreeNodes/NestedTreeNodes";
import { useAppDispatch, useAppSelector } from "features/treeActions";
import { hightlightTreeNode } from "features/treeReducer";
import { ITreeNode } from "services/types";
import { useIsNodeHighlighted } from "utils/isNodeHighlighted";
import styles from "./TreeNode.module.css";

interface TreeNodeProps {
    node: ITreeNode; // The current tree node data
}

// Functional component for rendering a tree node
export const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
    const { isNodeHighlighted } = useIsNodeHighlighted();
    // Get the currently highlighted tree node from the Redux state
    const { highlightedTreeNode } = useAppSelector(state => state.dynamicTree);
    const dispatch = useAppDispatch();

    // Handler for when a tree node is clicked
    const handleNodeClick = (node: ITreeNode) => {
        // If the clicked node is already highlighted, unhighlight it (second click behavior)

        if (node === highlightedTreeNode) {
            dispatch(hightlightTreeNode(null));
        } else {
            dispatch(hightlightTreeNode(node)); // Highlight the clicked node
        }
    };

    return (
        <li key={node.id ?? node.label}>
            <div
                className={clsx(styles.treeNode, {
                    [styles.active]: isNodeHighlighted(node), // Apply "active" style if the node is highlighted
                    [styles.notActive]: !isNodeHighlighted(node),
                })}
                onClick={() => handleNodeClick(node)}>
                {/*  Display a folder icon For Tree nodes */}
                <FolderIcon width={30} height={50} />
                <p className={styles.treeNodeTitle}>{node.label}</p>
            </div>
            {/* If the node has children, render them as child TreeNode components with indentation */}
            {node.children && (
                <div style={{ marginLeft: 80 }}>
                    {node.children.map(child => (
                        <NestedTreeNodes
                            key={child.id ?? child.label} // Ensure unique key for each child node
                            node={child}
                        />
                    ))}
                </div>
            )}
        </li>
    );
};

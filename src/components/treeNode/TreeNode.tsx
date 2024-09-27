import React from "react";
import { ReactComponent as FolderIcon } from "assets/icons/folder.svg";
import clsx from "clsx";
import { NestedTreeNodes } from "components/nestedTreeNodes/NestedTreeNodes";
import { useAppDispatch, useAppSelector } from "features/treeActions";
import { hightlightTreeNode, moveNode } from "features/treeReducer";
import { Node } from "features/types";
import { isNode } from "utils/isNode";
import { useIsNodeHighlighted } from "utils/isNodeHighlighted";
import { useIsLightTheme } from "utils/useIsLightTheme";
import styles from "./TreeNode.module.css";

interface TreeNodeProps {
    node: Node; // The current tree node data
}

// Functional component for rendering a tree node
export const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
    const { isNodeHighlighted } = useIsNodeHighlighted();
    const { isLightTheme } = useIsLightTheme();
    // Get the currently highlighted tree node from the Redux state
    const { highlightedTreeNode } = useAppSelector(state => state.dynamicTree);
    const dispatch = useAppDispatch();

    // Handler for when a tree node is clicked
    const handleNodeClick = (node: Node) => {
        // If the clicked node is already highlighted, unhighlight it (second click behavior)

        if (node === highlightedTreeNode) {
            dispatch(hightlightTreeNode(null));
        } else {
            dispatch(hightlightTreeNode(node)); // Highlight the clicked node
        }
    };

    //  This event is fired when the user starts dragging a node
    const handleDragStart = (event: React.DragEvent, node: Node) => {
        event.stopPropagation();
        event.dataTransfer.setData("node", JSON.stringify(node));
    };

    //This event is fired when node is dropped on a target node
    const handleDrop = (event: React.DragEvent, targetNode: Node) => {
        event.preventDefault();
        event.stopPropagation();
        const draggedNode = JSON.parse(event.dataTransfer.getData("node"));
        dispatch(moveNode({ draggedNode, targetNode }));
    };

    return (
        <li
            key={node.label}
            draggable
            onDragStart={event => handleDragStart(event, node)}
            onDrop={event => handleDrop(event, node)}
            onDragOver={event => event.preventDefault()}>
            <div
                className={clsx(styles.treeNode, {
                    [styles.lightThemeactive]: isNodeHighlighted(node) && isLightTheme,
                    [styles.darkThemeHighlighted]: isNodeHighlighted(node) && !isLightTheme,
                    [styles.notHighlighted]: !isNodeHighlighted(node),
                })}
                onClick={() => handleNodeClick(node)} // Highlight the node on click
            >
                <FolderIcon width={30} height={50} />
                <p
                    className={clsx(styles.treeNodeTitle, {
                        [styles.darkTitle]: !isLightTheme && !isNodeHighlighted(node),
                        [styles.darkHightlightedTitle]: !isLightTheme && isNodeHighlighted(node),
                    })}>
                    {node.label}
                </p>
            </div>
            {/* If the node has children, render them as child TreeNode components with indentation */}
            {isNode(node) &&
                node.children && ( // Only check children if it's a Node
                    <div style={{ marginLeft: 80 }}>
                        <ul>
                            {node.children.map(child => (
                                <NestedTreeNodes key={child.label} node={child} />
                            ))}
                        </ul>
                    </div>
                )}
        </li>
    );
};

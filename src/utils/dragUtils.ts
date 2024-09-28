import { AppDispatch } from "features/store";
import { Leaf, Node, TreeData } from "features/types";
import { apiSlice } from "services/fetchTreeData";
import { isNode } from "./isNode";

// Helper function to remove a node (Node or Leaf) from its parent's children
export const removeNode = (nodes: TreeData, nodeId: string): TreeData => {
    return nodes
        .map(node => {
            if (isNode(node)) {
                // Recursively traverse the children to remove the node or leaf
                return {
                    ...node,
                    children: removeNode(node.children, nodeId), // Recursively check children
                };
            }
            return node;
        })
        .filter(node => {
            // Remove the specific node (whether it's a Leaf or a Node)
            // Leaves are checked by id, Nodes by label
            if ("id" in node) {
                return node.id !== nodeId; // Correctly remove a Leaf node based on id
            } else if ("label" in node) {
                return node.label !== nodeId; // Correctly remove a Node based on label
            }
            return true;
        });
};

// Add a node (or leaf) to the target node's children
export const addNode = (
    nodes: TreeData,
    targetNodeId: string,
    nodeToAdd: Node | Leaf
): TreeData => {
    return nodes.map(node => {
        if (isNode(node) && node.label === targetNodeId) {
            // Add the dragged node to the target node's children
            return {
                ...node,
                children: [...(node.children || []), nodeToAdd],
            };
        }
        if (isNode(node)) {
            // Recursively traverse and add the node in the correct place
            return {
                ...node,
                children: addNode(node.children, targetNodeId, nodeToAdd),
            };
        }
        return node; // If it's a leaf, return as-is
    });
};

export const moveNode = (
    dispatch: AppDispatch,
    draggedNode: Node | Leaf,
    targetNode: Node | Leaf
) => {
    // When dispatched,  immediately updates the tree data in state (manually update the cache data)
    //
    dispatch(
        apiSlice.util.updateQueryData("fetchTreeData", undefined, (draft: TreeData) => {
            // Logic for handling different cases (TreeNode vs LeafNode)
            if (isNode(draggedNode)) {
                // 1. Remove the dragged TreeNode from its current parent
                const updatedTreeData = removeNode(draft, draggedNode.label);

                // 2. Add the dragged TreeNode under the target node
                const finalTreeData = addNode(updatedTreeData, targetNode.label, draggedNode);

                // 3. Update the tree state immutably
                return finalTreeData;
            } else {
                // 1. Remove the dragged LeafNode from its current parent
                const updatedTreeData = removeNode(draft, draggedNode.id);

                // 2. Add the dragged LeafNode under the target node
                const finalTreeData = addNode(updatedTreeData, targetNode.label, draggedNode);

                console.log("New tree structure:", JSON.stringify(finalTreeData, null, 2));

                // 3. Update the tree state immutably
                return finalTreeData;
            }
        })
    );
};

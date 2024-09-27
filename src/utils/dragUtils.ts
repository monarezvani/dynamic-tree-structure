import { Leaf, Node, TreeData } from "features/types";
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
            // Leaf nodes are checked by id, Nodes by label
            return (
                ("id" in node && node.id !== nodeId) || ("label" in node && node.label !== nodeId)
            );
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

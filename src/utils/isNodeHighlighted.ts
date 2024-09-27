import { useAppSelector } from "features/treeActions";
import { Leaf, Node } from "features/types";

//  This function checks whether the selected node or its children are highlighted
export const useIsNodeHighlighted = () => {
    // Get the currently highlighted tree node from the Redux state
    const { highlightedTreeNode } = useAppSelector(state => state.dynamicTree);

    const isNodeHighlighted = (node: Leaf | Node) => {
        if (!highlightedTreeNode) return false;

        const highlightCondition = (current: Leaf | Node): boolean => {
            // Checks if the current node or any of the current node's children match the condition using recursion.

            if (current === node) return true;

            // If the current node is a `Node`, check its children
            if ("children" in current && current.children) {
                return current.children.some(highlightCondition);
            }

            // If it's a `Leaf`, return false (no children to check)
            return false;
        };

        return highlightCondition(highlightedTreeNode); // Returns true if the node or its children are highlighted
    };

    return { isNodeHighlighted };
};

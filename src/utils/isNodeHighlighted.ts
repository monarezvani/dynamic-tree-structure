import { useAppSelector } from "features/treeActions";
import { ITreeNode } from "services/types";

//  This function checks whether the selected node or its children are highlighted
export const useIsNodeHighlighted = () => {
    // Get the currently highlighted tree node from the Redux state
    const { highlightedTreeNode } = useAppSelector(state => state.dynamicTree);

    const isNodeHighlighted = (node: ITreeNode) => {
        if (!highlightedTreeNode) return false;

        const highlightCondition = (current: ITreeNode | undefined): boolean => {
            // Checks if the current node or any of the current node's children match the condition using recursion.
            return current === node || (current?.children?.some(highlightCondition) ?? false);
        };

        return highlightCondition(highlightedTreeNode); // Returns true if the node or its children are highlighted
    };

    return { isNodeHighlighted };
};

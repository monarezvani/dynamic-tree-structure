import React from "react";
import { LeafNode } from "components/leafNode/LeafNode";
import { Loading } from "components/loading/Loading";
import { NotFound } from "components/notFound/NotFound";
import { TreeNode } from "components/treeNode/TreeNode";
import { useAppDispatch, useAppSelector } from "features/treeActions";
import { hightlightTreeNode } from "features/treeReducer";
import { useFetchTreeDataQuery, useLazyFetchEntryDataQuery } from "services/apiSlice";
import { ITreeNode } from "services/types";

export const Tree = () => {
    const {
        data: treeNodeData,
        error: treeNodeError,
        isLoading: isTreeNodeLoading,
    } = useFetchTreeDataQuery();

    const [
        trigger,
        { data: leafNodeData, isLoading: isLeafNodeLoading, isError: isLeafNodeError },
    ] = useLazyFetchEntryDataQuery();

    const { highlightedTreeNode } = useAppSelector(state => state.dynamicTree);
    const dispatch = useAppDispatch();

    if (treeNodeError) {
        throw new Error("Something went wrong! try again");
    }

    const isNodeHighlighted = (node: ITreeNode): boolean => {
        if (!highlightedTreeNode) return false;

        const highlightCondition = (current: ITreeNode | undefined): boolean => {
            //This checks if the current node or any of the current node's children match the condition using recursion.
            return current === node || (current?.children?.some(highlightCondition) ?? false);
        };

        return highlightCondition(highlightedTreeNode);
    };

    console.log(highlightedTreeNode);
    const handleNodeClick = (node: ITreeNode) => {
        if (node === highlightedTreeNode) {
            dispatch(hightlightTreeNode(null));
        } else {
            dispatch(hightlightTreeNode(node));
        }

        if (!node.children && node.id) {
            trigger(node.id);
        }
    };

    return (
        <>
            {isTreeNodeLoading || isLeafNodeLoading ? (
                <Loading />
            ) : (
                <>
                    {treeNodeData?.map((node: any) => (
                        <TreeNode
                            onClick={handleNodeClick}
                            key={node.id || node.label}
                            node={node}
                            isNodeHighlighted={isNodeHighlighted}
                        />
                    ))}
                    {isLeafNodeError && <NotFound />}
                    {leafNodeData && <LeafNode leafNodeData={leafNodeData} />}
                </>
            )}
        </>
    );
};

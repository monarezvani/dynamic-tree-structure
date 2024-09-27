import React from "react";
import { LeafNode } from "components/leafNode/LeafNode";
import { TreeNode } from "components/treeNode/TreeNode";
import { ITreeNode } from "services/types";

interface NestedTreeNodesProps {
    node: ITreeNode;
}
export const NestedTreeNodes: React.FC<NestedTreeNodesProps> = ({ node }) => {
    if (node.children && node.children.length !== 0) {
        return <TreeNode node={node} />;
    } else {
        return <LeafNode node={node} />;
    }
};

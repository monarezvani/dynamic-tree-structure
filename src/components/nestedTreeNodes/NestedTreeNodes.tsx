import React from "react";
import { LeafNode } from "components/leafNode/LeafNode";
import { TreeNode } from "components/treeNode/TreeNode";
import { Leaf, Node } from "features/types";
import { isNode } from "utils/isNode";

interface NestedTreeNodesProps {
    node: Node | Leaf;
}
export const NestedTreeNodes: React.FC<NestedTreeNodesProps> = ({ node }) => {
    if (isNode(node)) {
        return <TreeNode node={node} key={node.label} />;
    } else {
        return <LeafNode node={node} key={node.id} />;
    }
};

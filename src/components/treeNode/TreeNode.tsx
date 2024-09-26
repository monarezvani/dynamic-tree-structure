import React from "react";
import { ITreeNode } from "services/types";

interface TreeNodeProps {
    node: ITreeNode;
    onClick: (node: ITreeNode) => void;
    isNodeHighlighted: (node: ITreeNode) => boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node, onClick, isNodeHighlighted }) => {
    return (
        <div key={node.id || node.label}>
            <div
                style={{
                    cursor: "pointer",
                    backgroundColor: isNodeHighlighted(node) ? "lightblue" : "transparent",
                }}
                onClick={() => onClick(node)}>
                {node.label}
            </div>
            {node.children && (
                <div style={{ marginLeft: 20 }}>
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id || child.label}
                            node={child}
                            onClick={onClick}
                            isNodeHighlighted={isNodeHighlighted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

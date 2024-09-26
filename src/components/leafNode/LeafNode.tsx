import React from "react";
import { ILeafNode } from "services/types";

interface LeafNodeProps {
    leafNodeData: ILeafNode;
}

export const LeafNode: React.FC<LeafNodeProps> = ({ leafNodeData }) => {
    return (
        <div>
            <h3>Additional Data</h3>
            {leafNodeData.label}
        </div>
    );
};

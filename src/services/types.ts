export interface ITreeNode {
    label: string;
    children?: ITreeNode[];
    id?: string;
}

export interface ILeafNode {
    createdAt: Date;
    createdBy: string;
    description: string;
    id: string;
    lastModifiedAt: Date;
    lastModifiedBy: string;
}

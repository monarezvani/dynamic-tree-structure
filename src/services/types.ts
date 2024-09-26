export interface ITreeNode {
    label: string;
    children?: ITreeNode[];
    id?: string;
}

export interface ILeafNode {
    label: string;
    id: string;
}

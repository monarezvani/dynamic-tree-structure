export type TreeData = Array<Node | Leaf>;

export interface Node {
    label: string;
    children: Array<Node | Leaf>;
}

export interface LeafInfo {
    createdAt: Date;
    createdBy: string;
    description: string;
    id: string;
    lastModifiedAt: Date;
    lastModifiedBy: string;
}

export interface Leaf {
    id: string;
    label: string;
}

export interface Theme {
    foreground: string;
    background: string;
}

export const Themes: Record<string, Theme> = {
    light: {
        foreground: "#333333",
        background: "#ffffff",
    },
    dark: {
        foreground: "#ffffff",
        background: "#00000",
    },
};

export const DefaultTheme = {
    foreground: "#333333",
    background: "#ffffff",
};

export interface State {
    tree: TreeData;
    theme: Theme;
    highlightedTreeNode: Leaf | Node | null;
    leafData: LeafInfo | null;
    leafDataStatus: "idle" | "loading" | "succeeded" | "failed";
}

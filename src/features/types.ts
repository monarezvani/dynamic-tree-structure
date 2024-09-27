const root = document.documentElement;

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
        foreground: getComputedStyle(root).getPropertyValue("--light-gray"),
        background: getComputedStyle(root).getPropertyValue("--white"),
    },
    dark: {
        foreground: getComputedStyle(root).getPropertyValue("--white"),
        background: getComputedStyle(root).getPropertyValue("--dark-gray"),
    },
};

export const DefaultTheme = {
    foreground: getComputedStyle(root).getPropertyValue("--light-gray"),
    background: getComputedStyle(root).getPropertyValue("--white"),
};

export interface State {
    tree: TreeData;
    theme: Theme;
    highlightedTreeNode: Leaf | Node | null;
    leafData: LeafInfo | null;
    leafDataStatus: "idle" | "loading" | "succeeded" | "failed";
}

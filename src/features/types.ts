import { ILeafNode, ITreeNode } from "services/types";

const root = document.documentElement;

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
    tree: ITreeNode[];
    theme: Theme;
    highlightedTreeNode: ITreeNode | null;
    leafData: ILeafNode | null;
    leafDataStatus: "idle" | "loading" | "succeeded" | "failed";
}

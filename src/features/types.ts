import { ITreeNode } from "services/types";

const root = document.documentElement;

export interface Theme {
    foreground: string;
    background: string;
}

export const Themes: Record<string, Theme> = {
    light: {
        foreground: getComputedStyle(root).getPropertyValue("--light-foreground"),
        background: getComputedStyle(root).getPropertyValue("--light-background"),
    },
    dark: {
        foreground: getComputedStyle(root).getPropertyValue("--dark-foreground"),
        background: getComputedStyle(root).getPropertyValue("--dark-background"),
    },
};

export const DefaultTheme = {
    foreground: getComputedStyle(root).getPropertyValue("--light-foreground"),
    background: getComputedStyle(root).getPropertyValue("--light-background"),
};

export interface State {
    tree: ITreeNode[];
    theme: Theme;
    highlightedTreeNode: ITreeNode | null;
}

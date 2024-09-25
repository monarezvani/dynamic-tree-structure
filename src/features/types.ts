const root = document.documentElement;

export interface ITheme {
    foreground: string;
    background: string;
}

export const Themes: Record<string, ITheme> = {
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

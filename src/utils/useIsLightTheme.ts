import { useMemo } from "react";
import { useAppSelector } from "features/treeActions";
import { Themes } from "features/types";

export const useIsLightTheme = () => {
    const { theme } = useAppSelector(state => state.dynamicTree);

    return {
        isLightTheme: useMemo(() => {
            return theme.background === Themes.light.background;
        }, [theme.background]),
    };
};

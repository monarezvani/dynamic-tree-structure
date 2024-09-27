import React from "react";
import { ReactComponent as DarkIcon } from "assets/icons/moon.svg";
import { ReactComponent as LightIcon } from "assets/icons/sun.svg";
import { useAppDispatch, useAppSelector } from "features/treeActions";
import { toggleTheme } from "features/treeReducer";
import { Themes } from "features/types";
import styles from "./ToggledThemeButton.module.css";

export const ToggledThemeButton = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.dynamicTree);

    return (
        <button onClick={() => dispatch(toggleTheme())} className={styles.button}>
            {theme.background === Themes.light.background ? (
                <DarkIcon width={20} height={20} />
            ) : (
                <LightIcon width={20} height={20} />
            )}
        </button>
    );
};

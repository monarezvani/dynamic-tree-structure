import clsx from "clsx";
import { ToggledThemeButton } from "components/toggledThemeButton/ToggledThemeButton";
import { Tree } from "components/tree/Tree";
import { useIsLightTheme } from "utils/useIsLightTheme";
import styles from "./App.module.css";
import "./assets/global.css";

function App() {
    const { isLightTheme } = useIsLightTheme();
    return (
        // <div style={{ backgroundColor: theme.background, color: theme.foreground }}>
        <div>
            <nav
                className={clsx(styles.navbar, {
                    [styles.lightNav]: isLightTheme,
                    [styles.darkNav]: !isLightTheme,
                })}>
                <ToggledThemeButton />
            </nav>
            <Tree />
        </div>
    );
}

export default App;

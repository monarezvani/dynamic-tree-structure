import clsx from "clsx";
import { ToggledThemeButton } from "components/toggledThemeButton/ToggledThemeButton";
import { Tree } from "components/tree/Tree";
import { useAppSelector } from "features/treeActions";
import { Themes } from "features/types";
import { useIsLightTheme } from "utils/useIsLightTheme";
import styles from "./App.module.css";
import "./assets/global.css";

function App() {
    const { theme } = useAppSelector(state => state.dynamicTree);
    const { isLightTheme } = useIsLightTheme();
    console.log(isLightTheme, "i apppppppppppppppppps");
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

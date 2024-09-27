import clsx from "clsx";
import { AdditionalLeafInfo } from "components/additionalLeafData/AdditionalLeafInfo";
import { Loading } from "components/loading/Loading";
import { NestedTreeNodes } from "components/nestedTreeNodes/NestedTreeNodes";
import { NotFound } from "components/notFound/NotFound";
import { ToggledThemeButton } from "components/toggledThemeButton/ToggledThemeButton";
import { useAppSelector } from "features/treeActions";
import { Themes } from "features/types";
import { useFetchTreeDataQuery } from "services/fetchTreeData";
import styles from "./Tree.module.css";

export const Tree = () => {
    const { error: treeNodeError, isLoading: isTreeNodeLoading } = useFetchTreeDataQuery();

    //Get states
    const { leafData, leafDataStatus, tree, theme } = useAppSelector(state => state.dynamicTree);

    if (treeNodeError) {
        throw new Error("Something went wrong! try again");
    }

    return (
        <>
            {isTreeNodeLoading || leafDataStatus === "loading" ? (
                <Loading /> // Display loading spinner while fetching either tree or leaf node data
            ) : (
                <div
                    className={clsx(styles.container, {
                        [styles.lightTreeTheme]: theme.background === Themes.light.background,
                        [styles.darkTreeTheme]: theme.background === Themes.dark.background,
                    })}>
                    <ul className={styles.treeContainer}>
                        {tree?.map(node => <NestedTreeNodes node={node} key={node.label} />)}
                    </ul>
                    <div className={styles.additionalLeafInfoContainer}>
                        {leafDataStatus === "failed" ? (
                            <NotFound /> // Show "NotFound" component if there's an error fetching the leaf node data
                        ) : (
                            // Display additional leaf data besides the Tree
                            <>{leafData && <AdditionalLeafInfo />}</>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

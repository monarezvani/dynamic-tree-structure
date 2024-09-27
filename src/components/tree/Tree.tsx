import { AdditionalLeafInfo } from "components/additionalLeafData/AdditionalLeafInfo";
import { Loading } from "components/loading/Loading";
import { NestedTreeNodes } from "components/nestedTreeNodes/NestedTreeNodes";
import { NotFound } from "components/notFound/NotFound";
import { useAppSelector } from "features/treeActions";
import { useFetchTreeDataQuery } from "services/fetchTreeData";
import styles from "./Tree.module.css";

export const Tree = () => {
    const { error: treeNodeError, isLoading: isTreeNodeLoading } = useFetchTreeDataQuery();

    //Get states
    const { leafData, leafDataStatus, tree } = useAppSelector(state => state.dynamicTree);

    if (treeNodeError) {
        throw new Error("Something went wrong! try again");
    }

    return (
        <>
            {isTreeNodeLoading || leafDataStatus === "loading" ? (
                <Loading /> // Display loading spinner while fetching either tree or leaf node data
            ) : (
                <div className={styles.container}>
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

import { AdditionalLeafInfo } from "components/additionalLeafData/AdditionalLeafInfo";
import { Loading } from "components/loading/Loading";
import { NestedTreeNodes } from "components/nestedTreeNodes/NestedTreeNodes";
import { NotFound } from "components/notFound/NotFound";
import { useAppSelector } from "features/treeActions";
import { useFetchTreeDataQuery } from "services/fetchTreeDataSlice";
import styles from "./Tree.module.css";

export const Tree = () => {
    // Fetch the tree data using RTK Query hook
    const {
        data: treeNodeData,
        error: treeNodeError,
        isLoading: isTreeNodeLoading,
    } = useFetchTreeDataQuery();

    //Get leaf data and leaf status from State
    const { leafData, leafDataStatus } = useAppSelector(state => state.dynamicTree);

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
                        {treeNodeData?.map(node => <NestedTreeNodes node={node} />)}
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

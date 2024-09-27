import React from "react";
import { useAppSelector } from "features/treeActions";
import styles from "./AdditionalLeafInfo.module.css";

export const AdditionalLeafInfo = () => {
    const { leafData } = useAppSelector(state => state.dynamicTree);

    return (
        <div className={styles.container}>
            {leafData && (
                <>
                    <p className={styles.title}>Additional Data</p>
                    <p>Id:</p>
                    <p> {leafData.id}</p>
                    <p>Created at:</p>
                    <p>{leafData.createdAt.toString()}</p>
                    <p>Description</p>
                    <p>{leafData.description}</p>
                    <p>Created by:</p>
                    <p>{leafData.createdBy}</p>
                </>
            )}
        </div>
    );
};

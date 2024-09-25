import styles from "./Loading.module.css";

export const Loading = () => {
    return (
        <div className={styles.LoadingContainer}>
            <div className={styles.Loading} />
        </div>
    );
};

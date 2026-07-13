import styles from "./TabBar.module.css";

export function TabBar({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tabBar}>{children}</div>
      </div>
    </div>
  );
}

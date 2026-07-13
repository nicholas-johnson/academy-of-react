import styles from "./Tab.module.css";

export function Tab({ value, activeTab, onTabChange, children }) {
  const active = value === activeTab;
  
  return (
    <button
      className={`${styles.tab} ${active ? styles.active : ""}`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
}

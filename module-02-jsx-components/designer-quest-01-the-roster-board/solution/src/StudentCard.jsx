/* ⚙️ ENGINE CODE — this component is already built for you.
   It takes student data and renders a styled card.
   You don't need to change anything in this file! */

import styles from "./StudentCard.module.css";

function StudentCard({ name, house, level, motto }) {
  const houseClass = house.toLowerCase();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.name}>{name}</h3>
        <span className={`${styles.badge} ${styles[houseClass]}`}>
          {house}
        </span>
      </div>

      <div className={styles.levelSection}>
        <div className={styles.levelLabel}>
          <span>Level</span>
          <span className={styles.levelValue}>{level}</span>
        </div>
        <div className={styles.levelBar}>
          <div
            className={styles.levelFill}
            style={{ width: `${level}%` }}
          />
        </div>
      </div>

      <p className={styles.motto}>"{motto}"</p>
    </div>
  );
}

export default StudentCard;

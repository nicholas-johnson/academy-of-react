import styles from "./SpellCardModules.module.css";

function SpellCardModules({ spell }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{spell.name}</h3>
      <span className={styles.badge}>{spell.element}</span>
      <div className={styles.powerBar}>
        <div
          className={styles.powerFill}
          style={{ width: `${spell.power}%` }}
        />
      </div>
      <p className={styles.description}>{spell.description}</p>
    </div>
  );
}

export default SpellCardModules;

import styles from "./HouseBadge.module.css";

function HouseBadge({ house, selected, onClick }) {
  // Convert house name to lowercase for CSS class lookup
  const houseClass = house.toLowerCase();

  // Combine classes: base badge + house-specific + optional selected
  const className = `
    ${styles.badge} 
    ${styles[houseClass]} 
    ${selected ? styles.selected : ""}
  `.trim();

  return (
    <button className={className} onClick={onClick}>
      <span className={styles.name}>{house}</span>
      {selected && <span className={styles.checkmark}>Selected</span>}
    </button>
  );
}

export default HouseBadge;

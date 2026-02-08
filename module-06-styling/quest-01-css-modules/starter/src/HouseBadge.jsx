// TODO: Import your CSS Module
// import styles from './HouseBadge.module.css'

function HouseBadge({ house, selected, onClick }) {
  // TODO: Create the badge component using CSS Modules
  //
  // Requirements:
  // 1. Import styles from HouseBadge.module.css
  // 2. Apply the base .badge class
  // 3. Apply the house-specific class (e.g., styles.phoenix for Phoenix)
  // 4. Apply styles.selected when the selected prop is true
  // 5. Display the house name

  return (
    <button onClick={onClick}>
      <span>{house}</span>
      {/* TODO: Style this with CSS Modules */}
    </button>
  );
}

export default HouseBadge;

import styles from "./TextInput.module.css";

function TextInput() {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="wizard-name">
        Wizard Name
      </label>
      <input
        className={styles.input}
        type="text"
        id="wizard-name"
        placeholder="Enter your name..."
      />
    </div>
  );
}

export default TextInput;

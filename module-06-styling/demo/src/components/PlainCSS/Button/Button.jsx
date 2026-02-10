import "./Button.css";

export function Button({ variant = "primary", children, onClick }) {
  return (
    <button className={`button button-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

/* ⚙️ ENGINE CODE — you don't need to read this */
import "./components.css";

function Card({ children, variant = "default" }) {
  return <div className={`card card--${variant}`}>{children}</div>;
}

export default Card;

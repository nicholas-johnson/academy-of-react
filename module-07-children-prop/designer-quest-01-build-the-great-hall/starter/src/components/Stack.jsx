/* ⚙️ ENGINE CODE — you don't need to read this */
import "./components.css";

function Stack({ children, direction = "vertical", gap = "1rem" }) {
  return (
    <div
      className={`stack stack--${direction}`}
      style={{ gap }}
    >
      {children}
    </div>
  );
}

export default Stack;

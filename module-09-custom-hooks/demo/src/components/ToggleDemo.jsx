import { useToggle } from "../hooks";

export function ToggleDemo() {
  const [isVisible, toggleVisible] = useToggle(true);

  return (
    <div className="demo-section">
      <h3>2. useToggle</h3>
      <button onClick={toggleVisible} className="btn">
        Toggle Visibility
      </button>
      {isVisible && (
        <div className="message-box">
          Hello! I can be toggled on and off.
        </div>
      )}
    </div>
  );
}

import { useWindowSize } from "../hooks";

export function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="demo-section">
      <h3>1. useWindowSize</h3>
      <div className="stat-display">
        <div>
          Width: <strong>{width}px</strong>
        </div>
        <div>
          Height: <strong>{height}px</strong>
        </div>
      </div>
      <p className="hint">Try resizing your window!</p>
    </div>
  );
}

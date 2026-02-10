import "./TabBar.css";

export function TabBar({ children }) {
  return (
    <div className="tabbar-container">
      <div className="tabbar-wrapper">
        <div className="tabbar">{children}</div>
      </div>
    </div>
  );
}

import "./Tab.css";

export function Tab({ value, activeTab, onTabChange, children }) {
  const active = value === activeTab;
  
  return (
    <button
      className={`tab ${active ? "tab-active" : ""}`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
}

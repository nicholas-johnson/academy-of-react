export function TabNav({ activeTab, onTabChange }) {
  return (
    <nav className="tabs">
      <button
        className={activeTab === "zustand" ? "tab active" : "tab"}
        onClick={() => onTabChange("zustand")}
      >
        Zustand
      </button>
      <button
        className={activeTab === "redux" ? "tab active" : "tab"}
        onClick={() => onTabChange("redux")}
      >
        Redux Toolkit
      </button>
      <button
        className={activeTab === "mobx" ? "tab active" : "tab"}
        onClick={() => onTabChange("mobx")}
      >
        MobX
      </button>
    </nav>
  );
}

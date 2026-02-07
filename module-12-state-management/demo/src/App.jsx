import { useState } from "react";
import { ZustandDemo } from "./stores/zustandStore";
import { ReduxDemo } from "./stores/reduxStore";
import { MobXDemo } from "./stores/mobxStore";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("zustand");

  return (
    <div className="app">
      <header className="header">
        <h1>📦 State Management Libraries</h1>
        <p>Compare Zustand, Redux Toolkit, and MobX</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "zustand" ? "tab active" : "tab"}
          onClick={() => setActiveTab("zustand")}
        >
          🐻 Zustand
        </button>
        <button
          className={activeTab === "redux" ? "tab active" : "tab"}
          onClick={() => setActiveTab("redux")}
        >
          🔮 Redux Toolkit
        </button>
        <button
          className={activeTab === "mobx" ? "tab active" : "tab"}
          onClick={() => setActiveTab("mobx")}
        >
          👁️ MobX
        </button>
      </nav>

      <main className="main">
        {activeTab === "zustand" && <ZustandDemo />}
        {activeTab === "redux" && <ReduxDemo />}
        {activeTab === "mobx" && <MobXDemo />}
      </main>

      <footer className="footer">
        <div className="comparison">
          <div className="compare-item">
            <h4>🐻 Zustand</h4>
            <ul>
              <li>~1KB bundle</li>
              <li>No provider needed</li>
              <li>Minimal boilerplate</li>
            </ul>
          </div>
          <div className="compare-item">
            <h4>🔮 Redux Toolkit</h4>
            <ul>
              <li>~11KB bundle</li>
              <li>Excellent DevTools</li>
              <li>Industry standard</li>
            </ul>
          </div>
          <div className="compare-item">
            <h4>👁️ MobX</h4>
            <ul>
              <li>~16KB bundle</li>
              <li>Auto-tracking</li>
              <li>Computed values</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

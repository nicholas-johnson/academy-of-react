import { useState } from "react";
import { TabNav } from "./components/TabNav";
import { ZustandDemo } from "./zustand/ZustandDemo";
import { ReduxDemo } from "./redux/ReduxDemo";
import { MobXDemo } from "./mobx/MobXDemo";
import { LibraryComparison } from "./components/LibraryComparison";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("zustand");

  return (
    <div className="app">
      <header className="header">
        <h1>State Management Libraries</h1>
        <p>Compare Zustand, Redux Toolkit, and MobX</p>
      </header>

      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main">
        {activeTab === "zustand" && <ZustandDemo />}
        {activeTab === "redux" && <ReduxDemo />}
        {activeTab === "mobx" && <MobXDemo />}
      </main>

      <footer className="footer">
        <LibraryComparison />
      </footer>
    </div>
  );
}

export default App;

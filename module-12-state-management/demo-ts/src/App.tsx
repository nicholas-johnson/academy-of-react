import { Routes, Route, Navigate } from "react-router-dom";
import { TabNav } from "./components/TabNav.tsx";
import { ZustandDemo } from "./zustand/ZustandDemo.tsx";
import { ReduxDemo } from "./redux/ReduxDemo.tsx";
import { MobXDemo } from "./mobx/MobXDemo.tsx";
import { LibraryComparison } from "./components/LibraryComparison.tsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>State Management Libraries</h1>
        <p>Compare Zustand, Redux Toolkit, and MobX</p>
      </header>

      <TabNav />

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/zustand" replace />} />
          <Route path="/zustand" element={<ZustandDemo />} />
          <Route path="/redux" element={<ReduxDemo />} />
          <Route path="/mobx" element={<MobXDemo />} />
        </Routes>
      </main>

      <footer className="footer">
        <LibraryComparison />
      </footer>
    </div>
  );
}

export default App;

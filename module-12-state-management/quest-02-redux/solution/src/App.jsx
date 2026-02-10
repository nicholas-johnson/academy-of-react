import { StatsBar } from "./components/StatsBar";
import { AddBattleForm } from "./components/AddBattleForm";
import { FilterTabs } from "./components/FilterTabs";
import { BattleList } from "./components/BattleList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🔮 Redux Battle Tracker</h1>
        <p>Predictable state with Redux Toolkit</p>
      </header>

      <main className="main">
        <StatsBar />
        <AddBattleForm />

        <section className="tracker">
          <div className="tracker-header">
            <h2>Battle Log</h2>
            <FilterTabs />
          </div>
          <BattleList />
        </section>
      </main>
    </div>
  );
}

export default App;

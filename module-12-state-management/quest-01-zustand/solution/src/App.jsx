import { AddSpellForm } from "./components/AddSpellForm";
import { SpellInventory } from "./components/SpellInventory";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Zustand Spell Inventory</h1>
        <p>Simple state management with Zustand</p>
      </header>

      <main className="main">
        <AddSpellForm />
        <SpellInventory />
      </main>
    </div>
  );
}

export default App;

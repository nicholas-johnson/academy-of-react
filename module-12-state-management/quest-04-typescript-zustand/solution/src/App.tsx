import { AddPotionForm } from "./components/AddPotionForm.tsx";
import { PotionList } from "./components/PotionList.tsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>The Potion Ledger</h1>
        <p>Typed state management with Zustand</p>
      </header>

      <main className="main">
        <AddPotionForm />
        <PotionList />
      </main>
    </div>
  );
}

export default App;

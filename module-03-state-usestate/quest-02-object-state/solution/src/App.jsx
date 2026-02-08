import { PotionBrewing } from "./components/PotionBrewing";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>Quest 2: Potion Brewing</h1>
        <p className="quest-subtitle">Managing state as an object</p>
      </div>

      <PotionBrewing />
    </div>
  );
}

export default App;

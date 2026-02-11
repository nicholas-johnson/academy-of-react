import { WindowSizeDemo } from "./components/WindowSizeDemo";
import { ToggleDemo } from "./components/ToggleDemo";
import { CounterDemo } from "./components/CounterDemo";
import { HookBenefits } from "./components/HookBenefits";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Custom Hooks Demo</h1>
      <p>Reusable stateful logic</p>

      <WindowSizeDemo />
      <ToggleDemo />
      <CounterDemo />

      <HookBenefits />
    </div>
  );
}

export default App;

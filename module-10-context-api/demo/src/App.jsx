import { CounterProvider } from "./context/CounterContext";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterButtons } from "./components/CounterButtons";
import { ContextInfo } from "./components/ContextInfo";
import "./App.css";

function App() {
  return (
    <CounterProvider>
      <div className="app">
        <h1>Context API Demo</h1>
        <p>Global state without prop drilling</p>

        <div className="demo-section">
          <h3>Counter (Shared State)</h3>
          <CounterDisplay />
          <CounterButtons />
        </div>

        <ContextInfo />
      </div>
    </CounterProvider>
  );
}

export default App;

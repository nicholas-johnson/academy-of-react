import { useSyncExternalStore } from "react";
import "./App.css";

// External store (outside React)
const spellCountStore = {
  count: 0,
  listeners: new Set(),
  
  getSnapshot() {
    return this.count;
  },
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  
  increment() {
    this.count++;
    this.listeners.forEach((listener) => listener());
  },
  
  decrement() {
    this.count--;
    this.listeners.forEach((listener) => listener());
  },
  
  reset() {
    this.count = 0;
    this.listeners.forEach((listener) => listener());
  },
};

function SpellCounter() {
  // TODO: Use useSyncExternalStore to subscribe to the store
  const count = 0; // Replace this

  return (
    <div className="counter-card">
      <h2>Spell Counter {Math.random()}</h2>
      <div className="count">{count}</div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>External Store Demo</h1>
      <p className="subtitle">useSyncExternalStore</p>

      <div className="counter-grid">
        <SpellCounter />
        <SpellCounter />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={() => spellCountStore.increment()}>
          Increment
        </button>
        <button className="btn btn-secondary" onClick={() => spellCountStore.decrement()}>
          Decrement
        </button>
        <button className="btn btn-secondary" onClick={() => spellCountStore.reset()}>
          Reset
        </button>
      </div>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Use useSyncExternalStore in SpellCounter</li>
          <li>Pass subscribe and getSnapshot functions</li>
          <li>Notice both counters update together</li>
          <li>Store is external to React</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

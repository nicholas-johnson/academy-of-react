import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// State lives OUTSIDE the component (module-level)
let count = 0;

// Create root once
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render function we call manually
const render = () => {
  root.render(<App />);
};

// Component reads the module-level state
const App = () => (
  <div className="app">
    <h1>Manual Re-render Demo</h1>
    <p className="subtitle">Before useState, we did this...</p>
    
    <div className="counter">
      <div className="count">{count}</div>
      <div className="buttons">
        <button onClick={() => { count++; render(); }}>
          + Add
        </button>
        <button onClick={() => { count--; render(); }}>
          - Subtract
        </button>
        <button onClick={() => { count = 0; render(); }}>
          Reset
        </button>
      </div>
    </div>
    
    <div className="explanation">
      <h3>How it works:</h3>
      <ol>
        <li>State is stored in a module variable: <code>let count = 0</code></li>
        <li>Event handlers update the variable: <code>count++</code></li>
        <li>Then manually call <code>render()</code> to update the UI</li>
      </ol>
      <p className="problem">
        <strong>The problem:</strong> We have to remember to call render() every time!
        This is tedious and error-prone. useState solves this.
      </p>
    </div>
  </div>
);

// Initial render
render();

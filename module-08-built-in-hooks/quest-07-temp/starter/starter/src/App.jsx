import { useState } from "react";
import "./App.css";

function App() {
  // TODO: Add useState for spell count

  return (
    <div className="app">
      <h1>Spell Counter</h1>
      <p className="subtitle">Track your daily spell casting progress</p>

      <div className="counter-display">
        <span className="count">0</span>
        <span className="label">Spells Cast</span>
      </div>

      {/* TODO: Add milestone messages here */}

      <div className="button-group">
        <button className="btn btn-primary">Cast Spell</button>
        <button className="btn btn-secondary">Reset</button>
      </div>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Use useState to track spell count</li>
          <li>Increment count when "Cast Spell" is clicked</li>
          <li>Reset count to 0 when "Reset" is clicked</li>
          <li>Show milestone messages at 5, 10, and 20 spells</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

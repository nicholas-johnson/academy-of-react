import "./App.css";

// 🎨 TASK 2 — Uncomment the line below once you've created TextInput.jsx
// import TextInput from "./TextInput";

// 🎨 TASK 4 — Uncomment the line below once you've created TextInputStyled.jsx
// import TextInputStyled from "./TextInputStyled";

// 🎨 TASK 5 — Uncomment the line below once you've created TextInputTailwind.jsx
// import TextInputTailwind from "./TextInputTailwind";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>The Perfect Input</h1>
        <p>One input. Three styling approaches. Built from scratch.</p>
      </header>

      <div className="inputs-grid">
        {/* 🎨 TASK 2 — Replace the placeholder below with <TextInput /> */}
        <section className="input-section">
          <h2>CSS Modules</h2>
          <p className="placeholder">Your input will appear here.</p>
        </section>

        {/* 🎨 TASK 4 — Replace the placeholder below with <TextInputStyled /> */}
        <section className="input-section">
          <h2>Styled Components</h2>
          <p className="placeholder">Your input will appear here.</p>
        </section>

        {/* 🎨 TASK 5 — Replace the placeholder below with <TextInputTailwind /> */}
        <section className="input-section">
          <h2>Tailwind CSS</h2>
          <p className="placeholder">Your input will appear here.</p>
        </section>
      </div>
    </div>
  );
}

export default App;

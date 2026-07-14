import "./App.css";
import TextInput from "./TextInput";
import TextInputStyled from "./TextInputStyled";
import TextInputTailwind from "./TextInputTailwind";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>The Perfect Input</h1>
        <p>One input. Three styling approaches. Built from scratch.</p>
      </header>

      <div className="inputs-grid">
        <section className="input-section">
          <h2>CSS Modules</h2>
          <TextInput />
        </section>

        <section className="input-section">
          <h2>Styled Components</h2>
          <TextInputStyled />
        </section>

        <section className="input-section">
          <h2>Tailwind CSS</h2>
          <TextInputTailwind />
        </section>
      </div>
    </div>
  );
}

export default App;

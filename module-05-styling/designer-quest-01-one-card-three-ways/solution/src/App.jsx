import SpellCardModules from "./SpellCardModules";
import SpellCardStyled from "./SpellCardStyled";
import SpellCardTailwind from "./SpellCardTailwind";
import "./App.css";

const spell = {
  name: "Fireball",
  element: "fire",
  power: 85,
  description: "A blazing sphere of destruction",
};

function App() {
  return (
    <div className="app">
      <h1 className="title">Spell Archive — Display Cases</h1>
      <p className="subtitle">
        Same spell, three styling approaches. Make them all look great.
      </p>
      <div className="cards">
        <div className="column">
          <span className="label">CSS Modules</span>
          <SpellCardModules spell={spell} />
        </div>
        <div className="column">
          <span className="label">Styled Components</span>
          <SpellCardStyled spell={spell} />
        </div>
        <div className="column">
          <span className="label">Tailwind CSS</span>
          <SpellCardTailwind spell={spell} />
        </div>
      </div>
    </div>
  );
}

export default App;

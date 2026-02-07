import SpellCard from "./SpellCard";

const spells = [
  {
    id: 1,
    name: "Fireball",
    element: "fire",
    power: 80,
    manaCost: 25,
    description: "Hurls a ball of flame at the target",
  },
  {
    id: 2,
    name: "Tidal Wave",
    element: "water",
    power: 65,
    manaCost: 30,
    description: "Summons a crushing wave of water",
  },
  {
    id: 3,
    name: "Stone Shield",
    element: "earth",
    power: 40,
    manaCost: 15,
    description: "Creates a protective barrier of stone",
  },
  {
    id: 4,
    name: "Lightning Bolt",
    element: "air",
    power: 90,
    manaCost: 35,
    description: "Strikes with electric fury",
  },
  {
    id: 5,
    name: "Arcane Missile",
    element: "arcane",
    power: 55,
    manaCost: 20,
    description: "Fires a bolt of pure magic",
  },
  {
    id: 6,
    name: "Inferno",
    element: "fire",
    power: 95,
    manaCost: 45,
    description: "Engulfs the area in flames",
  },
];

function App() {
  return (
    <div>
      <h1>📚 Spell Library</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {spells.map((spell) => (
          <SpellCard key={spell.id} spell={spell} />
        ))}
      </div>
    </div>
  );
}

export default App;

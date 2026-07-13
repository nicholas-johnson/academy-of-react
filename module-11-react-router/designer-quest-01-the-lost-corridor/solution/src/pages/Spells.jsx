const spells = [
  { id: 1, name: "Ignis Bolt", element: "Fire", difficulty: "Beginner" },
  { id: 2, name: "Aqua Shield", element: "Water", difficulty: "Intermediate" },
  { id: 3, name: "Zephyr Step", element: "Air", difficulty: "Beginner" },
  { id: 4, name: "Terra Wall", element: "Earth", difficulty: "Intermediate" },
  { id: 5, name: "Lux Beam", element: "Light", difficulty: "Advanced" },
  { id: 6, name: "Umbra Veil", element: "Shadow", difficulty: "Advanced" },
];

function Spells() {
  return (
    <div className="page">
      <h1 className="page-title">Spell Directory</h1>
      <p className="page-text">Spells taught across all four houses.</p>

      <div className="card-grid">
        {spells.map((spell) => (
          <div key={spell.id} className="card">
            <h3 className="card-name">{spell.name}</h3>
            <p className="card-detail">
              <span className="label">Element:</span> {spell.element}
            </p>
            <p className="card-detail">
              <span className="label">Difficulty:</span> {spell.difficulty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spells;

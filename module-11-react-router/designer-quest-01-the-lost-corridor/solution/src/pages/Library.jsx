const categories = [
  {
    name: "Elemental Magic",
    spells: ["Ignis Bolt", "Aqua Shield", "Zephyr Step", "Terra Wall"],
  },
  {
    name: "Light & Shadow",
    spells: ["Lux Beam", "Umbra Veil", "Prisma Arc", "Eclipse Ward"],
  },
  {
    name: "Healing Arts",
    spells: ["Mend Wounds", "Purify Toxin", "Aura Restore", "Vital Surge"],
  },
  {
    name: "Enchantment",
    spells: ["Charm Object", "Memory Weave", "Dream Walk", "Binding Oath"],
  },
];

function Library() {
  return (
    <div className="page">
      <h1 className="page-title">Spell Library</h1>
      <p className="page-text">
        The Academy Library holds thousands of enchanted volumes. Below is a
        sampling of spells organised by discipline.
      </p>

      <div className="card-grid">
        {categories.map((category) => (
          <div key={category.name} className="card">
            <h3 className="card-name">{category.name}</h3>
            <ul className="spell-list">
              {category.spells.map((spell) => (
                <li key={spell} className="spell-list-item">
                  {spell}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;

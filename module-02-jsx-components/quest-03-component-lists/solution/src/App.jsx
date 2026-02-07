import "./App.css";

const potions = [
  {
    id: 1,
    name: "Health Elixir",
    effect: "healing",
    icon: "🧪",
    potency: 90,
    brewTime: 30,
    ingredients: ["Dragon's Blood", "Moonflower", "Crystal Water"],
    price: 150,
  },
  {
    id: 2,
    name: "Mana Potion",
    effect: "energy",
    icon: "💙",
    potency: 75,
    brewTime: 20,
    ingredients: ["Stardust", "Sage", "Pure Spring Water"],
    price: 120,
  },
  {
    id: 3,
    name: "Strength Tonic",
    effect: "power",
    icon: "💪",
    potency: 85,
    brewTime: 45,
    ingredients: ["Giant's Tooth", "Iron Root", "Bear Claw"],
    price: 180,
  },
  {
    id: 4,
    name: "Invisibility Draught",
    effect: "stealth",
    icon: "👻",
    potency: 70,
    brewTime: 60,
    ingredients: ["Shadow Essence", "Ghost Orchid", "Void Crystal"],
    price: 200,
  },
];

const effectConfig = {
  healing: { color: "#16a34a", label: "Healing", symbol: "💚" },
  energy: { color: "#2563eb", label: "Energy", symbol: "💙" },
  power: { color: "#dc2626", label: "Power", symbol: "🔴" },
  stealth: { color: "#7c3aed", label: "Stealth", symbol: "🟣" },
};

// Ingredient component
function Ingredient({ name }) {
  return (
    <div className="ingredient" title={name}>
      <span className="ingredient-dot">•</span>
      <span className="ingredient-name">{name}</span>
    </div>
  );
}

// Potion Card component
function PotionCard({
  name,
  effect,
  icon,
  potency,
  brewTime,
  ingredients,
  price,
}) {
  const config = effectConfig[effect];

  return (
    <div className="potion-card">
      <div className="card-header" style={{ borderTopColor: config.color }}>
        <div className="potion-icon">{icon}</div>
        <div>
          <h3 className="potion-name">{name}</h3>
          <span className="potion-effect" style={{ color: config.color }}>
            {config.symbol} {config.label}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="stat-row">
          <span className="stat-label">⚡ Potency:</span>
          <div className="potency-bar">
            <div
              className="potency-fill"
              style={{
                width: `${potency}%`,
                backgroundColor: config.color,
              }}
            />
          </div>
          <span className="stat-value">{potency}%</span>
        </div>

        <div className="stat-row">
          <span className="stat-label">⏱️ Brew Time:</span>
          <span className="stat-value">{brewTime} min</span>
        </div>

        <div className="ingredients-section">
          <h4 className="section-title">📋 Ingredients:</h4>
          <div className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <Ingredient key={index} name={ingredient} />
            ))}
          </div>
        </div>

        <div className="price-tag" style={{ backgroundColor: config.color }}>
          💰 {price} Gold
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 3: Potion Cards</h1>
        <p className="quest-subtitle">Component composition with ingredients</p>
      </div>

      <div className="potion-grid">
        {potions.map((potion) => (
          <PotionCard key={potion.id} {...potion} />
        ))}
      </div>
    </div>
  );
}

export default App;

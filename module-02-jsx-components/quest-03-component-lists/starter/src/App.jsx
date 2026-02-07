import './App.css'

// Potion data
const potions = [
  {
    id: 1,
    name: "Health Elixir",
    effect: "healing",
    icon: "🧪",
    potency: 90,
    brewTime: 30,
    ingredients: ["Dragon's Blood", "Moonflower", "Crystal Water"],
    price: 150
  },
  {
    id: 2,
    name: "Mana Potion",
    effect: "energy",
    icon: "💙",
    potency: 75,
    brewTime: 20,
    ingredients: ["Stardust", "Sage", "Pure Spring Water"],
    price: 120
  },
  {
    id: 3,
    name: "Strength Tonic",
    effect: "power",
    icon: "💪",
    potency: 85,
    brewTime: 45,
    ingredients: ["Giant's Tooth", "Iron Root", "Bear Claw"],
    price: 180
  },
  {
    id: 4,
    name: "Invisibility Draught",
    effect: "stealth",
    icon: "👻",
    potency: 70,
    brewTime: 60,
    ingredients: ["Shadow Essence", "Ghost Orchid", "Void Crystal"],
    price: 200
  }
];

// TODO: Create a PotionCard component that displays potion info
// function PotionCard({ name, icon, potency, ingredients, price }) { ... }

// TODO: Create an Ingredient component for the ingredients list
// function Ingredient({ name }) { ... }

function App() {
  return (
    <div className="app-container">
      <h1>Quest 3: Potion Cards</h1>
      <p>Create a list of potion cards!</p>
      
      <div className="potion-grid">
        {/* TODO: Map over potions and render PotionCards */}
      </div>
    </div>
  );
}

export default App;

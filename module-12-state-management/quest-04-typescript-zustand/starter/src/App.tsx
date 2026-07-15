import { useState } from "react";
// TODO: Import usePotionStore from "./store/potionStore"
// TODO: Import your Potion and PotionCategory types from "./types/potion"
import { CATEGORIES } from "./data/categories.ts";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [value, setValue] = useState(50);
  const [category, setCategory] = useState<string>("healing");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // TODO: Get state and actions from the Zustand store using selectors
  // const potions = usePotionStore((state) => state.potions)
  // const addPotion = usePotionStore((state) => state.addPotion)
  // const removePotion = usePotionStore((state) => state.removePotion)
  // const setCategoryFilter = usePotionStore((state) => state.setCategoryFilter)
  // const totalValue = usePotionStore((state) => state.getTotalValue())

  // Placeholder data — remove when using the real store
  const potions = [
    { id: 1, name: "Health Potion", value: 50, category: "healing" },
    { id: 2, name: "Strength Elixir", value: 75, category: "buff" },
  ];
  const totalValue = potions.reduce((sum, p) => sum + p.value, 0);

  const filteredPotions =
    filterCategory === "all"
      ? potions
      : potions.filter((p) => p.category === filterCategory);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    // TODO: Call addPotion with the new potion data
    // addPotion({ name, value, category: category as PotionCategory })

    console.log("TODO: Add potion", { name, value, category });
    setName("");
    setValue(50);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>The Potion Ledger</h1>
        <p>Typed state management with Zustand</p>
      </header>

      <main className="main">
        <section className="add-form">
          <h2>Brew New Potion</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Potion name"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>
                Value: {value} gold
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
              </label>
            </div>
            <button type="submit" className="btn primary">
              Brew Potion
            </button>
          </form>
        </section>

        <section className="inventory">
          <div className="inventory-header">
            <h2>Potion Inventory</h2>
            <div className="controls">
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  // TODO: Call setCategoryFilter(e.target.value as PotionCategory | "all")
                }}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-value">{filteredPotions.length}</span>
              <span className="stat-label">Potions</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalValue}</span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>

          <div className="potion-list">
            {filteredPotions.length === 0 ? (
              <p className="empty">No potions brewed yet</p>
            ) : (
              filteredPotions.map((potion) => (
                <div key={potion.id} className="potion-card">
                  <div className="potion-info">
                    <h3>{potion.name}</h3>
                    <p>
                      {potion.category} — {potion.value} gold
                    </p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => {
                      // TODO: Call removePotion(potion.id)
                      console.log("TODO: Remove potion", potion.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <p className="persistence-note">
            Your potions are saved to localStorage automatically!
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;

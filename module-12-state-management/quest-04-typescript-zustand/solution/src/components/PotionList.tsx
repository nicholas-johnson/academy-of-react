import { usePotionStore } from "../store/potionStore.ts";
import { CATEGORIES } from "../data/categories.ts";
import { StatsBar } from "./StatsBar.tsx";
import type { PotionCategory } from "../types/potion.ts";

export function PotionList() {
  const potions = usePotionStore((state) => state.potions);
  const categoryFilter = usePotionStore((state) => state.categoryFilter);
  const removePotion = usePotionStore((state) => state.removePotion);
  const setCategoryFilter = usePotionStore((state) => state.setCategoryFilter);

  const filteredPotions =
    categoryFilter === "all"
      ? potions
      : potions.filter((p) => p.category === categoryFilter);

  return (
    <section className="inventory">
      <div className="inventory-header">
        <h2>Potion Inventory</h2>
        <div className="controls">
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as PotionCategory | "all")
            }
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

      <StatsBar filteredCount={filteredPotions.length} />

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
                onClick={() => removePotion(potion.id)}
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
  );
}

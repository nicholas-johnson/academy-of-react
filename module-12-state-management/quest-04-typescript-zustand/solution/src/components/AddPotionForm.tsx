import { useState } from "react";
import { usePotionStore } from "../store/potionStore.ts";
import { CATEGORIES } from "../data/categories.ts";
import type { PotionCategory } from "../types/potion.ts";

export function AddPotionForm() {
  const [name, setName] = useState("");
  const [value, setValue] = useState(50);
  const [category, setCategory] = useState<PotionCategory>("healing");

  const addPotion = usePotionStore((state) => state.addPotion);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    addPotion({ name, value, category });
    setName("");
    setValue(50);
  };

  return (
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
            onChange={(e) => setCategory(e.target.value as PotionCategory)}
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
  );
}

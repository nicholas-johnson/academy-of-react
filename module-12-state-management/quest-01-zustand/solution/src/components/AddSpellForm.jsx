import { useState } from "react";
import { useSpellStore } from "../store/spellStore";
import { ELEMENTS } from "../data/elements";

export function AddSpellForm() {
  const [name, setName] = useState("");
  const [power, setPower] = useState(50);
  const [element, setElement] = useState("fire");

  const addSpell = useSpellStore((state) => state.addSpell);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSpell({ name, power, element });
    setName("");
    setPower(50);
  };

  return (
    <section className="add-form">
      <h2>Add New Spell</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Spell name"
            required
          />
          <select value={element} onChange={(e) => setElement(e.target.value)}>
            {ELEMENTS.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>
            Power: {power}
            <input
              type="range"
              min="10"
              max="100"
              value={power}
              onChange={(e) => setPower(Number(e.target.value))}
            />
          </label>
        </div>
        <button type="submit" className="btn primary">
          Add Spell
        </button>
      </form>
    </section>
  );
}

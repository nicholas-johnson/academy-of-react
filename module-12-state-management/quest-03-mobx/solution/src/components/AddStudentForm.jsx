import { useState } from "react";
import { academyStore } from "../store";
import { HOUSES } from "../data/houses";

export function AddStudentForm() {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("Liondudes");
  const [power, setPower] = useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    academyStore.addStudent({ name, house, power });
    setName("");
    setPower(50);
  };

  return (
    <section className="add-form">
      <h2>Enroll Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student name"
            required
          />
          <select value={house} onChange={(e) => setHouse(e.target.value)}>
            {HOUSES.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>
            Power Level: {power}
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
          Enroll
        </button>
      </form>
    </section>
  );
}

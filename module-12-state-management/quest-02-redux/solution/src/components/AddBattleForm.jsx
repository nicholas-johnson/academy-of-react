import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBattle } from "../battleSlice";

export function AddBattleForm() {
  const [battleName, setBattleName] = useState("");
  const dispatch = useDispatch();

  const handleAddBattle = (e) => {
    e.preventDefault();
    if (!battleName.trim()) return;

    dispatch(addBattle({ name: battleName }));
    setBattleName("");
  };

  return (
    <section className="add-form">
      <h2>Start New Battle</h2>
      <form onSubmit={handleAddBattle}>
        <input
          type="text"
          value={battleName}
          onChange={(e) => setBattleName(e.target.value)}
          placeholder="Battle name"
          required
        />
        <button type="submit" className="btn primary">
          Declare Battle
        </button>
      </form>
    </section>
  );
}

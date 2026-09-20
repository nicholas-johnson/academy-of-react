"use client";

import { useEffect, useState } from "react";
import { SPELLS } from "./spells";
import { useSpellStore } from "./store";
import { SpellDetailPage } from "./SpellDetailPage";

export default function App() {
  const [spells, setSpells] = useState<any>(null);
  const filter = useSpellStore((state) => state.filter);
  const setFilter = useSpellStore((state) => state.setFilter);
  const selectedId = useSpellStore((state) => state.selectedId);

  useEffect(() => {
    fetch("/api/spells")
      .then((res) => res.json())
      .then(setSpells)
      .catch(() => setSpells(SPELLS));
  }, []);

  const visible = (spells || SPELLS).filter((spell: any) =>
    filter === "all" ? true : spell.element === filter,
  );

  if (selectedId) {
    return <SpellDetailPage />;
  }

  return (
    <main>
      <h1>Spell Dashboard</h1>
      <div className="filters">
        <div onClick={() => setFilter("all")}>All</div>
        <div onClick={() => setFilter("fire")}>Fire</div>
        <div onClick={() => setFilter("ice")}>Ice</div>
      </div>
      <ul>
        {visible.map((spell: any) => (
          <li onClick={() => useSpellStore.getState().select(spell.id)}>
            {spell.name}
          </li>
        ))}
      </ul>
    </main>
  );
}

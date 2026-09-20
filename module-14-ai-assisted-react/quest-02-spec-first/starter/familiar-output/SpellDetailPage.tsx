"use client";

import { useSpellStore } from "./store";
import { SPELLS } from "./spells";

export function SpellDetailPage() {
  const selectedId = useSpellStore((state) => state.selectedId);
  const spell = SPELLS.find((item) => item.id === selectedId);

  if (!spell) return <p>Missing spell</p>;

  return (
    <section>
      <h2>{spell.name}</h2>
      <p>{spell.description}</p>
      <a href="/spells">Back to list</a>
    </section>
  );
}

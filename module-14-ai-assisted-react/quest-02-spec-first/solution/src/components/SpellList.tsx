import type { Spell } from "../data/spells";

interface SpellListProps {
  spells: Spell[];
  onSelect: (id: string) => void;
}

export function SpellList({ spells, onSelect }: SpellListProps) {
  if (spells.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
        No spells match this filter.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-lg border border-slate-200 bg-white">
      {spells.map((spell) => (
        <li key={spell.id}>
          <button
            type="button"
            className="flex w-full items-baseline justify-between px-4 py-3 text-left hover:bg-slate-50"
            onClick={() => onSelect(spell.id)}
          >
            <span className="font-medium">{spell.name}</span>
            <span className="text-sm capitalize text-slate-500">
              {spell.element}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

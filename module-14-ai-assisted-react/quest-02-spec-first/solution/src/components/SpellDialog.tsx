import type { Spell } from "../data/spells";

interface SpellDialogProps {
  spell: Spell;
  onClose: () => void;
}

export function SpellDialog({ spell, onClose }: SpellDialogProps) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="spell-dialog-title"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="spell-dialog-title" className="text-xl font-semibold">
          {spell.name}
        </h2>
        <p className="mt-1 text-sm capitalize text-slate-500">
          {spell.element} · power {spell.power}
        </p>
        <p className="mt-4 text-slate-700">{spell.description}</p>
        <button
          type="button"
          className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

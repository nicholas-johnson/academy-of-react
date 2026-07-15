import type { Element, Spell } from "../types/spell";

const SPELL_NAMES = [
  "Thunder Strike",
  "Healing Light",
  "Shadow Bolt",
  "Earth Shield",
] as const;

const SPELL_ELEMENTS: Element[] = ["lightning", "holy", "dark", "earth"];

export function getRandomSpell(): Omit<Spell, "id"> {
  const idx = Math.floor(Math.random() * SPELL_NAMES.length);
  return {
    name: SPELL_NAMES[idx],
    power: Math.floor(Math.random() * 50) + 50,
    element: SPELL_ELEMENTS[idx],
  };
}

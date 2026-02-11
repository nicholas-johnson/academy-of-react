const SPELL_NAMES = [
  "Thunder Strike",
  "Healing Light",
  "Shadow Bolt",
  "Earth Shield",
];

const SPELL_ELEMENTS = ["lightning", "holy", "dark", "earth"];

export function getRandomSpell() {
  const idx = Math.floor(Math.random() * SPELL_NAMES.length);
  return {
    name: SPELL_NAMES[idx],
    power: Math.floor(Math.random() * 50) + 50,
    element: SPELL_ELEMENTS[idx],
  };
}

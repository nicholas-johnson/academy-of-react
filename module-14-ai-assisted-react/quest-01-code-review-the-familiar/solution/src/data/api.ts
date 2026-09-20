export interface Spell {
  id: string;
  name: string;
  power: number;
  notes: string;
}

const SPELLS: Spell[] = [
  {
    id: "s-1",
    name: "Fireball",
    power: 40,
    notes: "Standard issue. <b>Do not</b> cast indoors.",
  },
  {
    id: "s-2",
    name: "Ice Lance",
    power: 25,
    notes: "Piercing. Notes may contain <em>markup</em> from students.",
  },
  {
    id: "s-3",
    name: "Mend",
    power: 10,
    notes: "Healing. Treat notes as text, not HTML.",
  },
];

let generation = 0;

/** Delayed fetch so a double-reload can race. */
export function fetchSpells(): Promise<Spell[]> {
  generation += 1;
  const snapshot = generation;
  const delay = 400 + Math.random() * 700;

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(
        SPELLS.map((spell) => ({
          ...spell,
          name: `${spell.name} · gen ${snapshot}`,
        })),
      );
    }, delay);
  });
}

export interface Spell {
  id: string;
  name: string;
  element: "fire" | "ice" | "lightning" | "healing";
  power: number;
  description: string;
}

export const SPELLS: Spell[] = [
  {
    id: "fireball",
    name: "Fireball",
    element: "fire",
    power: 40,
    description: "A sphere of flame. Do not cast in the library.",
  },
  {
    id: "ice-lance",
    name: "Ice Lance",
    element: "ice",
    power: 25,
    description: "Piercing frost. Useful against fire elementals.",
  },
  {
    id: "thunderclap",
    name: "Thunderclap",
    element: "lightning",
    power: 35,
    description: "A shock that stuns. Watch the mana cost.",
  },
  {
    id: "mend",
    name: "Mend",
    element: "healing",
    power: 10,
    description: "Closes wounds. Does not close pull requests.",
  },
];

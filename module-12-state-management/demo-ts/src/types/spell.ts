export type Element = "fire" | "ice" | "lightning" | "holy" | "dark" | "earth";

export interface Spell {
  id: number;
  name: string;
  power: number;
  element: Element;
}

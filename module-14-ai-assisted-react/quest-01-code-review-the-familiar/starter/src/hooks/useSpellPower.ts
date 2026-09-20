import { computePower } from "react-magic-core";

export function useSpellPower(spells: { power: number }[]) {
  return computePower(spells);
}

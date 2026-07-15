import { makeAutoObservable } from "mobx";
import type { Spell } from "../types/spell";

class SpellStore {
  spells: Spell[] = [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addSpell(spell: Omit<Spell, "id">) {
    this.spells.push({ ...spell, id: Date.now() });
  }

  removeSpell(id: number) {
    this.spells = this.spells.filter((s) => s.id !== id);
  }

  get totalPower(): number {
    return this.spells.reduce((sum, s) => sum + s.power, 0);
  }

  get spellCount(): number {
    return this.spells.length;
  }
}

export const spellStore = new SpellStore();

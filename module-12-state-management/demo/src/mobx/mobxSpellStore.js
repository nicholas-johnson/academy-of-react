import { makeAutoObservable } from "mobx";

class SpellStore {
  spells = [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addSpell(spell) {
    this.spells.push({ ...spell, id: Date.now() });
  }

  removeSpell(id) {
    this.spells = this.spells.filter((s) => s.id !== id);
  }

  get totalPower() {
    return this.spells.reduce((sum, s) => sum + s.power, 0);
  }

  get spellCount() {
    return this.spells.length;
  }
}

export const spellStore = new SpellStore();

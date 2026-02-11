import { observable, action, computed, makeObservable } from "mobx";

class SpellStore {
  @observable spells = [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ];

  constructor() {
    makeObservable(this);
  }

  @action addSpell(spell) {
    this.spells.push({ ...spell, id: Date.now() });
  }

  @action removeSpell(id) {
    this.spells = this.spells.filter((s) => s.id !== id);
  }

  @computed get totalPower() {
    return this.spells.reduce((sum, s) => sum + s.power, 0);
  }

  @computed get spellCount() {
    return this.spells.length;
  }
}

export const spellStore = new SpellStore();

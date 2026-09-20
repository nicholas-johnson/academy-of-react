export const FAMILIAR_KINDS = ["owl", "cat", "raven", "fox"] as const;

export type FamiliarKind = (typeof FAMILIAR_KINDS)[number];

export interface Familiar {
  id: string;
  name: string;
  kind: FamiliarKind;
  specialty: string;
  boundAt: string;
}

export const INITIAL_FAMILIARS: Familiar[] = [
  {
    id: "f-1",
    name: "Archimedes",
    kind: "owl",
    specialty: "Diff literacy",
    boundAt: "Harvest moon",
  },
  {
    id: "f-2",
    name: "Nigellus",
    kind: "cat",
    specialty: "Type oracles",
    boundAt: "First frost",
  },
  {
    id: "f-3",
    name: "Nevermore",
    kind: "raven",
    specialty: "Spec drafting",
    boundAt: "Eclipse",
  },
  {
    id: "f-4",
    name: "Ember",
    kind: "fox",
    specialty: "Browser verification",
    boundAt: "Solstice",
  },
];

// 📋 SPELL DATA
// Each spell in this list gets turned into a card on screen.
// The app uses a LOOP (.map) to go through each one.
// Add a new spell to the list → a new card appears!

const spells = [
  {
    id: 1,
    name: "Fireball",
    element: "fire",
    power: 85,
    description:
      "Hurls a concentrated sphere of flame that explodes on impact, scorching everything within its blast radius.",
    icon: "🔥",
  },
  {
    id: 2,
    name: "Frost Nova",
    element: "ice",
    power: 60,
    description:
      "Releases a wave of freezing energy in all directions, encasing nearby targets in a thin shell of ice.",
    icon: "❄️",
  },
  {
    id: 3,
    name: "Chain Lightning",
    element: "lightning",
    power: 90,
    description:
      "Launches a bolt of electricity that leaps from target to target, gaining intensity with each jump.",
    icon: "⚡",
  },
  {
    id: 4,
    name: "Thorn Wall",
    element: "earth",
    power: 45,
    description:
      "Summons a dense barrier of living thorns from the ground, blocking passage and ensnaring anything that touches it.",
    icon: "🌿",
  },
  {
    id: 5,
    name: "Arcane Pulse",
    element: "arcane",
    power: 75,
    description:
      "Channels raw magical energy into a shockwave that disrupts enchantments and staggers opponents.",
    icon: "✨",
  },

  // ✅ TASK 1 — 6th spell added
  {
    id: 6,
    name: "Void Rift",
    element: "arcane",
    power: 70,
    description:
      "Tears a momentary hole in the fabric of space, pulling nearby objects toward its centre before collapsing.",
    icon: "🌀",
  },
];

export default spells;

// 📋 STUDENT DATA
// This is a VARIABLE — "const students" stores a list of students.
// Each student is an object with properties inside { curly braces }.
// Change any value and save — the page updates instantly!

const students = [
  // ✅ TASK 1 — Student renamed and customised
  {
    id: 1,
    name: "Your Name Here",
    house: "Dragon",
    level: 88,
    motto: "I wrote my own motto!",
  },
  {
    id: 2,
    name: "Dorian Stormscale",
    house: "Dragon",
    level: 72,
    motto: "Strength through wisdom",
  },
  {
    id: 3,
    name: "Elara Goldfeather",
    house: "Griffin",
    level: 95,
    motto: "Courage lights the way",
  },
  {
    id: 4,
    name: "Milo Shadowveil",
    house: "Serpent",
    level: 64,
    motto: "Still waters cut deepest",
  },

  // ✅ TASK 2 — 5th student added
  {
    id: 5,
    name: "Luna Brighthollow",
    house: "Phoenix",
    level: 80,
    motto: "Every spark becomes a star",
  },
];

// ⚙️ ENGINE CODE — this line makes the data available to other files
export default students;

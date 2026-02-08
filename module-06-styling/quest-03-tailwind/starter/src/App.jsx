import BattleDashboard from "./BattleDashboard";

const battleData = {
  status: "In Progress",
  round: 3,
  teams: [
    {
      id: 1,
      name: "Phoenix Legion",
      color: "orange",
      health: 85,
      mana: 60,
      members: [
        { name: "Aria Flameheart", role: "Mage", status: "active" },
        { name: "Kira Sunblade", role: "Knight", status: "active" },
        { name: "Zeph Ashwind", role: "Archer", status: "wounded" },
      ],
    },
    {
      id: 2,
      name: "Dragon Vanguard",
      color: "purple",
      health: 70,
      mana: 45,
      members: [
        { name: "Drake Shadowscale", role: "Mage", status: "active" },
        { name: "Luna Stormwing", role: "Knight", status: "wounded" },
        { name: "Nyx Darkfire", role: "Archer", status: "active" },
      ],
    },
  ],
};

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        ⚔️ Battle Command Center
      </h1>
      <BattleDashboard data={battleData} />
    </div>
  );
}

export default App;

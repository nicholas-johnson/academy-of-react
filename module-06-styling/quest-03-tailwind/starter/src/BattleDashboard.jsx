// TODO: Build the Battle Dashboard using Tailwind CSS
//
// Requirements:
// 1. Battle status header (status, round number)
// 2. Team cards showing:
//    - Team name with colored accent
//    - Health bar (green gradient)
//    - Mana bar (blue gradient)
//    - Member list with status indicators
// 3. Responsive grid layout
// 4. Hover effects on cards
//
// Useful Tailwind classes:
// - Layout: grid, grid-cols-1, md:grid-cols-2, gap-4
// - Spacing: p-4, px-6, py-2, m-2, mb-4
// - Colors: bg-slate-800, text-white, text-gray-400
// - Borders: rounded-lg, border, border-slate-700
// - Effects: hover:bg-slate-700, transition-all, shadow-lg
// - Flexbox: flex, items-center, justify-between
// - Width: w-full, w-1/2
// - Text: text-xl, font-bold, text-sm

function BattleDashboard({ data }) {
  const { status, round, teams } = data;

  // TODO: Replace this placeholder with your Tailwind-styled dashboard
  return (
    <div>
      <p>Battle Status: {status}</p>
      <p>Round: {round}</p>
      {teams.map((team) => (
        <div key={team.id}>
          <h2>{team.name}</h2>
          <p>Health: {team.health}%</p>
          <p>Mana: {team.mana}%</p>
          <ul>
            {team.members.map((member) => (
              <li key={member.name}>
                {member.name} - {member.role} ({member.status})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default BattleDashboard;

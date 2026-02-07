// Color mappings for team accents
const teamColors = {
  orange: {
    border: "border-t-orange-500",
    bg: "bg-orange-500",
    text: "text-orange-400",
    shadow: "hover:shadow-orange-500/20",
  },
  purple: {
    border: "border-t-purple-500",
    bg: "bg-purple-500",
    text: "text-purple-400",
    shadow: "hover:shadow-purple-500/20",
  },
};

// Status badge colors
const statusColors = {
  active: "bg-green-500",
  wounded: "bg-yellow-500",
  defeated: "bg-red-500",
};

function ProgressBar({ value, color, label }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MemberList({ members }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        Team Members
      </h4>
      <ul className="space-y-2">
        {members.map((member) => (
          <li
            key={member.name}
            className="flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2"
          >
            <div>
              <span className="text-white font-medium">{member.name}</span>
              <span className="text-gray-500 text-sm ml-2">
                ({member.role})
              </span>
            </div>
            <span
              className={`w-2 h-2 rounded-full ${statusColors[member.status]}`}
              title={member.status}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TeamCard({ team }) {
  const colors = teamColors[team.color];

  return (
    <div
      className={`
        bg-slate-800 rounded-xl border border-slate-700 border-t-4 ${colors.border}
        p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colors.shadow}
      `}
    >
      {/* Team Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full ${colors.bg} animate-pulse`} />
        <h3 className="text-xl font-bold text-white">{team.name}</h3>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <ProgressBar
          value={team.health}
          color="bg-gradient-to-r from-green-500 to-emerald-400"
          label="Health"
        />
        <ProgressBar
          value={team.mana}
          color="bg-gradient-to-r from-blue-500 to-cyan-400"
          label="Mana"
        />
      </div>

      {/* Members */}
      <MemberList members={team.members} />
    </div>
  );
}

function BattleDashboard({ data }) {
  const { status, round, teams } = data;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Status Bar */}
      <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-white font-semibold">Battle Status:</span>
          <span className="text-green-400 font-bold">{status}</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg">
          <span className="text-gray-400">Round</span>
          <span className="text-2xl font-bold text-white">{round}</span>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-gray-400">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          <span className="text-gray-400">Wounded</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="text-gray-400">Defeated</span>
        </div>
      </div>
    </div>
  );
}

export default BattleDashboard;

export default function BattleArena() {
  const battles = [
    { id: 1, challenger: 'Harry', opponent: 'Draco', status: 'ongoing' },
    { id: 2, challenger: 'Luna', opponent: 'Cho', status: 'completed' },
    { id: 3, challenger: 'Ron', opponent: 'Crabbe', status: 'upcoming' },
  ]

  return (
    <div className="section">
      <h2>⚔️ Battle Arena</h2>
      <p className="section-desc">This component was lazy loaded!</p>
      <div className="battle-list">
        {battles.map(battle => (
          <div key={battle.id} className="battle-card">
            <div className="battle-header">
              <span>{battle.challenger}</span>
              <span className="vs">VS</span>
              <span>{battle.opponent}</span>
            </div>
            <span className={`status-badge ${battle.status}`}>
              {battle.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

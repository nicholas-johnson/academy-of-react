export default function SpellLibrary() {
  const spells = [
    { id: 1, name: 'Fireball', type: 'fire', power: 85 },
    { id: 2, name: 'Ice Blast', type: 'ice', power: 70 },
    { id: 3, name: 'Lightning Strike', type: 'lightning', power: 90 },
    { id: 4, name: 'Healing Wave', type: 'healing', power: 60 },
    { id: 5, name: 'Shadow Bolt', type: 'dark', power: 75 },
  ]

  return (
    <div className="section">
      <h2>📚 Spell Library</h2>
      <p className="section-desc">This component was lazy loaded!</p>
      <div className="item-grid">
        {spells.map(spell => (
          <div key={spell.id} className="item-card">
            <h4>{spell.name}</h4>
            <span className={`badge ${spell.type}`}>{spell.type}</span>
            <p>Power: {spell.power}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

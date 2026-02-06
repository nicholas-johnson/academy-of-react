import { useState } from 'react'
import './App.css'

// Spell data
const spells = [
  {
    id: 1,
    name: "Fireball",
    type: "fire",
    icon: "🔥",
    power: 85,
    manaCost: 40,
    rarity: "epic",
    description: "A powerful ball of flame that explodes on impact"
  },
  {
    id: 2,
    name: "Ice Shield",
    type: "ice",
    icon: "❄️",
    power: 60,
    manaCost: 30,
    rarity: "rare",
    description: "Creates a protective barrier of solid ice"
  },
  {
    id: 3,
    name: "Lightning Bolt",
    type: "lightning",
    icon: "⚡",
    power: 95,
    manaCost: 50,
    rarity: "legendary",
    description: "Strikes enemies with the fury of thunder"
  },
  {
    id: 4,
    name: "Healing Light",
    type: "healing",
    icon: "💚",
    power: 70,
    manaCost: 35,
    rarity: "epic",
    description: "Restores vitality and cures wounds"
  },
  {
    id: 5,
    name: "Shadow Cloak",
    type: "shadow",
    icon: "🌑",
    power: 55,
    manaCost: 25,
    rarity: "rare",
    description: "Conceals the caster in darkness"
  },
  {
    id: 6,
    name: "Arcane Missile",
    type: "arcane",
    icon: "✨",
    power: 50,
    manaCost: 20,
    rarity: "common",
    description: "Launches magical projectiles at the target"
  },
  {
    id: 7,
    name: "Earth Spike",
    type: "earth",
    icon: "🪨",
    power: 75,
    manaCost: 35,
    rarity: "rare",
    description: "Summons sharp rocks from the ground"
  },
  {
    id: 8,
    name: "Wind Slash",
    type: "wind",
    icon: "💨",
    power: 65,
    manaCost: 28,
    rarity: "uncommon",
    description: "Cuts through enemies with razor-sharp wind"
  }
];

// Type configuration
const typeConfig = {
  fire: { color: '#dc2626', gradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' },
  ice: { color: '#2563eb', gradient: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)' },
  lightning: { color: '#eab308', gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' },
  healing: { color: '#16a34a', gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' },
  shadow: { color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' },
  arcane: { color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' },
  earth: { color: '#92400e', gradient: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)' },
  wind: { color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }
};

// Rarity configuration (Bonus feature)
const rarityConfig = {
  common: { color: '#9ca3af', label: 'Common', stars: '⭐' },
  uncommon: { color: '#10b981', label: 'Uncommon', stars: '⭐⭐' },
  rare: { color: '#3b82f6', label: 'Rare', stars: '⭐⭐⭐' },
  epic: { color: '#a855f7', label: 'Epic', stars: '⭐⭐⭐⭐' },
  legendary: { color: '#f59e0b', label: 'Legendary', stars: '⭐⭐⭐⭐⭐' }
};

// SpellCard Component
function SpellCard({ name, type, icon, power, manaCost, rarity, description }) {
  const typeStyle = typeConfig[type];
  const rarityStyle = rarityConfig[rarity];
  
  return (
    <div className="spell-card" data-rarity={rarity}>
      {/* Card header with type gradient */}
      <div 
        className="card-header" 
        style={{ background: typeStyle.gradient }}
      >
        <div className="spell-icon">{icon}</div>
        <div className="header-content">
          <h3 className="spell-name">{name}</h3>
          <span className="spell-type">{type}</span>
        </div>
      </div>
      
      {/* Rarity badge (Bonus feature) */}
      <div 
        className="rarity-badge" 
        style={{ backgroundColor: rarityStyle.color }}
        title={rarityStyle.label}
      >
        <span className="rarity-stars">{rarityStyle.stars}</span>
        <span className="rarity-label">{rarityStyle.label}</span>
      </div>
      
      {/* Card body */}
      <div className="card-body">
        <p className="spell-description">{description}</p>
        
        <div className="spell-stats">
          <div className="stat-item">
            <span className="stat-icon">⚔️</span>
            <div className="stat-content">
              <span className="stat-label">Power</span>
              <span className="stat-value">{power}</span>
            </div>
            <div className="stat-bar">
              <div 
                className="stat-bar-fill" 
                style={{ 
                  width: `${power}%`,
                  backgroundColor: typeStyle.color 
                }}
              />
            </div>
          </div>
          
          <div className="stat-item">
            <span className="stat-icon">💧</span>
            <div className="stat-content">
              <span className="stat-label">Mana Cost</span>
              <span className="stat-value">{manaCost}</span>
            </div>
            <div className="mana-orbs">
              {Array.from({ length: Math.min(5, Math.ceil(manaCost / 10)) }).map((_, i) => (
                <span key={i} className="mana-orb">💠</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated hover effect */}
      <div className="card-shine" />
    </div>
  );
}

// TypeFilter Component (Bonus feature)
function TypeFilter({ selectedType, onTypeChange }) {
  const types = ['all', ...Object.keys(typeConfig)];
  
  return (
    <div className="type-filter">
      <h3 className="filter-title">Filter by Type:</h3>
      <div className="filter-buttons">
        {types.map(type => (
          <button
            key={type}
            className={selectedType === type ? 'filter-btn active' : 'filter-btn'}
            style={{
              ...(selectedType === type && type !== 'all' && {
                backgroundColor: typeConfig[type].color,
                borderColor: typeConfig[type].color,
                color: 'white'
              })
            }}
            onClick={() => onTypeChange(type)}
          >
            {type === 'all' ? '🌟 All' : `${spells.find(s => s.type === type)?.icon || ''} ${type}`}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  // Using useState for filter (from Module 4)
  const [selectedType, setSelectedType] = useState('all');
  
  const filteredSpells = selectedType === 'all' 
    ? spells 
    : spells.filter(spell => spell.type === selectedType);
  
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 2: SpellCard Component</h1>
        <p className="quest-subtitle">
          Reusable spell cards with JSX
        </p>
        <div className="spell-count">
          {filteredSpells.length} {filteredSpells.length === 1 ? 'Spell' : 'Spells'}
        </div>
      </div>
      
      <TypeFilter 
        selectedType={selectedType} 
        onTypeChange={setSelectedType} 
      />
      
      <div className="spell-grid">
        {filteredSpells.map(spell => (
          <SpellCard 
            key={spell.id}
            {...spell}
          />
        ))}
      </div>
    </div>
  );
}

export default App;






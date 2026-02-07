import { render } from './main.jsx';
import './App.css';

// Spell types and their properties
const spellTypes = {
  fire: {
    name: 'Fire',
    icon: '🔥',
    color: '#dc2626',
    basePower: 30,
    manaCost: 15,
    successRate: 0.85
  },
  ice: {
    name: 'Ice',
    icon: '❄️',
    color: '#2563eb',
    basePower: 25,
    manaCost: 12,
    successRate: 0.90
  },
  lightning: {
    name: 'Lightning',
    icon: '⚡',
    color: '#eab308',
    basePower: 40,
    manaCost: 20,
    successRate: 0.75
  },
  healing: {
    name: 'Healing',
    icon: '💚',
    color: '#16a34a',
    basePower: 20,
    manaCost: 10,
    successRate: 0.95
  },
  shadow: {
    name: 'Shadow',
    icon: '🌑',
    color: '#7c3aed',
    basePower: 35,
    manaCost: 18,
    successRate: 0.80
  }
};

// Calculator state (module-level variables)
let selectedSpell = 'fire';
let wizardLevel = 1;
let intelligence = 50;
let targetDefense = 0;
let comboMultiplier = 1;

// Calculate damage
const calculateDamage = () => {
  const spell = spellTypes[selectedSpell];
  const levelBonus = wizardLevel * 2;
  const intBonus = Math.floor(intelligence / 10);
  const defenseReduction = Math.floor(targetDefense / 5);
  
  const rawDamage = spell.basePower + levelBonus + intBonus - defenseReduction;
  const finalDamage = Math.max(1, Math.floor(rawDamage * comboMultiplier));
  
  return finalDamage;
};

// Calculate success rate
const calculateSuccessRate = () => {
  const spell = spellTypes[selectedSpell];
  const levelBonus = Math.min(wizardLevel * 0.01, 0.15);
  const intBonus = Math.min(intelligence / 1000, 0.10);
  
  const finalRate = Math.min(spell.successRate + levelBonus + intBonus, 0.99);
  return Math.round(finalRate * 100);
};

// Calculate effective mana cost
const calculateManaCost = () => {
  const spell = spellTypes[selectedSpell];
  const levelReduction = Math.floor(wizardLevel / 10);
  return Math.max(1, spell.manaCost - levelReduction);
};

// Spell selector component
const SpellSelector = () => (
  <div className="input-group">
    <label className="input-label">Select Spell:</label>
    <div className="spell-buttons">
      {Object.keys(spellTypes).map(type => {
        const spell = spellTypes[type];
        return (
          <button
            key={type}
            className={selectedSpell === type ? 'spell-btn active' : 'spell-btn'}
            style={selectedSpell === type ? {
              backgroundColor: spell.color,
              color: 'white',
              borderColor: spell.color
            } : {}}
            onClick={() => {
              selectedSpell = type;
              render();
            }}
          >
            {spell.icon} {spell.name}
          </button>
        );
      })}
    </div>
  </div>
);

// Slider input component
const SliderInput = ({ label, value, min, max, onChange }) => (
  <div className="input-group">
    <label className="input-label">
      {label}
      <span className="input-value">{value}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      defaultValue={value}
      className="slider"
      onInput={(e) => {
        onChange(parseInt(e.target.value));
        render();
      }}
    />
  </div>
);

// Results display component
const ResultsDisplay = () => {
  const spell = spellTypes[selectedSpell];
  const damage = calculateDamage();
  const successRate = calculateSuccessRate();
  const manaCost = calculateManaCost();
  const expectedDamage = Math.floor(damage * (successRate / 100));

  return (
    <div className="results-panel">
      <div 
        className="results-header"
        style={{ backgroundColor: spell.color }}
      >
        <span className="results-icon">{spell.icon}</span>
        <h3 className="results-title">{spell.name} Spell Results</h3>
      </div>
      
      <div className="results-grid">
        <div className="result-card">
          <div className="result-value" style={{ color: spell.color }}>
            {damage}
          </div>
          <div className="result-label">Max Damage</div>
        </div>
        
        <div className="result-card">
          <div className="result-value" style={{ color: spell.color }}>
            {successRate}%
          </div>
          <div className="result-label">Success Rate</div>
        </div>
        
        <div className="result-card">
          <div className="result-value" style={{ color: spell.color }}>
            {manaCost}
          </div>
          <div className="result-label">Mana Cost</div>
        </div>
        
        <div className="result-card result-card-highlight">
          <div className="result-value" style={{ color: spell.color }}>
            {expectedDamage}
          </div>
          <div className="result-label">Expected Damage</div>
        </div>
      </div>
      
      {/* Damage breakdown */}
      <div className="breakdown">
        <h4 className="breakdown-title">Damage Breakdown:</h4>
        <div className="breakdown-item">
          <span>Base Power:</span>
          <span className="breakdown-value">{spell.basePower}</span>
        </div>
        <div className="breakdown-item">
          <span>Level Bonus:</span>
          <span className="breakdown-value">+{wizardLevel * 2}</span>
        </div>
        <div className="breakdown-item">
          <span>Intelligence Bonus:</span>
          <span className="breakdown-value">+{Math.floor(intelligence / 10)}</span>
        </div>
        <div className="breakdown-item">
          <span>Defense Reduction:</span>
          <span className="breakdown-value">-{Math.floor(targetDefense / 5)}</span>
        </div>
        <div className="breakdown-item">
          <span>Combo Multiplier:</span>
          <span className="breakdown-value">×{comboMultiplier}</span>
        </div>
      </div>
    </div>
  );
};

// Combo calculator component
const ComboCalculator = () => {
  const combos = [
    { name: 'None', multiplier: 1 },
    { name: 'Double', multiplier: 1.5 },
    { name: 'Triple', multiplier: 2.0 },
    { name: 'Ultimate', multiplier: 3.0 }
  ];

  return (
    <div className="combo-section">
      <h3 className="combo-title">✨ Combo Multiplier</h3>
      <div className="combo-buttons">
        {combos.map(combo => (
          <button
            key={combo.name}
            className={comboMultiplier === combo.multiplier ? 'combo-btn active' : 'combo-btn'}
            onClick={() => {
              comboMultiplier = combo.multiplier;
              render();
            }}
          >
            {combo.name} (×{combo.multiplier})
          </button>
        ))}
      </div>
    </div>
  );
};

// Comparison table component
const ComparisonTable = () => (
  <div className="comparison-section">
    <h3 className="comparison-title">📊 Spell Comparison</h3>
    <div className="comparison-table">
      <div className="comparison-row comparison-header">
        <div className="comparison-cell">Spell</div>
        <div className="comparison-cell">Base Power</div>
        <div className="comparison-cell">Mana Cost</div>
        <div className="comparison-cell">Success Rate</div>
      </div>
      {Object.keys(spellTypes).map(type => {
        const spell = spellTypes[type];
        return (
          <div
            key={type}
            className={selectedSpell === type ? 'comparison-row active' : 'comparison-row'}
            style={selectedSpell === type ? {
              backgroundColor: `${spell.color}10`,
              borderLeft: `4px solid ${spell.color}`
            } : {}}
          >
            <div className="comparison-cell">
              <span style={{ marginRight: '0.5rem' }}>{spell.icon}</span>
              {spell.name}
            </div>
            <div className="comparison-cell">{spell.basePower}</div>
            <div className="comparison-cell">{spell.manaCost}</div>
            <div className="comparison-cell">{Math.round(spell.successRate * 100)}%</div>
          </div>
        );
      })}
    </div>
  </div>
);

// Main App component
const App = () => (
  <div className="app-container">
    <div className="quest-header">
      <h1>⚡ Spell Calculator</h1>
      <p className="quest-subtitle">Calculate spell damage and success rates</p>
    </div>
    
    <div className="calculator-layout">
      {/* Left panel - inputs */}
      <div className="input-panel">
        <h2 className="panel-title">⚙️ Configuration</h2>
        
        <SpellSelector />
        
        <SliderInput
          label="Wizard Level"
          value={wizardLevel}
          min={1}
          max={50}
          onChange={(val) => { wizardLevel = val; }}
        />
        
        <SliderInput
          label="Intelligence"
          value={intelligence}
          min={0}
          max={100}
          onChange={(val) => { intelligence = val; }}
        />
        
        <SliderInput
          label="Target Defense"
          value={targetDefense}
          min={0}
          max={100}
          onChange={(val) => { targetDefense = val; }}
        />
        
        <ComboCalculator />
      </div>
      
      {/* Right panel - results */}
      <div className="output-panel">
        <ResultsDisplay />
      </div>
    </div>
    
    {/* Bottom - comparison table */}
    <ComparisonTable />
  </div>
);

export default App;

// Get React and ReactDOM from global scope
const { createElement: h } = React;
const { createRoot } = ReactDOM;

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

// Calculator state
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
const SpellSelector = () => {
  return h('div', { className: 'input-group' },
    h('label', { className: 'input-label' }, 'Select Spell:'),
    h('div', { className: 'spell-buttons' },
      Object.keys(spellTypes).map(type => {
        const spell = spellTypes[type];
        return h('button', {
          key: type,
          className: selectedSpell === type ? 'spell-btn active' : 'spell-btn',
          style: {
            ...(selectedSpell === type && {
              backgroundColor: spell.color,
              color: 'white',
              borderColor: spell.color
            })
          },
          onClick: () => {
            selectedSpell = type;
            render();
          }
        }, `${spell.icon} ${spell.name}`);
      })
    )
  );
};

// Slider input component
const SliderInput = (label, value, min, max, onChange) => {
  return h('div', { className: 'input-group' },
    h('label', { className: 'input-label' },
      label,
      h('span', { className: 'input-value' }, value)
    ),
    h('input', {
      type: 'range',
      min: min,
      max: max,
      defaultValue: value,
      className: 'slider',
      onInput: (e) => {
        onChange(parseInt(e.target.value));
        render();
      }
    })
  );
};

// Results display component
const ResultsDisplay = () => {
  const spell = spellTypes[selectedSpell];
  const damage = calculateDamage();
  const successRate = calculateSuccessRate();
  const manaCost = calculateManaCost();
  const expectedDamage = Math.floor(damage * (successRate / 100));

  return h('div', { className: 'results-panel' },
    h('div', { 
      className: 'results-header',
      style: { backgroundColor: spell.color }
    },
      h('span', { className: 'results-icon' }, spell.icon),
      h('h3', { className: 'results-title' }, `${spell.name} Spell Results`)
    ),
    
    h('div', { className: 'results-grid' },
      h('div', { className: 'result-card' },
        h('div', { 
          className: 'result-value',
          style: { color: spell.color }
        }, damage),
        h('div', { className: 'result-label' }, 'Max Damage')
      ),
      
      h('div', { className: 'result-card' },
        h('div', { 
          className: 'result-value',
          style: { color: spell.color }
        }, `${successRate}%`),
        h('div', { className: 'result-label' }, 'Success Rate')
      ),
      
      h('div', { className: 'result-card' },
        h('div', { 
          className: 'result-value',
          style: { color: spell.color }
        }, manaCost),
        h('div', { className: 'result-label' }, 'Mana Cost')
      ),
      
      h('div', { className: 'result-card result-card-highlight' },
        h('div', { 
          className: 'result-value',
          style: { color: spell.color }
        }, expectedDamage),
        h('div', { className: 'result-label' }, 'Expected Damage')
      )
    ),
    
    // Damage breakdown
    h('div', { className: 'breakdown' },
      h('h4', { className: 'breakdown-title' }, 'Damage Breakdown:'),
      h('div', { className: 'breakdown-item' },
        h('span', null, 'Base Power:'),
        h('span', { className: 'breakdown-value' }, spell.basePower)
      ),
      h('div', { className: 'breakdown-item' },
        h('span', null, 'Level Bonus:'),
        h('span', { className: 'breakdown-value' }, `+${wizardLevel * 2}`)
      ),
      h('div', { className: 'breakdown-item' },
        h('span', null, 'Intelligence Bonus:'),
        h('span', { className: 'breakdown-value' }, `+${Math.floor(intelligence / 10)}`)
      ),
      h('div', { className: 'breakdown-item' },
        h('span', null, 'Defense Reduction:'),
        h('span', { className: 'breakdown-value' }, `-${Math.floor(targetDefense / 5)}`)
      ),
      h('div', { className: 'breakdown-item' },
        h('span', null, 'Combo Multiplier:'),
        h('span', { className: 'breakdown-value' }, `×${comboMultiplier}`)
      )
    )
  );
};

// Combo calculator (Bonus feature)
const ComboCalculator = () => {
  const combos = [
    { name: 'None', multiplier: 1 },
    { name: 'Double Cast', multiplier: 1.5 },
    { name: 'Triple Cast', multiplier: 2.0 },
    { name: 'Ultimate', multiplier: 3.0 }
  ];

  return h('div', { className: 'combo-section' },
    h('h3', { className: 'combo-title' }, '✨ Combo Multiplier (Bonus)'),
    h('div', { className: 'combo-buttons' },
      combos.map(combo => 
        h('button', {
          key: combo.name,
          className: comboMultiplier === combo.multiplier ? 'combo-btn active' : 'combo-btn',
          onClick: () => {
            comboMultiplier = combo.multiplier;
            render();
          }
        }, `${combo.name} (×${combo.multiplier})`)
      )
    )
  );
};

// Comparison table (Bonus feature)
const ComparisonTable = () => {
  return h('div', { className: 'comparison-section' },
    h('h3', { className: 'comparison-title' }, '📊 Spell Comparison'),
    h('div', { className: 'comparison-table' },
      h('div', { className: 'comparison-row comparison-header' },
        h('div', { className: 'comparison-cell' }, 'Spell'),
        h('div', { className: 'comparison-cell' }, 'Base Power'),
        h('div', { className: 'comparison-cell' }, 'Mana Cost'),
        h('div', { className: 'comparison-cell' }, 'Success Rate')
      ),
      Object.keys(spellTypes).map(type => {
        const spell = spellTypes[type];
        return h('div', {
          key: type,
          className: selectedSpell === type ? 'comparison-row active' : 'comparison-row',
          style: {
            ...(selectedSpell === type && {
              backgroundColor: `${spell.color}10`,
              borderLeft: `4px solid ${spell.color}`
            })
          }
        },
          h('div', { className: 'comparison-cell' },
            h('span', { style: { marginRight: '0.5rem' } }, spell.icon),
            spell.name
          ),
          h('div', { className: 'comparison-cell' }, spell.basePower),
          h('div', { className: 'comparison-cell' }, spell.manaCost),
          h('div', { className: 'comparison-cell' }, `${Math.round(spell.successRate * 100)}%`)
        );
      })
    )
  );
};

// Main App component
const App = () => {
  return h('div', { className: 'app-container' },
    h('div', { className: 'quest-header' },
      h('h1', null, '⚡ Quest 3: Spell Calculator'),
      h('p', { className: 'quest-subtitle' }, 
        'Calculate spell damage and success rates'
      )
    ),
    
    h('div', { className: 'calculator-layout' },
      // Left panel - inputs
      h('div', { className: 'input-panel' },
        h('h2', { className: 'panel-title' }, '⚙️ Configuration'),
        
        SpellSelector(),
        
        SliderInput('Wizard Level', wizardLevel, 1, 50, (val) => {
          wizardLevel = val;
        }),
        
        SliderInput('Intelligence', intelligence, 0, 100, (val) => {
          intelligence = val;
        }),
        
        SliderInput('Target Defense', targetDefense, 0, 100, (val) => {
          targetDefense = val;
        }),
        
        ComboCalculator()
      ),
      
      // Right panel - results
      h('div', { className: 'output-panel' },
        ResultsDisplay()
      )
    ),
    
    // Bottom - comparison table
    ComparisonTable()
  );
};

// Render function
const render = () => {
  root.render(h(App));
};

// Create root and initial render
const root = createRoot(document.getElementById('root'));
render();

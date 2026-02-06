import { useState } from 'react'
import './App.css'

// Wizard data
const wizard = {
  name: "Elara Moonwhisper",
  house: "Wisdom",
  level: 42,
  specialty: "Elemental Magic",
  magicPower: 85,
  intelligence: 92,
  stamina: 78
};

// House configuration
const houseConfig = {
  Valor: { color: '#dc2626', emblem: '🦁' },
  Wisdom: { color: '#2563eb', emblem: '🦅' },
  Nature: { color: '#16a34a', emblem: '🐺' },
  Mystery: { color: '#9333ea', emblem: '🐍' }
};

const config = houseConfig[wizard.house];

// Stat bar component (JSX)
function StatBar({ label, value, color }) {
  return (
    <div className="stat-row">
      <div className="stat-label">{label}</div>
      <div className="stat-bar-container">
        <div 
          className="stat-bar-fill" 
          style={{ 
            width: `${value}%`,
            backgroundColor: color 
          }}
        />
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}

// WITH JSX (Modern, Clean)
function WizardCardJSX() {
  return (
    <div className="wizard-card">
      <div className="card-header" style={{ borderTopColor: config.color }}>
        <div className="header-content">
          <h2 className="wizard-name">{wizard.name}</h2>
          <div className="house-badge" style={{ backgroundColor: config.color }}>
            <span className="house-emblem">{config.emblem}</span>
            <span className="house-name">{wizard.house}</span>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <div className="info-section">
          <div className="info-row">
            <span className="info-label">Level:</span>
            <span className="level-value">{wizard.level}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Specialty:</span>
            <span className="info-value">{wizard.specialty}</span>
          </div>
        </div>
        
        <div className="stats-section">
          <h3 className="section-title">Attributes</h3>
          <StatBar label="Magic Power" value={wizard.magicPower} color={config.color} />
          <StatBar label="Intelligence" value={wizard.intelligence} color={config.color} />
          <StatBar label="Stamina" value={wizard.stamina} color={config.color} />
        </div>
      </div>
    </div>
  );
}

// WITHOUT JSX (Old Way - for comparison)
// This uses React.createElement instead of JSX syntax
function WizardCardCreateElement() {
  const h = React.createElement;
  
  return h('div', { className: 'wizard-card' },
    h('div', { 
      className: 'card-header',
      style: { borderTopColor: config.color }
    },
      h('div', { className: 'header-content' },
        h('h2', { className: 'wizard-name' }, wizard.name),
        h('div', { 
          className: 'house-badge',
          style: { backgroundColor: config.color }
        },
          h('span', { className: 'house-emblem' }, config.emblem),
          h('span', { className: 'house-name' }, wizard.house)
        )
      )
    ),
    h('div', { className: 'card-body' },
      h('div', { className: 'info-section' },
        h('div', { className: 'info-row' },
          h('span', { className: 'info-label' }, 'Level:'),
          h('span', { className: 'level-value' }, wizard.level)
        ),
        h('div', { className: 'info-row' },
          h('span', { className: 'info-label' }, 'Specialty:'),
          h('span', { className: 'info-value' }, wizard.specialty)
        )
      ),
      h('div', { className: 'stats-section' },
        h('h3', { className: 'section-title' }, 'Attributes'),
        StatBarCreateElement('Magic Power', wizard.magicPower, config.color),
        StatBarCreateElement('Intelligence', wizard.intelligence, config.color),
        StatBarCreateElement('Stamina', wizard.stamina, config.color)
      )
    )
  );
}

// Stat bar with createElement (for comparison)
function StatBarCreateElement(label, value, color) {
  const h = React.createElement;
  
  return h('div', { className: 'stat-row' },
    h('div', { className: 'stat-label' }, label),
    h('div', { className: 'stat-bar-container' },
      h('div', {
        className: 'stat-bar-fill',
        style: {
          width: `${value}%`,
          backgroundColor: color
        }
      }),
      h('span', { className: 'stat-value' }, value)
    )
  );
}

function App() {
  // Note: Using useState here (from Module 4) for toggle functionality
  // In pure Module 2, you'd use a global variable and manual re-render
  const [showJSX, setShowJSX] = useState(true);

  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 1: JSX Translation</h1>
        <p className="quest-subtitle">
          See the difference between createElement() and JSX
        </p>
      </div>
      
      {/* Toggle buttons */}
      <div className="toggle-section">
        <button
          className={showJSX ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setShowJSX(true)}
        >
          ✨ Modern JSX
        </button>
        <button
          className={!showJSX ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setShowJSX(false)}
        >
          📜 createElement()
        </button>
      </div>
      
      {/* Display appropriate version */}
      <div className="comparison-container">
        <div className="comparison-label">
          {showJSX ? (
            <span className="label-jsx">
              Using <code>JSX</code> syntax
            </span>
          ) : (
            <span className="label-create-element">
              Using <code>React.createElement()</code>
            </span>
          )}
        </div>
        
        {showJSX ? <WizardCardJSX /> : <WizardCardCreateElement />}
      </div>
      
      {/* Explanation */}
      <div className="explanation-box">
        <h3>💡 The Difference</h3>
        <div className="explanation-grid">
          <div className="explanation-card">
            <h4>JSX (Modern)</h4>
            <pre className="code-block">{`<div className="wizard-card">
  <h2>{wizard.name}</h2>
  <p>{wizard.level}</p>
</div>`}</pre>
            <ul className="benefit-list">
              <li>✅ Looks like HTML</li>
              <li>✅ Easy to read</li>
              <li>✅ Less verbose</li>
              <li>✅ Industry standard</li>
            </ul>
          </div>
          
          <div className="explanation-card">
            <h4>createElement (Old Way)</h4>
            <pre className="code-block">{`React.createElement(
  'div',
  { className: 'wizard-card' },
  React.createElement('h2', null, wizard.name),
  React.createElement('p', null, wizard.level)
)`}</pre>
            <ul className="benefit-list">
              <li>⚠️ Nested function calls</li>
              <li>⚠️ Hard to read</li>
              <li>⚠️ More typing</li>
              <li>✅ No build step needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Compare this to Module 1's createElement() - so much easier to read!





